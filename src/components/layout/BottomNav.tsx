"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MessageCircle, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "홈", icon: Home, href: "/" },
  { label: "밥친구", icon: Users, href: "/friends" },
  { label: "FAB", icon: Plus, href: "/create", isFab: true },
  { label: "채팅", icon: MessageCircle, href: "/chat" },
  { label: "마이", icon: User, href: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-t border-grey-200 flex items-end px-0 pb-[22px] pt-2 shrink-0 h-[84px]">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        if (item.isFab) {
          return (
            <div key={item.href} className="flex-1 flex justify-center items-end relative -top-3.5">
              <Link
                href={item.href}
                className="w-[52px] h-[52px] rounded-full bg-primary shadow-glow flex items-center justify-center active:scale-95 transition-transform"
              >
                <item.icon className="w-6 h-6 text-grey-900" />
              </Link>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center gap-[3px] pt-1"
          >
            <item.icon
              className={cn(
                "w-[22px] h-[22px]",
                isActive ? "text-primary-600" : "text-grey-400"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-semibold tracking-[0.2px]",
                isActive ? "text-primary-600" : "text-grey-400"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
