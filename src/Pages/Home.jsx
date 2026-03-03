import HeroSection from "../Components/HeroSection";
import Faqs from "../Components/Faqs";
import HomeLayout from "../Layouts/HomeLayout";
import FeaturesSection from "../Components/FeatureSection";
import SimplePricing from "../Components/Pricing";
import ChatbotWidget from "../Components/chatbotWidget";
function Home() {
    
       return (
        <div>
        <HomeLayout>
            <HeroSection />
            <FeaturesSection />
            <SimplePricing />
            <Faqs />
            <ChatbotWidget />
        </HomeLayout>
        </div>
       
    ) 
}

export default Home;