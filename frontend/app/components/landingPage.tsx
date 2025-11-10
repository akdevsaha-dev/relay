"use client";
import { motion, Variants } from "motion/react";
import Link from "next/link";
import { MoveRight, Zap } from "lucide-react";
import Image from "next/image";
import { Navbar } from "./navbar";

const headingText = "Stay connected without trying hard.";
const words = headingText.split(" ");

const paragraphText =
  "Stay in sync with your people, everyday because being social should feel natural and not like a show.";
const paraWords = paragraphText.split(" ");

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
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
      delayChildren: 0.03,
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
export const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#FFFEFC]">
      <div className="flex min-h-screen w-full flex-col items-center bg-[#F5F3EE] pb-10">
        <Navbar />
        <div className="w-[90%] lg:w-[55%] pt-[12vh]">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="px-4 md:px-12 text-center text-5xl md:text-[72px] leading-none font-semibold tracking-tight antialiased"
          >
            {words.map((word, index) => (
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
            className=" px-6 md:px-32 pt-6 text-center text-lg"
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
          <div className="mt-10 flex h-20 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="flex cursor-pointer items-center gap-5 rounded-2xl bg-white px-9 py-4"
            >
              <div className="rounded-[10px] bg-black px-2 py-1">
                <MoveRight color="white" width={13} />
              </div>
              <Link href="/signup" className="text-sm">
                Get started
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="h-[400px] w-[70%]"></div>

        <div className="mb-6 flex h-auto w-full justify-center">
          <div className="w-full md:w-[85%] xl:w-[65%] flex flex-col md:flex-row">
            <div className="md:flex-1 pl-6 md:pl-14 md:pr-12 pr-16 py-10">
              <div className="text-xl md:text-2xl xl:text-4xl font-bold antialiased">
                Don’t just message. Make it matter.
              </div>
              <div className="pt-4 text-sm md:text-md lg:text-xl">
                Whispr isn’t just another chat app. It’s where real
                conversations live— smooth, fast, and distraction-free. Built
                for people who value connection over chaos.
              </div>
            </div>

            <div className="md:flex-1 border-t border-t-neutral-200 md:border-t-0 md:border-l md:border-l-neutral-200 pl-6 md:pl-14 md:pr-12 pr-16 py-10">
              <div className="text-xl md:text-2xl xl:text-4xl font-bold antialiased">
                Less noise. More signal. All just for you.
              </div>
              <div className="pt-4 text-sm md:text-md lg:text-xl">
                No more ping fatigue. Whispr filters the fluff and keeps your
                chats clean, smart, and human. It’s messaging that respects your
                time—and your energy.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-19 flex min-h-screen w-full justify-center">
        <div className="w-[57%]">
          <div className="w-[500px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.2, duration: 1.2 },
              }}
              className="tracking-none pr-4 text-[44px] leading-13 font-semibold"
            >
              Let go of the noise. Keep the people.
            </motion.div>
            <div className="mt-5 pr-12">
              Whispr is built for people who actually care about staying close —
              not just sending texts. We combine the speed of modern messaging
              with the warmth of real conversation, helping you stay
              effortlessly in sync with the people who matter, every day.
            </div>
            <div className="mt-5 pr-12">
              You shouldn’t have to scroll through clutter, dig through threads,
              or switch between five different platforms just to stay close.
            </div>
            <Link
              href={"/signup"}
              className="mt-8 flex gap-2 hover:font-semibold"
            >
              <div>Sign up</div>
              <div>
                {" "}
                <MoveRight size={20} className="pt-1.5" />
              </div>
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.2, duration: 1.2 },
            }}
            className="h-screen w-full"
          >
            <div className="mt-5 flex w-full flex-col gap-2">
              <div className="flex items-start justify-between gap-1">
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bento1.png"
                    alt="ben1"
                    className="mt-12 h-full w-full rounded-4xl object-cover"
                  />
                </div>
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bento2.png"
                    alt="ben2"
                    className="mt-20 h-full w-full rounded-4xl object-cover"
                  />
                </div>
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bent03.png"
                    alt="ben3"
                    className="mt-5 h-full w-full rounded-4xl object-cover"
                  />
                </div>
              </div>
              <div className="flex items-start justify-between gap-1">
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bento1.png"
                    alt="ben1"
                    className="mt-16 h-full w-full rounded-4xl object-cover"
                  />
                </div>
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bento2.png"
                    alt="ben2"
                    className="mt-24 h-full w-full rounded-4xl object-cover"
                  />
                </div>
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bent03.png"
                    alt="ben3"
                    className="mt-10 h-full w-full rounded-4xl object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex min-h-[300vh] w-full justify-center">
        <div className="flex w-[94%] justify-center rounded-[35px] bg-[#F5F3EE]">
          <div className="w-[90%]">
            <div className="mt-20 ">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.2, duration: 1.2 },
                }}
                className="tracking-non w-[800px] pr-4 text-[68px] leading-13 font-semibold"
              >
                Conversations that click, build real connection.
              </motion.div>
              <div className="mt-24 flex flex-col-reverse md:flex-row items-center md:items-start">
                <div className="w-full md:w-[600px] mt-8 md:mt-0">
                  <div className="mt-5 pr-6 md:pr-12 lg:text-lg font-medium">
                    Whispr goes beyond basic messaging. It’s an intelligent,
                    real-time communication platform designed for genuine,
                    uninterrupted connection.
                  </div>
                  <div className="mt-5 pr-6 md:pr-12 lg:text-lg font-medium">
                    Get an intuitive chat and calling experience with features
                    like real-time presence, smart typing indicators, message
                    receipts, and blazing-fast delivery so you’re never out of
                    sync, and always in the moment.
                  </div>
                  <Link href={"/signup"} className="mt-8 flex gap-2">
                    <div className="hover:font-bold text-xl">Sign up</div>
                    <MoveRight size={20} className="mt-1.5" />
                  </Link>
                </div>

                <div className="relative w-full mt-8 md:mt-0 flex justify-center">
                  <div className="relative sm:w-[80%] w-[95%] md:w-[400px] lg:w-[600px] aspect-16/10">
                    <Image
                      src="/videocall.png"
                      alt="big hero"
                      fill
                      className="rounded-[35px] object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-[14px] bg-white px-5 py-4 text-indigo-500 shadow-md">
                    <Zap size={20} className="fill-indigo-500 pt-1" />
                    <div>Excellent call</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-24 grid h-[80vh] grid-cols-2 border-t border-neutral-300 text-xl text-black">
              <div className="col-span-1 border-r border-neutral-300"></div>
              <div className="col-span-1">
                <div className="mt-10 ml-10 h-[330px] w-[590px]">
                  <Image
                    src={"/twoimg.png"}
                    alt="left"
                    height={500}
                    width={400}
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-10 ml-10">
                  <div className="text-2xl font-semibold">
                    Real-time conversations, zero complexity.
                  </div>
                  <div className="mt-5 text-sm text-neutral-700">
                    You don’t need to build or manage complex communication
                    infrastructure. Whispr handles the entire chat and video
                    calling experience for you — whether it’s casual,
                    professional, or collaborative.
                  </div>
                  <div className="mt-4 text-sm text-neutral-700">
                    Whispr gives you instant, real-time messaging, crystal-clear
                    video calls, and presence awareness — all in one seamless
                    platform.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 flex w-full flex-col items-center">
        <div className="w-[700px] text-center text-5xl font-semibold">
          Wone is the human-centered product in the world of AI.
        </div>
        <div className="mt-4 text-lg">
          {" "}
          Pioneering the next evolution of human connection.
        </div>
        <div className="text-lg">
          Engineered with the world’s leading experts in real-time
          communication.
        </div>
      </div>
      <div className="mt-28 mb-10 flex min-h-[200vh] w-full justify-center">
        <div className="flex w-[94%] justify-center rounded-[35px] border-4 border-stone-100"></div>
      </div>
      <div className="mt-10 mb-10 flex min-h-[52vh] w-full justify-center">
        <div className="flex w-[94%] justify-between rounded-[40px] bg-black">
          <div className="flex flex-col">
            <div className="col-span-3 mt-20 ml-20 font-sans text-4xl font-bold text-white">
              whisper{" "}
            </div>
            <div className="mt-5 ml-20 w-[300px] text-lg font-thin text-white">
              Your own, personal call room. Video. Voice. Chat. Instantly.
            </div>
            <div className="mt-14 ml-20 flex w-[150px] cursor-pointer items-center gap-4 rounded-2xl bg-white px-3 py-4 pl-6">
              <div className="rounded-[10px] bg-black px-2 py-1">
                <MoveRight color="white" width={13} />
              </div>
              <Link href="/signup" className="text-sm">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col text-sm text-white">
            <div className="mt-24 mr-[200px] mb-8">Product</div>
            <div className="space-y-3">
              {["Overview", "Sourcing", "Evaluation", "Communication"].map(
                (item) => (
                  <div
                    key={item}
                    className="cursor-pointer hover:text-neutral-300"
                  >
                    {" "}
                    {item}{" "}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
