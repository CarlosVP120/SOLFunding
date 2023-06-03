'use client';
import { motion } from 'framer-motion';
import styles from '../styles';
import { navVariants } from '../utils/motion';
import { useState } from 'react';
import RegistrationForm from './RegistrationForm';

const Navbar = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleRegistrationClick = () => {
    setShowRegistrationForm(true);
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
      >
        <img
          src="/search.svg"
          alt="search"
          className="w-[24px] h-[24px] object-contain"
        />
        <h2
          className="font-extrabold text-[24px] leading-[30.24px] text-white"
          style={{ marginLeft: '180px', marginTop: '20px' }}
        >
          SOLANA CROWDFUNDING
        </h2>
        {showRegistrationForm ? (
          <RegistrationForm />
        ) : (
          <button
            type="button"
            className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]"
            onClick={handleRegistrationClick}
          >
            <span className="font-normal text-[16px] text-white">
              Register
            </span>
          </button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;