"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, Globe, ShieldCheck, Brain, TrendingUp, Sprout, X, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timeline } from "@/components/ui/timeline";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion, animate } from "framer-motion";

interface TimelineItem {
  id: number;
  title: string;
  content: string;
  icon: React.ElementType;
  emoji: string;
  energy: number;
}

// New Curriculum Card Component with Glowing Effect and Animation
const CurriculumCard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10%" }}
      className="relative rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3 bg-neutral-900/20"
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-black/60 p-6 md:p-8 shadow-sm backdrop-blur-md">
         {children}
      </div>
    </motion.div>
  );
};

// Updated Curriculum Data with the 17-step Roadmap wrapped in CurriculumCard
const curriculumData = [
  {
    title: "Introduction",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Overview of the institute, the mentor, and the learning approach.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Basics of Market",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Foundational concepts of the Forex market and how it operates.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Stock vs Forex",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Understanding market size, trading hours, leverage, liquidity, and volatility.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Currency Market",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Structure of the global currency market and major currency pairs.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Forex Market in Detail",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          How Forex works, decentralization, brokers, and major trading sessions.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Technical Analysis",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Tools and methods to study price behavior and build trading strategies.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Chart Patterns",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          What chart patterns are and how to apply them effectively.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Candlestick Patterns",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Identifying market sentiment using candlestick formations.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Price Action",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Reading market movement, identifying key levels, and confirming entries.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "SMC (Smart Money Concepts)",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Institutional concepts, liquidity, confirmations, and avoiding common traps.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Strategies",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Core trading strategies for different market conditions.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Risk Management",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Position sizing, risk–reward, leverage control, and emotional discipline.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Mindset",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Discipline, emotional control, and habits for long-term trading success.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Monitor Performance",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Tracking progress, assessments, attendance, and knowledge retention.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Live Trading Sessions",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Real-time trade execution, management, and practical application.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Live Q&A Sessions",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Interactive sessions to clear doubts and deepen understanding.
        </p>
      </CurriculumCard>
    ),
  },
  {
    title: "Feedback",
    content: (
      <CurriculumCard>
        <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed tracking-wide">
          Review, follow-up, and student support.
        </p>
      </CurriculumCard>
    ),
  },
];

const outcomesData: TimelineItem[] = [
  {
    id: 1,
    title: "In-Depth Knowledge",
    content: "Comprehensive understanding of the Forex Market structure, participants, and dynamics.",
    icon: Globe,
    emoji: "🌍",
    energy: 90,
  },
  {
    id: 2,
    title: "Risk Management",
    content: "Mastering effective techniques to protect capital and maximize gains with precision.",
    icon: ShieldCheck,
    emoji: "🛡️",
    energy: 100,
  },
  {
    id: 3,
    title: "Mindset Control",
    content: "Developing strong emotional resilience and psychological discipline for the long game.",
    icon: Brain,
    emoji: "🧠",
    energy: 85,
  },
  {
    id: 4,
    title: "Live Execution",
    content: "Real-time decision making skills and the ability to execute trades without hesitation.",
    icon: TrendingUp,
    emoji: "⚡",
    energy: 95,
  },
  {
    id: 5,
    title: "LIFE MANAGEMENT",
    content: "Balancing financial growth with personal well-being for a holistic success story.",
    icon: Sprout,
    emoji: "🌱",
    energy: 80,
  },
];

export function RadialOrbitalTimelineDemo() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      if (isAnimating) return;
      setExpandedItems({});
      setAutoRotate(true);
    }
  };

  const snapToTop = (index: number, onComplete?: () => void) => {
    const total = outcomesData.length;
    const nodeBaseAngle = (index / total) * 360;
    const targetNodeAngle = 270; // 270 degrees is top position

    // Calculate current visual angle of the node
    const currentAngle = (nodeBaseAngle + rotationAngle) % 360;

    // Difference needed to reach target
    let delta = targetNodeAngle - currentAngle;
    
    // Strict Clockwise Rotation Logic:
    // If delta is negative (e.g., target is behind), add 360 to go forward
    while (delta < 0) {
        delta += 360;
    }
    // If delta is 0 (already at top), maybe do a full spin? No, just stay.
    
    animate(rotationAngle, rotationAngle + delta, {
      duration: 0.1, // Reduced to 0.1s as requested
      ease: "linear", // No snappy curves
      onUpdate: (latest) => setRotationAngle(latest),
      onComplete: () => {
        setIsAnimating(false);
        if (onComplete) onComplete();
      }
    });
  };

  const toggleItem = (id: number) => {
    if (isAnimating) return;

    const index = outcomesData.findIndex(item => item.id === id);
    const isCurrentlyExpanded = expandedItems[id];

    if (isCurrentlyExpanded) {
        // Closing
        setExpandedItems({});
        setAutoRotate(true);
    } else {
        // Opening
        setExpandedItems({}); // Close others immediately
        setAutoRotate(false);
        setIsAnimating(true);
        
        // Snap to top, THEN open
        snapToTop(index, () => {
            setExpandedItems({ [id]: true });
        });
    }
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;
    if (autoRotate && !showCurriculum && !isAnimating) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.2) % 360);
      }, 50);
    }
    return () => clearInterval(rotationTimer);
  }, [autoRotate, showCurriculum, isAnimating]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220; // Increased radius slightly
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.5, Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />

      {/* Header Text - Moved to Flex Item */}
      <div className={`mt-20 md:mt-12 w-full text-center z-20 transition-opacity duration-500 shrink-0 ${showCurriculum ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Course Outcomes</h2>
        <p className="text-white/50 text-sm uppercase tracking-widest">What you will achieve</p>
      </div>

      {/* Orbital System */}
      <div className={`relative flex-1 w-full max-w-4xl flex items-center justify-center transition-all duration-1000 ${showCurriculum ? 'scale-150 opacity-0 blur-xl pointer-events-none' : 'scale-100 opacity-100'}`}>
        <div
          className="absolute flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Reactor (Curriculum Button) */}
          <button 
            onClick={() => setShowCurriculum(true)}
            className="group absolute w-32 h-32 rounded-full flex items-center justify-center z-10 cursor-pointer outline-none transition-transform duration-500 hover:scale-110 active:scale-95"
          >
             {/* Core Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 blur-md group-hover:blur-xl transition-all duration-500 opacity-80"></div>
            <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-sm border border-white/20"></div>
            
            {/* Pulsing Rings */}
            <div className="absolute inset-[-20%] rounded-full border border-indigo-500/30 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-[-10%] rounded-full border border-violet-500/20 animate-[spin_7s_linear_infinite_reverse]"></div>

            {/* Text */}
            <div className="relative flex flex-col items-center justify-center text-center">
                <Zap className="w-6 h-6 text-yellow-400 mb-1 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                <span className="text-[10px] font-bold text-white tracking-widest leading-tight">EXPLORE</span>
                <span className="text-[10px] font-bold text-indigo-300 tracking-widest leading-tight">CURRICULUM</span>
            </div>
          </button>

          {/* Orbit Line */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 shadow-[0_0_100px_rgba(79,70,229,0.1)]"></div>

          {/* Outcome Nodes */}
          {outcomesData.map((item, index) => {
            const position = calculateNodePosition(index, outcomesData.length);
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                 {/* Energy Field */}
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-indigo-500/20 blur-xl transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* Node Circle */}
                <div
                  className={`
                  relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer
                  ${isExpanded ? "bg-white text-black scale-110" : "bg-black/80 text-white border border-white/20 hover:border-indigo-500 hover:text-indigo-400"}
                  transition-all duration-300 shadow-2xl
                `}
                >
                  <span className="text-xl">{item.emoji}</span>
                </div>

                {/* Label (Hidden when expanded) */}
                <div
                  className={`
                  absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider text-center w-32
                  transition-all duration-300
                  ${isExpanded ? "opacity-0 translate-y-2" : "opacity-70 text-white/60"}
                `}
                >
                  {item.title}
                </div>

                {/* Expanded Card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-neutral-900/95 backdrop-blur-xl border-white/10 shadow-2xl z-[999] animate-in fade-in zoom-in-95 duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-indigo-500"></div>
                    <CardHeader className="pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-indigo-400" />
                          <CardTitle className="text-sm font-bold text-white uppercase tracking-wide">
                            {item.title}
                          </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-neutral-300 leading-relaxed font-light">{item.content}</p>
                      
                      {/* Energy Bar Decoration */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${item.energy}%` }}></div>
                        </div>
                        <span className="text-[10px] text-white/30 font-mono">IMPACT</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Screen Curriculum Overlay */}
      {showCurriculum && (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-500 overflow-y-auto custom-scrollbar">
            <div className="sticky top-0 z-50 flex justify-between items-center p-6 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                     </div>
                     <div>
                         <h2 className="text-xl font-bold text-white">Curriculum Roadmap</h2>
                         <p className="text-xs text-neutral-400">Detailed breakdown of the program</p>
                     </div>
                </div>
                <button 
                    onClick={() => setShowCurriculum(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orbit
                </button>
            </div>
            
            <div className="pb-20">
                <Timeline data={curriculumData} />
            </div>
        </div>
      )}
    </div>
  );
}