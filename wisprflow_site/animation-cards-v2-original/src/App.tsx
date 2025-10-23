import { motion } from "motion/react";
import PricingCard from "./components/PricingCard";

const pricingPlans = [
  {
    id: 1,
    title: "✨️ Champion ✨",
    price: 30,
    period: "mo.",
    benefit: "Buy 30 books for our kids!",
    buttonColor: "#15857a"
  },
  {
    id: 2,
    title: "🌟 Hero 🌟",
    price: 50,
    period: "mo.",
    benefit: "Buy 50 books for our kids!",
    buttonColor: "#d97706"
  },
  {
    id: 3,
    title: "💎 Legend 💎",
    price: 100,
    period: "mo.",
    benefit: "Fund 100 learning supplies!",
    buttonColor: "#7c3aed"
  }
];

export default function App() {
  const getCardAnimation = (index: number) => {
    // Card 0 (left)
    if (index === 0) {
      return {
        x: [0, -200, -200, 0],
        y: [0, 20, 20, 0],
        rotateZ: [0, -8, -8, 0],
        rotateY: [0, 15, 15, 0],
        zIndex: [20, 10, 10, 20],
        opacity: [1, 0.85, 0.85, 1]
      };
    }
    // Card 1 (center)
    if (index === 1) {
      return {
        x: 0,
        y: 0,
        rotateZ: 0,
        rotateY: 0,
        zIndex: 30,
        opacity: 1
      };
    }
    // Card 2 (right)
    return {
      x: [0, 200, 200, 0],
      y: [0, 20, 20, 0],
      rotateZ: [0, 8, 8, 0],
      rotateY: [0, -15, -15, 0],
      zIndex: [20, 10, 10, 20],
      opacity: [1, 0.85, 0.85, 1]
    };
  };

  return (
    <div className="relative w-[900px] h-[625px]" style={{ perspective: "2000px" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[516px] h-[563px]">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className="absolute w-full h-full"
            animate={getCardAnimation(index)}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            style={{
              transformOrigin: "center center",
              transformStyle: "preserve-3d"
            }}
          >
            <PricingCard {...plan} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
