import Nav from "@/components/measured/Nav";
import TempoRail from "@/components/measured/TempoRail";
import Hero from "@/components/measured/Hero";
import CraftPanel from "@/components/measured/CraftPanel";
import Work from "@/components/measured/Work";
import Builds from "@/components/measured/Builds";
import Contact from "@/components/measured/Contact";
import { crafts } from "@/components/measured/data";

export default function Home() {
  return (
    <>
      <Nav />
      <TempoRail />
      <main>
        <Hero />
        {crafts.map((c) => (
          <CraftPanel key={c.key} craft={c} />
        ))}
        <Work />
        <Builds />
        <Contact />
      </main>
    </>
  );
}
