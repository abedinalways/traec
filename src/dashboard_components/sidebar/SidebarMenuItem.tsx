

"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "../../icons/index";
import type { NavItem } from "../../lib/sidebarConfig";

interface SidebarMenuItemProps {
  item: NavItem;
  index: number;
  isActive: (path: string) => boolean;
  isExpanded: boolean;
  isMobile: boolean;
  openSubmenu: number | null;
  subMenuHeight: number;
  subMenuRef: (el: HTMLDivElement | null) => void;
  hoveredItem: string | null;
  onSubmenuToggle: (index: number) => void;
  onMouseEnter: (name: string) => void;
  onMouseLeave: () => void;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  index,
  isActive,
  isExpanded,
  isMobile,
  openSubmenu,
  subMenuHeight,
  subMenuRef,
  hoveredItem,
  onSubmenuToggle,
  onMouseEnter,
  onMouseLeave,
}) => {
  const showTooltip = !isExpanded && !isMobile && hoveredItem === item.name;
  const showContent = isExpanded || isMobile;

  const hasActiveChild =
    item.subItems?.some((subItem) => isActive(subItem.path)) ?? false;

  const isSubmenuOpen = openSubmenu === index;
  
  const isTreeMenu = item.submenuStyle === "tree";
  const isParentActive = hasActiveChild;

  if (item.subItems) {
    return (
      <>
        <button
          onClick={() => onSubmenuToggle(index)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isParentActive
              ? "bg-black text-white dark:bg-black cursor-pointer"
              : "text-gray-700 dark:text-[#98A2B3] hover:bg-gray-100 dark:hover:bg-[#2C2F3F] hover:text-gray-900 dark:hover:text-white cursor-pointer"
          } ${!isExpanded && !isMobile ? "justify-center" : "justify-start"}`}
          onMouseEnter={() => onMouseEnter(item.name)}
          onMouseLeave={onMouseLeave}
        >
          <span className="shrink-0 relative z-10">
            {item.icon}
            {showTooltip && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 dark:bg-[#2C2F3F] text-white text-xs rounded whitespace-nowrap z-50 pointer-events-none shadow-lg">
                {item.name}
              </div>
            )}
          </span>

          {showContent && (
            <>
              <span className="flex-1 text-left text-sm font-medium">
                {item.name}
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${
                  isSubmenuOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>

        {showContent && (
          <div
            ref={subMenuRef}
            className="overflow-hidden transition-all duration-300"
            style={{
              height: isSubmenuOpen ? `${subMenuHeight}px` : "0px",
            }}
          >
            <div
              className={
                isTreeMenu
                  ? "relative ml-4 mt-2 border-l border-gray-200 dark:border-[#3A3D4A] pl-4 space-y-2"
                  : "pl-4 pt-1 space-y-1"
              }
            >
              {item.subItems.map((subItem) => {
                const active = isActive(subItem.path);

                return (
                  <div
                    key={subItem.path}
                    className={isTreeMenu ? "relative" : undefined}
                  >
                    {isTreeMenu && (
                      <span className="absolute -left-4 top-1/2 h-px w-3 -translate-y-1/2 bg-gray-200 dark:bg-[#3A3D4A]" />
                    )}

                    <Link
                      href={subItem.path}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-black text-white dark:bg-black"
                          : "text-gray-700 dark:text-[#98A2B3] hover:bg-gray-100 dark:hover:bg-[#2C2F3F] hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {subItem.icon && (
                        <span className="shrink-0 text-inherit active:text-white ">
                          {subItem.icon}
                        </span>
                      )}
                      <span className="font-medium ">{subItem.name}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <Link
      href={item.path || "#"}
      className={`font-[inter] w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        isActive(item.path || "")
          ? "bg-[#0f1016] text-white dark:bg-[#0f1016]"
          : "text-gray-700 dark:text-[#98A2B3] hover:bg-gray-100 dark:hover:bg-[#2C2F3F] hover:text-gray-900 dark:hover:text-white"
      } ${!isExpanded && !isMobile ? "justify-center" : "justify-start"}`}
      onMouseEnter={() => onMouseEnter(item.name)}
      onMouseLeave={onMouseLeave}
    >
      <span className="shrink-0 relative z-10">
        {item.icon}
        {showTooltip && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#2C2F3F] text-white text-xs rounded whitespace-nowrap z-50 pointer-events-none shadow-lg">
            {item.name}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-[#2C2F3F] border-b-4 border-b-transparent"></div>
          </div>
        )}
      </span>
      {showContent && <span className="text-sm font-medium">{item.name}</span>}
    </Link>
  );
};