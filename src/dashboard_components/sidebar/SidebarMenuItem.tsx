"use client";
import React from "react";
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
  const isSubmenuOpen = openSubmenu === index;

  if (item.subItems) {
    return (
      <>
        <button
          onClick={() => onSubmenuToggle(index)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isSubmenuOpen
              ? "bg-[#6B38FF] text-white dark:bg-[#6B38FF]"
              : "text-gray-700 dark:text-[#98A2B3] hover:bg-gray-100 dark:hover:bg-[#2C2F3F] hover:text-gray-900 dark:hover:text-white"
          } ${!isExpanded && !isMobile ? "justify-center" : "justify-start"}`}
          onMouseEnter={() => onMouseEnter(item.name)}
          onMouseLeave={onMouseLeave}
        >
          <span className="shrink-0 relative z-10">
            {item.icon}
            {showTooltip && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 dark:bg-[#2C2F3F] text-white text-xs rounded whitespace-nowrap z-99999 pointer-events-none shadow-lg">
                {item.name}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-gray-800 dark:border-r-[#2C2F3F] border-b-4 border-b-transparent"></div>
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
            <div className="pl-4 pt-1 space-y-1">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.path}
                  href={subItem.path}
                  className={`flex gap-2 px-3 py-2  rounded-lg text-sm transition-colors ${
                    isActive(subItem.path)
                      ? "bg-[#6B38FF] text-white dark:bg-[#6B38FF]"
                      : "text-gray-700 dark:text-[#98A2B3] hover:bg-gray-100 dark:hover:bg-[#2C2F3F] hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {subItem?.icon && (
                    <span className="shrink-0 text-inherit">
                      {subItem.icon}
                    </span>
                  )}
                  <span className="font-medium">{subItem.name}</span>
                </Link>
              ))}
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
          ? "bg-[#6B38FF] text-white dark:bg-[#6B38FF]"
          : "text-gray-700 dark:text-[#98A2B3] hover:bg-gray-100 dark:hover:bg-[#2C2F3F] hover:text-gray-900 dark:hover:text-white"
      } ${!isExpanded && !isMobile ? "justify-center" : "justify-start"}`}
      onMouseEnter={() => onMouseEnter(item.name)}
      onMouseLeave={onMouseLeave}
    >
      <span className="shrink-0 relative z-10">
        {item.icon}
        {showTooltip && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#2C2F3F] text-white text-xs rounded whitespace-nowrap z-99999 pointer-events-none shadow-lg">
            {item.name}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-[#2C2F3F] border-b-4 border-b-transparent"></div>
          </div>
        )}
      </span>
      {showContent && <span className="text-sm font-medium">{item.name}</span>}
    </Link>
  );
};
