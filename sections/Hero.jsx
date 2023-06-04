"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className="flex justify-center items-center text-center flex-col relative z-10 mb-16">
        <motion.h1
          variants={textVariant(1.1)}
          className={`${styles.heroHeading}`}
        >
          <span className="font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Empower{" "}
          </span>
          Dreams,{" "}
          <span className="font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Change{" "}
          </span>{" "}
          Lives
        </motion.h1>
      </div>

      <div className="relative w-full md:-mt-[20px] -mt-[12px]">
        <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />

        <video
          autoPlay
          loop
          muted
          playsInline
          src="/videoplayback.mp4"
          className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
        />

        <a href="#explore">
          <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10"></div>
        </a>
      </div>
    </motion.div>
  </section>
);

export default Hero;
