import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StickyCTAProps {
  onClick: () => void;
}

const StickyCTA = ({ onClick }: StickyCTAProps) => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
    className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent md:hidden"
  >
    <Button
      onClick={onClick}
      className="w-full h-14 text-base font-bold rounded-xl shadow-lg shadow-primary/30"
    >
      Jetzt Corporate Benefit starten
    </Button>
  </motion.div>
);

export default StickyCTA;
