import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen px-4 md:px-0 items-center">
      <Hero />
      <Footer />
    </main>
  );
}
