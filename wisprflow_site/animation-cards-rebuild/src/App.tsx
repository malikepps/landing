import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PricingCard from "./components/PricingCard";

const pricingPlans = [
  {
    id: 1,
    title: "✨ Supporter ✨",
    price: 10,
    period: "mo.",
    benefit: "Weekly updates",
    buttonColor: "#034F46"
  },
  {
    id: 2,
    title: "🌟 Advocate 🌟",
    price: 25,
    period: "mo.",
    benefit: "Feeds 5 families/week",
    buttonColor: "#FFA946"
  },
  {
    id: 3,
    title: "💎 Champion 💎",
    price: 50,
    period: "mo.",
    benefit: "Sponsors 1 child",
    buttonColor: "#034F46"
  },
  {
    id: 4,
    title: "👑 Partner 👑",
    price: 100,
    period: "mo.",
    benefit: "Full program support",
    buttonColor: "#FFA946"
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % pricingPlans.length);
    }, 7000); // Slower animation (from 4000 to 7000)

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return pricingPlans.length - 1;
      if (nextIndex >= pricingPlans.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative w-[516px] h-[900px] flex items-center justify-center">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }}
          className="absolute w-full h-[450px]"
        >
          <PricingCard {...pricingPlans[currentIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
