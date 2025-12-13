"use client";
import React from "react";
import { motion } from "framer-motion";


export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Record<string, string>[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-[#030303]"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name }, i) => (
                <div className="p-10 rounded-3xl border border-white/10 max-w-xs w-full bg-neutral-900/50 backdrop-blur-sm" key={i}>
                  <div className="text-neutral-300 font-light italic">"{text}"</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-white/10 bg-neutral-800"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
                      }}
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "Sumit sir chi teaching method khup simple ahe. Market chi bhiti ghalavli tyanni. Best mentorship for beginners!",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=500&auto=format&fit=crop", // Indian Male (Casual)
    name: "Rohit Patil",
  },
  {
    text: "Suruvatila confusion hota, pan 'The Rich Royals' join kelyavar confidence aala. Aata consistently profit kartoy.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=500&auto=format&fit=crop", // Indian Female (Authentic)
    name: "Snehal Deshmukh",
  },
  {
    text: "Risk management shiach market madhe takau dharu shakat nahi, he Sumit sir ne khup chan paddhatine samjavla.",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=500&auto=format&fit=crop", // Indian Male (Smiling)
    name: "Amit Kulkarni",
  },
  {
    text: "Live sessions madhe khup kahi shikal bhetat. Practical knowledge ek number ahe. Khup helpful community ahe.",
    image: "https://images.unsplash.com/photo-1615022702095-ff2c036f3360?q=80&w=500&auto=format&fit=crop", // Indian Female (Portrait)
    name: "Pooja Jadhav",
  },
  {
    text: "Marathi community sathi evdha chan guidance milna khup avghad hota, pan Sumit sir ne te shaky kel. Great initiative!",
    image: "https://images.unsplash.com/photo-1627018304987-9b2f6b3e7e23?q=80&w=500&auto=format&fit=crop", // Indian Male (Young)
    name: "Vikas More",
  },
  {
    text: "Mala trading cha 'T' pan mahit navta. Aata mi swata analysis karun trade ghete. Thank you The Rich Royals.",
    image: "https://images.unsplash.com/photo-1588514578768-3e4e46048866?q=80&w=500&auto=format&fit=crop", // Indian Female (Natural)
    name: "Neha Sawant",
  },
  {
    text: "Consistency aali trading madhe. Loss kami ani profit jast hotoy aata. Mindset develop zala.",
    image: "https://images.unsplash.com/photo-1543132220-444524f1e8d1?q=80&w=500&auto=format&fit=crop", // Indian Male (Glasses/Professional)
    name: "Siddharth Gaikwad",
  },
  {
    text: "Support system khup strong ahe. Kahi doubt asel tar lagech clear hoto. Best experience so far.",
    image: "https://images.unsplash.com/photo-1597223591421-2852859d75bd?q=80&w=500&auto=format&fit=crop", // Indian Female (Smiling)
    name: "Manasi Shinde",
  },
  {
    text: "Financial freedom kade janyacha marg sapadla. Simple language madhe sagla samjavtat. Highly recommended!",
    image: "https://images.unsplash.com/photo-1583341612074-cce5ec64f1a7?q=80&w=500&auto=format&fit=crop", // Indian Male (Confident)
    name: "Ajay Pawar",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export const Testimonials = () => {
  return (
    <section className="bg-[#030303] py-20 relative overflow-hidden">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 py-1 px-4 rounded-full text-sm font-medium">Testimonials</div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5 text-white text-center">
            Success Stories
          </h2>
          <p className="text-center mt-5 text-neutral-400">
            Hear from our students who have transformed their lives through trading.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};