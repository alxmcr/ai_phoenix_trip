import Features from "@/components/sections/features";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Partners from "@/components/sections/partners";
import ShareTravelExperience from "@/components/sections/share-travel-experience";
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <Hero />
      <Partners />
      <HowItWorks />
      <Features />
      <ShareTravelExperience />
      <Footer />
    </main>
  );
}
