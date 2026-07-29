import { motion } from "framer-motion";
import { FaPlane } from "react-icons/fa";

export default function AirplaneAnimation() {
  return (
    <motion.div
      initial={{
        x: "-20vw",
        y: "70vh",
        rotate: 20,
        opacity: 0,
      }}
      animate={{
        x: "120vw",
        y: "20vh",
        rotate: -15,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      <FaPlane
        size={40}
        className="text-blue-700 drop-shadow-lg"
      />
    </motion.div>
  );
}