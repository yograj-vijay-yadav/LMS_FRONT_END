import HeroSection from "../Components/HeroSection";
import Faqs from "../Components/Faqs";
import HomeLayout from "../Layouts/HomeLayout";
import FeaturesSection from "../Components/FeatureSection";
import SimplePricing from "../Components/Pricing";

function Home() {
    
       return (
        <div>
        <HomeLayout>
            <HeroSection />
            <FeaturesSection />
            <SimplePricing />
            <Faqs />
        </HomeLayout>
        </div>
       
    ) 
}

export default Home;