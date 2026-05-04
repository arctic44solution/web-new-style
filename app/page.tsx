import HeroSection from "@/components/herosection";
import FeaturedWorkSection from "@/components/featuredworksection";
import ExpertiseSection from "@/components/imagesection/expertisesection";
import Design1 from "@/components/content/design1";
import CreativeSection from "@/components/imagesection/creative";
import Design2 from "@/components/content/design2";
import BrandinSection from "@/components/imagesection/brandin";
import Design3 from "@/components/content/design3";
import WebDesignSection from "@/components/imagesection/webdesign";
import Design4 from "@/components/content/design4";
import DigitalSection from "@/components/imagesection/digital";
import Design5 from "@/components/content/design5";
import ExperienceSection from "@/components/experience";
import TextSection from "@/components/textexpand";
import ClientsSection from "@/components/clientssection";
import StatsSection from "@/components/statssection";
import AwardsSection from "@/components/awardssection";
import BigImage from "@/components/bigimage";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedWorkSection />
      <ExpertiseSection />
      <Design1 />
      <CreativeSection />
      <Design2 />
      <BrandinSection />
      <Design3 />
      <WebDesignSection />
      <Design4 />
      <DigitalSection />
      <Design5 />
      <ExperienceSection />
      <TextSection />
      <ClientsSection />
      <StatsSection />
      <AwardsSection />
      <BigImage />
      <Footer />
    </>
  );
}