"use client";
import { motion } from "motion/react";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      className="flex h-[70px] w-full items-center justify-between px-6 md:px-16"
    >
      {/* Logo */}
      <div className="font-sans text-3xl md:text-4xl font-bold flex items-center">
        whisper
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 pt-1">
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["Home", "Features", "Pricing", "Contact"].map((item) => (
            <div
              key={item}
              className="cursor-pointer rounded-xl px-4 py-2 transition-all duration-200 hover:bg-[#EDEBE6] hover:text-gray-800"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <div className="rounded-xl bg-[#EDEBE6] px-5 py-2 text-sm font-semibold text-gray-800 cursor-pointer hover:bg-[#e0ddd7] transition-colors duration-200">
          Get Started
        </div>
      </div>
    </motion.nav>
  );
};