import { motion } from "framer-motion";
import { ReactNode } from "react";

const animations = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

type AnimatedPageProps = {
  forward?: boolean;
  children: ReactNode;
};

export const AnimatedPage = ({ forward, children }:  AnimatedPageProps) => {
  return (
    <motion.div
      variants={{
        initial: forward ? { ...animations.initial, x: 100 } : animations.initial,
        animate: animations.animate,
        exit: forward ? { ...animations.exit, x: 100 } : animations.exit,
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      className="overflow-hidden"
      transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
};
