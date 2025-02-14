import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, googleProvider } from "../lib/firebase";
import { 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from "firebase/auth";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) router.push("/chat");
    });
    return unsubscribe;
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>

        {error && (
          <div className="p-3 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/20">
            {error}
          </div>
        )}

        <button
          onClick={signInWithGoogle}
          className="w-full p-3 flex items-center justify-center gap-2 bg-[#4285F4] hover:bg-[#357abd] text-white rounded-lg transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a5.94 5.94 0 1 1 0-11.88c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.822 9.822 0 0 0 12.545 2C7.021 2 2.545 6.477 2.545 12s4.476 10 10 10c5.523 0 10-4.477 10-10c0-.67-.069-1.325-.195-1.955H12.545z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400">
          {isSignUp ? "Already have an account?" : "New here?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-blue-600 hover:text-blue-700"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}