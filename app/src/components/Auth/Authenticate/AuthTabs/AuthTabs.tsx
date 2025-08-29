import { motion } from "framer-motion";

const tabVariants = {
  active: { borderBottomWidth: 3, borderColor: "#38bdf8" },
  inactive: { borderBottomWidth: 0, borderColor: "transparent" },
};

type AuthTabsProps = {
  isLogin: boolean;
  setIsLogin: (val: boolean) => void;
};

export default function AuthTabs({ isLogin, setIsLogin }: AuthTabsProps) {
  return (
    <div className="flex justify-center mb-8 gap-20 border-b border-neutral-700">
      <motion.button
        type="button"
        onClick={() => setIsLogin(true)}
        className="text-xl font-semibold text-slate-100 pb-3 px-6"
        animate={isLogin ? "active" : "inactive"}
        variants={tabVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        Login
      </motion.button>
      <motion.button
        type="button"
        onClick={() => setIsLogin(false)}
        className="text-xl font-semibold text-slate-100 pb-3 px-6"
        animate={!isLogin ? "active" : "inactive"}
        variants={tabVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        Sign Up
      </motion.button>
    </div>
  );
}
