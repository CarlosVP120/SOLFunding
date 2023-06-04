import { useState } from "react";
import { Footer, Navbar } from "../components";
import {
  About,
  Explore,
  Feedback,
  GetStarted,
  Hero,
  Insights,
  WhatsNew,
  World,
} from "../sections";

const Home = () => {
  const [wallet, setWallet] = useState(null);

  return (
    <div className="bg-primary-black h-screen">
      <Navbar />
      <Hero />
      <div className="relative ">
        <About />
        <div className="gradient-03 z-0" />
        <Explore />
      </div>
      <div className="relative overflow-hidden">
        <Insights />
        <div className="gradient-04 z-0" />
        <WhatsNew />
      </div>
      <World />
      <div className="relative overflow-hidden">
        <div className="gradient-04 z-0" />
        <Feedback />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
