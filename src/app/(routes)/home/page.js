"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

function HomeHeroSection() {
  return (
    <>
      <header className="bg-white p-8">
        <div className="container">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-[85rem] px-4 pb-4 pt-20 sm:px-6 lg:px-8">
              <div className="relative mx-auto grid max-w-4xl space-y-5 sm:space-y-10">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 sm:text-5xl lg:text-6xl lg:leading-tight">
                    loremdsadasdasd f defaultad fad f
                    {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
                  {" "}
                  With Flippium
                </span> */}
                  </h1>
                </div>
                <div className="text-center">
                  <p className="text-xl text-gray-800 dark:text-gray-400">
                    afafkafbkjnkdcowmelkfmeqf
                  </p>
                </div>
                <div className="text-center sm:flex sm:items-center sm:justify-center sm:text-start">
                  <div className="flex-shrink-0 pb-5 sm:flex sm:pb-0 sm:pe-5">
                    <motion.div
                      className="box"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Link href="/dashboard/selling">
                        <Button
                          size="lg"
                          className="text-md bg-[#F5A623] py-6 font-semibold text-white hover:bg-[#F5A623] hover:opacity-90"
                        >
                          adfadfcadfqewf
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HomeHeroSection;
