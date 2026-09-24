'use client";'
import Image from "next/image";
import Navbar from "@/components/marketing/navbar"; 
import HeroSection from "@/components/marketing/herosection";
import dashboardImg from "@/public/web/images/image.png";
import FeatureGrid from "@/components/marketing/featuregrid";
import WorkflowSection from "@/components/marketing/workflowsection";
import ProductPreview from "@/components/marketing/product-preview";
import Footer from "@/components/marketing/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/30">
      <Navbar />
      <HeroSection dashboardImageSrc={dashboardImg} />
      <FeatureGrid />
      <WorkflowSection />
      <ProductPreview previewImageSrc={dashboardImg} />
      <Footer />
    </div>
  );
}
