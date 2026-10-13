import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import ClickRipple from "@/components/ClickRipple";
import CountIn from "@/components/CountIn";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import PMPitch from "@/components/PMPitch";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Music from "@/components/Music";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <CountIn />
      <ClickRipple />
      <Nav />
      <ScrollProgress />
      <Hero />
      <About />
      <Experience />
      <PMPitch />
      <Projects />
      <Skills />
      <Music />
      <Footer />
    </main>
  );
}
