'use client";'
import Image from "next/image";
import Navbar from "@/components/marketing/navbar"; 
import HeroSection from "@/components/marketing/herosection";
import dashboardImg from "@/public/web/images/image.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection dashboardImageSrc={dashboardImg} />

    </div>
  );
}
