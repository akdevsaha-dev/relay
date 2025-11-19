"use client";
import { motion, Variants } from "motion/react";
import { Navbar } from "./navbar";
import { InputBox } from "./inputBox";
import { useRef, useState } from "react";
import { Loader, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";

const headingText = "Welcome back chief, back to mission";
const headingWords = headingText.split(" ");
const paraText = "Take help of AI to text the girl you are talking to.";
const paraWords = paraText.split(" ");

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2, // optional: small delay before start
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
const paraContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 1,
    },
  },
};

const paraWordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const SigninComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signin = useAuthStore((state) => state.signin);
  const isSigninIn = useAuthStore((state) => state.isSigningIn);

  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function handleSubmit() {
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }
    const success = await signin({ email, password });
    if (success) {
      router.push("/chats");
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F3EE]">
      <Navbar />
      <div className="flex w-full flex-col items-center">
        <div className="w-[60%] pt-[12vh]">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="px-12 text-center text-[72px] leading-20 font-semibold tracking-tight antialiased"
          >
            {headingWords.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={paraContainerVariants}
            className="px-32 pt-6 text-center text-lg"
          >
            {paraWords.map((word, index) => (
              <motion.span
                variants={paraWordVariants}
                className="mr-1 inline-block"
                key={index}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 2,
            transition: {
              delay: 1,
              duration: 0.3,
            },
          }}
          className="mt-3 gap-3 font-thin text-black"
        >
          Don't have an account?
          <Link
            href={"/signup"}
            className="ml-2 text-blue-500 underline underline-offset-2"
          >
            Sign up
          </Link>
        </motion.div>
        <div className="mt-16 flex w-[60%] flex-col items-center">
          <InputBox
            value={email}
            label="Email*"
            placeholder="Enter email address"
            inputType="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                passwordRef.current?.focus();
              }
            }}
          />
          <InputBox
            value={password}
            ref={passwordRef}
            label="Password*"
            placeholder="Enter Password"
            inputType="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <div className="mt-10 flex h-20 items-center justify-center">
            <motion.button
              onClick={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex cursor-pointer items-center gap-5 rounded-2xl bg-[black]/50 px-9 py-4"
            >
              <div className="rounded-[10px] bg-white px-3 py-1">
                <MoveRight color="black" width={13} />
              </div>
              <div className="text-sm">
                {isSigninIn ? (
                  <Loader className="size-5 animate-spin" />
                ) : (
                  "sign in"
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
