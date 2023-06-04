"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { insights } from "../constants";
import { staggerContainer } from "../utils/motion";
import { InsightCard, TitleText, TypingText } from "../components";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import CampaignCard from "../components/CampaignCard";

const Insights = () => {
  // read data from firestore collection
  useEffect(() => {
    const data = onSnapshot(collection(db, "campaigns"), (snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    });

    return data;
  }, []);

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Insight" textStyles="text-center" />
        <TitleText
          title={<>Insight about Solana crowdfunding</>}
          textStyles="text-center"
        />
        <div className="mt-[50px] flex flex-col gap-[30px]">
          <CampaignCard />
        </div>
      </motion.div>
    </section>
  );
};

export default Insights;
