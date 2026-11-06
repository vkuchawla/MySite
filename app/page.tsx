import Nav from "@/components/measured/Nav";
import TempoRail from "@/components/measured/TempoRail";
import Hero from "@/components/measured/Hero";
import Sound from "@/components/measured/Sound";
import Tabla from "@/components/measured/Tabla";
import Feed from "@/components/measured/Feed";
import Work from "@/components/measured/Work";
import Builds from "@/components/measured/Builds";
import Contact from "@/components/measured/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <TempoRail />
      <main>
        <Hero />
        <Sound />
        <Tabla />
        <Feed />
        <Work />
        <Builds />
        <Contact />
      </main>
    </>
  );
}
