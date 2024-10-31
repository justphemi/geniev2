"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayCircle, CheckCircle, ArrowRight, BarChart2, DollarSign, TrendingUp, ChartCandlestick } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from 'framer-motion';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, 10);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
};

const faqs = [
  { question: "What is Greenpips?", answer: "Greenpips is an AI-powered trading platform that provides real-time insights and market analytics to optimize trading decisions." },
  { question: "Is Greenpips secure?", answer: "Yes, security is our top priority. We utilize advanced encryption and safety measures to protect all user data." },
  { question: "How accurate are the predictions?", answer: "Our predictions have a 98% accuracy rate based on real-time and historical data analysis." },
  { question: "What features does Greenpips offer?", answer: "We offer a range of features, including automated trading, market analysis, and customizable alerts." },
  { question: "Can I use Greenpips on my mobile device?", answer: "Yes, Greenpips is accessible on both desktop and mobile devices for your convenience." },
  { question: "How can I get support?", answer: "You can reach our support team via email or through the chat feature on our website." },
];

const Accordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-[70%] md:w-[100%] mx-auto">
      {faqs.map((faq, index) => (
        <div key={faq.question} className="border-b">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between items-center w-full py-4 text-lg font-bold text-left text-green-500 focus:outline-none"
          >
            {faq.question}
            <span className={`${openIndex === index ? 'transform rotate-180' : ''} transition-transform duration-200`}>
              ▼
            </span>
          </button>
          {openIndex === index && (
            <div className="pb-4 text-gray-400">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const AnimatedChart = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      pathLength: [0, 1],
      transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
    });
  }, [controls]);

  return (
    <svg viewBox="0 0 100 25" className="w-full h-24">
      <motion.path
        d="M0,25 Q25,5 50,15 T100,20"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={controls}
      />
    </svg>
  );
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-full m-0 p-0 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-none bg-transparent">
        <div className="container mx-auto px-12 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
          <Link href="/">
            <BarChart2 className="w-8 h-8 text-green-500" />
          </Link>
            <span className="font-bold text-green-500">Greenpips Inc.</span>
          </motion.div>
          <div className="hidden items-center gap-8">
            {['Home', 'Features', 'Pricing', 'About'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="#" className="text-sm hover:text-green-400">{item}</Link>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" className="hidden md:inline-flex text-white hover:text-green-400 hover:bg-green-500/10">              
              <Link href="/v2">Get Started</Link>
            </Button>
            {/* <Button className="bg-green-600 hover:bg-green-700 text-[#efefef] font-bold">
              <Link href="/v2">Get Started</Link>
            </Button> */}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-4 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent" />
        <div className="container mx-auto text-center items-center w-full flex flex-col relative z-10">
          <motion.div 
            className="inline-flex items-center gap-2 bg-green-500/10 rounded-full px-4 py-1 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm">🚀 Your Smart Trading Guide</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl text-center lg:max-w-[70%] md:max-w-[90%] font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >Bringing artificial intelligence into the financial markets.
           </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Harness the power of AI to optimize your trading decisions to maximize returns.            
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* <Button className="bg-green-600 hover:bg-green-700 text-[#efefef] font-bold text-lg px-8 py-6">
              Get Started
            </Button> */}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent" /> */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "98", label: "Accuracy Rate" },
              { value: "4500", label: "Active Traders" },
              { value: "12800", label: "Markets Analyzed" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="text-6xl font-bold text-green-500">
                  <AnimatedNumber value={stat.value} />
                  {stat.value == "98" ?  <span className="text-6xl">%</span> : <span className="text-6xl">+</span>}
                </h4>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <AnimatedChart />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 lg:max-w-[70%] bg-black/50">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent" /> */}
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our<span className="text-green-500"> Features</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
                { icon: BarChart2, title: "Advanced Analytics", description: "Real-time market analysis and predictions." },
                { icon: TrendingUp, title: "Smart Algorithms", description: "AI-driven trading strategies optimization." },
                { icon: ChartCandlestick, title: "Maximum Profit", description: "Thorough analysis and market monitoring for maximum profits." },
                { icon: DollarSign, title: "Risk Management", description: "Intelligent risk assessment and mitigation." },
                { icon: CheckCircle, title: "User-Friendly Interface", description: "Designed for simplicity and efficiency." },
                { icon: PlayCircle, title: "Live Trading", description: "Trade in real-time with minimal lag." },
              ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-green-900/20 border-green-500/20 p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-lg text-[#e5e5e5] font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                  {/* <Button variant="ghost" className="mt-4 text-green-500 hover:text-green-400 hover:bg-green-500/10">
                    Learn More
                  </Button> */}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 lg:max-w-[70%] bg-black/50">
        <div className="absolute inset-1 bg-gradient-to-b from-green-900/20 to-transparent" />
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hear from Our <span className="text-green-500">Traders</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
                { name: "Kofi FX", feedback: "Greenpips has transformed my trading experience! The AI predictions are spot-on." },
                { name: "TJ Traydes", feedback: "I never thought trading could be this efficient. Amazing features and easy to use." },
                { name: "Jeffery Benson", feedback: "I'm impressed and speechless at the same time. Wow!!" },
                { name: "Dax", feedback: "Their algorithms and reliability is a dream come true for me!" },
                { name: "Aisha Ahmed", feedback: "Greenpips has made trading accessible and profitable for me." },
                { name: "Samuel Ndlovu", feedback: "The support team is amazing, and the platform is very reliable!" },
              ].map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-green-900/20 border-green-500/20 p-6 flex flex-col h-full">
                  <p className="text-gray-400 mb-4">&#34;{testimonial.feedback}&#34;</p>
                  <p className="text-green-500 font-bold mt-auto">- {testimonial.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent" />
        <div className="container mx-auto w-full">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked <span className="text-green-500">Questions</span>
          </motion.h2>
         
          <Accordion faqs={faqs} />

        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 px-4 w-full bg-green-900/10 border-t border-green-500/10">
        <div className="container mx-auto text-center">
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BarChart2 className="w-8 h-8 text-green-500" />
            <span className="font-bold text-green-500">Greenpips Inc.</span>
          </motion.div>
          <p className="text-gray-400 mb-4">Empowering traders with AI-driven insights and smarter decisions.</p>
          <div className="flex justify-center gap-6 mb-4 sm:flex-col">
            {['Terms & Conditions', 'Privacy Policy', 'Careers', 'Contact Us', 'Sponsorship'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="#" className="text-sm text-green-500 hover:text-green-400">{item}</Link>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-500 text-xs">© 2024 Greenpips Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
