import Hero from "@/components/sections/Hero";
import StatStrip from "@/components/sections/StatStrip";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import FourRails from "@/components/sections/FourRails";
import Locations from "@/components/sections/Locations";
import FounderQuote from "@/components/sections/FounderQuote";
import PressStrip from "@/components/sections/PressStrip";
import FAQ from "@/components/sections/FAQ";
import Globe from "@/components/sections/Globe";
import ClosingCTA from "@/components/sections/ClosingCTA";
import Meta from "@/components/Meta";

export default function Home() {
  return (
    <>
      <Meta routeKey="/" />
      <Hero />
      <StatStrip />
      <FeaturesGrid />
      <FourRails />
      <FounderQuote />
      <PressStrip />
      <Locations />
      <FAQ />
      <Globe />
      <ClosingCTA />
    </>
  );
}
