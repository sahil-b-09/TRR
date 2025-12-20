"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Circle, Crown, BadgeCheck, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";


function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96] as [number, number, number, number],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export function HeroGeometric() {
    // List of possible filenames to try in order
    const [imgSrc, setImgSrc] = useState("/hero-profile.jpg");
    const [hasError, setHasError] = useState(false);

    const handleImageError = () => {
        const currentSrc = imgSrc;
        // Try various common formats and cases sequentially
        if (currentSrc === "/hero-profile.jpg") setImgSrc("/founder.png");
        else if (currentSrc === "/founder.jpg") setImgSrc("/founder.jpeg");
        else if (currentSrc === "/founder.jpeg") setImgSrc("/founder.PNG"); // Case sensitive
        else if (currentSrc === "/founder.PNG") setImgSrc("/founder.JPG");
        else if (currentSrc === "/founder.JPG") setImgSrc("/Founder.png"); // Capitalized filename
        else if (currentSrc === "/Founder.png") setImgSrc("/Founder.jpg");
        else if (currentSrc === "/Founder.jpg") setImgSrc("/Founder.jpeg");
        else {
            // If all attempts fail, hide the image and show the placeholder
            setHasError(true);
        }
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center justify-center h-full text-center pt-20">

                {/* Brand / Profile Section */}
                <motion.div
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-8 flex flex-col items-center"
                >
                    <div className="w-32 h-32 rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-2 mb-6 shadow-2xl shadow-indigo-500/10 flex items-center justify-center overflow-hidden relative group">
                        {/* Logo Image Container */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-rose-500/20 opacity-50"></div>

                        {/* Placeholder / Background - Always visible as base */}
                        <div className="absolute inset-0 flex items-center justify-center z-0 bg-neutral-800/80">
                            <User className="w-12 h-12 text-white/20" />
                        </div>

                        {!hasError && (
                            <img
                                src={imgSrc}
                                alt="Sumit Bagul"
                                className="w-full h-full object-cover object-[center_20%] scale-[1.35] relative z-10 rounded-full transition-transform duration-500 hover:scale-[1.45]"
                                onError={handleImageError}
                            />
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Sumit Bagul</h2>
                            <BadgeCheck className="w-6 h-6 text-sky-400 fill-sky-400/20" />
                        </div>
                        <p className="text-sm font-medium text-white/40 tracking-wider uppercase">@TheRichRoyals</p>
                    </div>
                </motion.div>

                {/* Main Headline */}
                <motion.div
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 block mb-2">
                            WE ARE HERE
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                            TO MAKE YOU
                        </span>
                    </h1>
                </motion.div>

                {/* Description */}
                <motion.div
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-base sm:text-lg md:text-xl text-white/50 mb-10 leading-relaxed font-light tracking-wide">
                        Sumit Bagul is the founder of The Rich Royals. Sumit’s mission is not only to master financial markets but to empower others to do the same.
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                    custom={3}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://wa.me/918446394909?text=Hey,%20I%20want%20to%20learn%20Forex%20trading."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-12 px-8 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                            Start Your Journey
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Link
                                to="/tools/risk-calculator"
                                className="h-12 px-6 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-all w-full sm:w-auto flex items-center justify-center"
                            >
                                Risk Calc
                            </Link>
                            <Link
                                to="/tools/pip-calculator"
                                className="h-12 px-6 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-all w-full sm:w-auto flex items-center justify-center"
                            >
                                Pip Ruler
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}
