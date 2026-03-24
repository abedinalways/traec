"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

import {
  getSidebarConfig,
  QuickLink,
  type UserRole,
} from "@/lib/sidebarConfig";

import { useModal } from "@/hooks/useModal";
import { useSidebar } from "@/app/context/SidebarContext";
import { SidebarHeader } from "@/dashboard_components/sidebar/SidebarHeader";
import { SidebarMenuItem } from "@/dashboard_components/sidebar/SidebarMenuItem";
import { QuickLinks } from "@/dashboard_components/sidebar/QuickLinks";
import { UserProfile } from "@/dashboard_components/sidebar/UserProfile";
import WalletAddressModal from "@/dashboard_components/user/wallet/WalletAddressModal";

interface AppSidebarProps {
  role?: UserRole;
  userName?: string;
  userId?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  role = "admin",
  userName = "Jannatul.Su",
  userId = "236721",
}) => {
  const { isExpanded, isMobileOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const [manualOpenSubmenu, setManualOpenSubmenu] = useState<number | null>(
    null,
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const config = getSidebarConfig(role);

  const {
    isOpen: isWalletModalOpen,
    openModal: openWalletModal,
    closeModal: closeWalletModal,
  } = useModal();

  const walletAddress = "0x71C7656EC7ab8efB7401B5fd6...";

  const handleQuickLinkClick = (link: QuickLink) => {
    if (link.action === "wallet-modal") {
      openWalletModal();
      return;
    }

    if (link.action === "download-app") {
      console.log("download app");
      return;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = useCallback(
    (path?: string) => {
      if (!path) return false;

      if (path === "/admin/dashboard") {
        return pathname === path;
      }

      return pathname === path || pathname.startsWith(`${path}/`);
    },
    [pathname],
  );

  const activeSubmenu = config.navItems.findIndex((nav) =>
    nav.subItems?.some(
      (sub) => pathname === sub.path || pathname.startsWith(`${sub.path}/`),
    ),
  );

  const openSubmenu = activeSubmenu !== -1 ? activeSubmenu : manualOpenSubmenu;

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `submenu-${openSubmenu}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setManualOpenSubmenu((prev) => (prev === index ? null : index));
  };

  const sidebarWidth = isMobileOpen
    ? "w-[calc(100%-60px)] max-w-[320px] lg:w-[280px]"
    : isExpanded
      ? "w-[280px]"
      : "w-[90px]";

  const sidebarClasses = isMobileOpen
    ? "translate-x-0"
    : "-translate-x-full overflow-x-hidden md:overflow-x-visible lg:translate-x-0";

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0
          flex flex-col
          h-screen
          bg-[#F4F6F8]
          border-r border-gray-200
          transition-all duration-300 ease-in-out
          ${sidebarWidth}
          ${sidebarClasses}
          z-1000
        `}
      >
        <SidebarHeader
          isExpanded={isExpanded}
          isMobile={isMobile}
          subtitle={config.subtitle}
          onToggle={toggleSidebar}
        />

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-1 relative">
            {config.navItems.map((nav, index) => (
              <div key={nav.name} className="relative">
                <SidebarMenuItem
                  item={nav}
                  index={index}
                  isActive={isActive}
                  isExpanded={isExpanded}
                  isMobile={isMobile}
                  openSubmenu={openSubmenu}
                  subMenuHeight={subMenuHeight[`submenu-${index}`] || 0}
                  subMenuRef={(el) => {
                    subMenuRefs.current[`submenu-${index}`] = el;
                  }}
                  hoveredItem={hoveredItem}
                  onSubmenuToggle={handleSubmenuToggle}
                  onMouseEnter={setHoveredItem}
                  onMouseLeave={() => setHoveredItem(null)}
                />
              </div>
            ))}
          </nav>
        </div>

        {(isExpanded || isMobile) && config.quickLinks.length > 0 && (
          <QuickLinks
            links={config.quickLinks}
            onLinkClick={handleQuickLinkClick}
          />
        )}

        {(isExpanded || isMobile) && (
          <UserProfile name={userName} id={userId} />
        )}
      </aside>

      <WalletAddressModal
        isOpen={isWalletModalOpen}
        onClose={closeWalletModal}
        walletAddress={walletAddress}
      />
    </>
  );
};

export default AppSidebar;
