import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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

function PricingCard({ title, price, period, benefit, buttonColor }: {
  title: string;
  price: number;
  period: string;
  benefit: string;
  buttonColor: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-[10px]">
      <div className="flex shrink-0 flex-col items-center gap-[10px] rounded-[50px] border-[5px] border-solid border-white bg-black w-[427px] h-[322px]">
        <div className="relative flex shrink-0 flex-col items-center w-[406px] h-[183px]">
          <div className="absolute left-[calc(50%-0.5px)] top-[91.5px] flex w-full translate-x-[-50%] translate-y-[-50%] flex-col content-stretch items-center justify-center gap-[10px]">
            <div
              className="font-['Inter:Medium',_sans-serif] text-[40px] font-medium leading-[normal] text-nowrap text-center text-white not-italic"
            >
              {title}
            </div>
          </div>
        </div>
        <div className="relative flex shrink-0 flex-col items-center w-[439px] h-[71px]">
          <div className="absolute left-[257.5px] top-[219.5px] flex w-full translate-x-[-50%] translate-y-[-50%] flex-col content-stretch items-center justify-center gap-[10px]">
            <div className="flex flex-col content-stretch items-center justify-center gap-[10px]">
              <div
                className="flex flex-col content-stretch items-center justify-center gap-[10px] font-['Inter:Medium',_sans-serif] text-[76px] font-medium leading-[0] text-center text-white not-italic"
              >
                <div className="flex flex-col content-stretch items-center justify-center gap-[10px]">
                  <div className="whitespace-pre leading-[normal]">
                    ${price}
                    <span className="text-[rgba(255,255,255,0.5)]">/{period}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex w-full shrink-0 flex-col items-center h-[73px]">
          <div className="pointer-events-none absolute left-[258px] top-[322px] flex size-full translate-x-[-50%] translate-y-[-50%] flex-col content-stretch items-center justify-center gap-[10px] overflow-clip rounded-[inherit] text-[0px]">
            <div
              className="flex w-[516px] shrink-0 flex-col content-stretch items-center justify-center gap-[10px] rounded-[15px] text-center transition"
              style={{ backgroundColor: buttonColor }}
            >
              <div className="font-['Inter:Medium',_sans-serif] text-[32px] font-medium leading-[normal] text-nowrap text-center text-white not-italic">
                {benefit}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      opacity: 0,
      rotate: direction > 0 ? 15 : -15, // Add rotation for fun
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction < 0 ? 15 : -15, // Add rotation for fun
      scale: 0.8
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
    <div className="relative w-[516px] h-[600px] flex items-end pb-8">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 25 },
            opacity: { duration: 0.4 },
            rotate: { type: "spring", stiffness: 200, damping: 25 },
            scale: { duration: 0.4 }
          }}
          className="absolute w-full h-[450px] bottom-0"
        >
          <PricingCard {...pricingPlans[currentIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
