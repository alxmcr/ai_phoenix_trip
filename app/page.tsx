import Features from "@/components/sections/landing-page/features";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/landing-page/hero";
import HowItWorks from "@/components/sections/landing-page/how-it-works";
import Partners from "@/components/sections/landing-page/partners";
import ShareTravelExperience from "@/components/sections/landing-page/share-travel-experience";
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
