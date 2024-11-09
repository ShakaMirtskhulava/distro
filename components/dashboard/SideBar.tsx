"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import Logo from "./Logo";
import { AnimatePresence } from "framer-motion";
import MobileSideBar from "./MobileSideBar";
import Navigation from "./Navigation";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const pathname = usePathname();
  function handleToggle() {
    setIsMinimized(!isMinimized);
  }

  function burgerMenuToggle() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  useEffect(() => {
    if (isBurgerMenuOpen) {
      setIsBurgerMenuOpen(false);
    }
  }, [pathname]);

  return (
    <>
      {/* mobile */}
      <div className="absolute w-full p-2 lg:hidden">
        <div className="">
          <button
            onClick={burgerMenuToggle}
            className={`absolute left-2 top-2 z-50 cursor-pointer ${isBurgerMenuOpen ? "text-white" : "text-black"}`}
          >
            <Menu size={35} />
          </button>
          <AnimatePresence>{isBurgerMenuOpen && <MobileSideBar />}</AnimatePresence>
        </div>
      </div>
      {/*  */}

      {/* Desktop */}
      <aside
        className={`hidden min-h-[100dvh] self-stretch border-r-2 border-gray-100 bg-[#fdf9f7] transition-all duration-300 ease-in-out lg:block ${
          isMinimized ? "w-[4.5rem]" : "w-64"
        }`}
      >
        <div className="relative flex h-full flex-col">
          <div className="flex h-16 items-center px-4">
            <Logo />
          </div>
          <button
            onClick={handleToggle}
            className="text-foreground absolute -right-3 top-4 z-50 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md transition-transform duration-300 hover:bg-gray-100"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${isMinimized ? "rotate-180" : ""}`} />
          </button>
          <Navigation isMinimized={isMinimized} />
        </div>
        {/*  */}
      </aside>
    </>
  );
}
