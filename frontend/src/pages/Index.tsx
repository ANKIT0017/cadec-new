import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import UpcomingEvents from "@/components/UpcomingEvents";
import Footer from "@/components/Footer";
import SocialMedia from "@/components/SocialMedia";
import MobileBottomNav from "@/components/MobileBottomNav";

const Index = () => {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />
      <SocialMedia />
      <Hero />
      <AboutPreview />
      <UpcomingEvents />
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
