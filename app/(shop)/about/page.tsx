import React from "react";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import HistorySection from "@/components/about/HistorySection";
import ValuesSection from "@/components/about/ValuesSection";
import CTASection from "@/components/about/CTASection";

export default function AboutPage() {
  return (
    <main>
      <MissionVisionSection />
      <HistorySection />
      <ValuesSection />
      <CTASection />
    </main>
  );
}
