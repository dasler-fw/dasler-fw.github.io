import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [step, setStep] = useState<number>(0);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [finalInput, setFinalInput] = useState("");

  const finalInputRef = useRef<HTMLInputElement | null>(null);

  const welcomeText = "добро пожаловать в компанию «кмм». мы напишем вам программу.";

  useEffect(() => {
    if (step !== 0) return;
    let i = 0;
    setConsoleLines([""]);

    const interval = setInterval(() => {
      setConsoleLines([welcomeText.slice(0, i + 1)]);
      i++;
      if (i > welcomeText.length) {
        clearInterval(interval);
        setTimeout(() => setStep(1), 500);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step !== 3) return;

    const t = setTimeout(() => {
      runFakeConsole();
    }, 2500);

    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step === 4 && !isTyping && finalInputRef.current) {
      finalInputRef.current.focus();
    }
  }, [step, isTyping]);

  const runFakeConsole = () => {
    const lines = [
      "loading modules...",
      "connecting to server...",
      "initializing neural interface...",
      "done."
    ];

    setConsoleLines([]);
    let i = 0;
    const interval = setInterval(() => {
      setConsoleLines((prev) => [...prev, lines[i]]);
      i++;
      if (i === lines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setConsoleLines([]);
          setIsTyping(false);
          setStep(4);
        }, 800);
      }
    }, 200);
  };

  return (
    <div className="w-full h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-2xl text-left text-lg leading-relaxed">
        {consoleLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}

        {step === 1 && (
          <div className="mt-4">
            <span>Введите номер телефона и нажмите enter: </span>
            <input
              autoFocus
              className="bg-transparent border-none outline-none text-green-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && phone.trim().length > 0) {
                  setStep(2);
                }
              }}
            />
          </div>
        )}

        {step === 2 && (
          <div className="mt-2">
            <span>Что хотите обсудить? (после ввода нажмите enter) </span>
            <input
              autoFocus
              className="bg-transparent border-none outline-none text-green-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim().length > 0) {
                  setStep(3);
                }
              }}
            />
          </div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-4"
          >
            Мы вам напишем или позвоним в течение дня...
          </motion.div>
        )}

        {step === 4 && !isTyping && (
          <input
            ref={finalInputRef}
            autoFocus
            value={finalInput}
            onChange={(e) => setFinalInput(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            className="mt-4 bg-transparent border-none outline-none text-green-400 animate-pulse w-full"
            placeholder="|"
            aria-label="консольный ввод"
          />
        )}
      </div>
    </div>
  );
}
