"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 shadow-sm">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          <span className="text-2xl">⛽</span>
          FDT
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
            <Menu className="h-5 w-5 text-gray-900 dark:text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
}
