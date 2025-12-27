import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";
import Image from "next/image";

import Features from "@/components/features";
import LogoCloud from "@/components/logo-cloud";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <main>
      <HeroHeader />
      <HeroSection />
      <Features />
      <LogoCloud />
      <CallToAction />
      <FooterSection />
    </main>
  );
}
