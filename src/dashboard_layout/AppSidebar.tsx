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
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Get sidebar config based on role
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

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    config.navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
          }
        });
      }
    });
  }, [pathname, isActive, config.navItems]);

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
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  const sidebarWidth = isMobileOpen
    ? "w-[calc(100%-60px)] max-w-[320px] lg:w-[280px]"
    : isExpanded
      ? "w-[280px]"
      : "w-[90px]";

  // Desktop: rounded border with padding, Mobile: no padding
  const sidebarClasses = isMobileOpen
    ? "translate-x-0"
    : "-translate-x-full overflow-x-hidden md:overflow-x-visible lg:translate-x-0";

  return (
    <>
      <aside
        className={`fixed top-0  left-0 flex flex-col h-screen transition-all duration-300 ease-in-out z-2000 bg-gray-50  ${sidebarWidth} ${sidebarClasses} shadow-xl`}
      >
        {/* Header Section */}
        <SidebarHeader
          isExpanded={isExpanded}
          isMobile={isMobile}
          subtitle={config.subtitle}
          onToggle={toggleSidebar}
        />

        {/* Navigation Menu */}
        <div className="flex-1  no-scrollbar px-3 py-4">
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

        {/* Quick Links Section - Above User Profile */}
        {(isExpanded || isMobile) && config.quickLinks.length > 0 && (
          <QuickLinks
            links={config.quickLinks}
            onLinkClick={handleQuickLinkClick}
          />
        )}

        {/* User Profile Section */}
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
