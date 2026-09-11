import Faqs from "../Components/Faqs";
import FeaturesSection from "../Components/FeatureSection";
import HeroSection from "../Components/HeroSection";
import SimplePricing from "../Components/Pricing";
import HomeLayout from "../Layouts/HomeLayout";

function Home() {
  return (
    <HomeLayout>
      <HeroSection />
      <FeaturesSection />
      <SimplePricing />
      <Faqs />
    </HomeLayout>
  );
}

export default Home;
