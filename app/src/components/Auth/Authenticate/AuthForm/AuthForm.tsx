import { AnimatePresence, motion } from "framer-motion";
import Input from "../../../ui/Input/Input";
import { FaEnvelope, FaLock, FaUser, FaUserCircle } from "react-icons/fa";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import Loader from "../../../ui/Loader/Loader";

type AuthFormProps = {
  isLogin: boolean;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  username: string;
  setUsername: (val: string) => void;
  loading: boolean;
  handleSubmit: () => void;
};

export default function AuthForm({
  isLogin,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  username,
  setUsername,
  loading,
  handleSubmit,
}: AuthFormProps) {
  return (
    <motion.div layout transition={{ duration: 0.4, type: "spring" }}>
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              <Input
                icon={<FaEnvelope />}
                placeholder="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Input
                icon={<FaLock />}
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              <Input
                icon={<FaUserCircle />}
                placeholder="Full Name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
              <Input
                icon={<FaUser />}
                placeholder="Username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              <Input
                icon={<FaEnvelope />}
                placeholder="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Input
                icon={<FaLock />}
                placeholder="Password (min 6 characters)"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-center mt-6">
        <AnimatedButton
          onClick={handleSubmit}
          disabled={loading}
          type="button"
          className="w-48 block"
        >
          {loading ? <Loader /> : isLogin ? "Login" : "Sign Up"}
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
