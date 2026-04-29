import Hero from "@/components/Hero";
import CanvasSequence from "@/components/CanvasSequence";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <Hero />
      <CanvasSequence />
      <Footer />
    </main>
  );
}
