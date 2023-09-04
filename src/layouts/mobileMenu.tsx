import React from "react";
import Sidebar from "./sidebar";
import { AnimateFadeIn } from "@/animations";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-screen w-full absolute top-0 left-0 bg-transparent-deep transition-all md:hidden z-20">
      <AnimateFadeIn delay={0.01}>
        <Sidebar onClose={onClose} mobile />
      </AnimateFadeIn>
    </div>
  );
}
