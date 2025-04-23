import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimacionFadeUp({ children }) {
  const { ref, inView } = useInView({
    triggerOnce: false, // Cambia a true si se qyiere que la animación ocurra solo una vez
    threshold: 0.15,
  });
  

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 60 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
