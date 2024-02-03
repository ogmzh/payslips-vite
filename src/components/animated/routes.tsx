import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Dashboard } from "@/pages/dashboard";
import { PayslipDetails } from "@/pages/details";

export const AnimatedRoutes = ({
  setIsTop,
}: {
  setIsTop: (value: boolean) => void;
}) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard setIsTop={setIsTop} />} />
        <Route path="/dashboard" element={<Dashboard setIsTop={setIsTop} />} />
        <Route path="/payroll/:id" element={<PayslipDetails />} />
      </Routes>
    </AnimatePresence>
  );
};
