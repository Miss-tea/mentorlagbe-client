import Hero from "@/components/home/Hero";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/PricingSection";
import SubjectsStats from "@/components/home/SubjectsStats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedTuitions />
      <HowItWorks />
      <PricingSection />
      <SubjectsStats />
    </>
  );
}
