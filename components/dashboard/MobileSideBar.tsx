import { motion } from "framer-motion";
import Navigation from "./Navigation";

const mobileSideBarAnimations = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

export default function MobileSideBar() {
  return (
    <motion.div
      variants={mobileSideBarAnimations}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-[100dvh] w-[15rem] bg-secondary lg:hidden"
    >
      <Navigation />
    </motion.div>
  );
}
