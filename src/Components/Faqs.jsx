import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, MessageCircleQuestion } from "lucide-react";

/* ---------------- utils (cn) ---------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------- Badge ---------------- */
function Badge({ children, className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-wider",
        "border-pink-500 text-pink-500",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- FAQ Item ---------------- */
function FAQItem({ question, answer, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "rounded-lg border border-white/10 transition-all duration-300",
        isOpen ? "bg-white/5 shadow-lg" : "hover:bg-white/5"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/5"
        type="button"
      >
        <h3
          className={cn(
            "text-left text-base font-medium",
            isOpen ? "text-pink-400" : "text-white/80"
          )}
        >
          {question}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "rounded-full p-1",
            isOpen ? "text-pink-400" : "text-white/50"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-white/10 px-6 pb-4 pt-2">
              <p className="text-sm leading-relaxed text-white/60">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------- Main Component ---------------- */
export default function Faqs() {
  const faqs = [
    {
      question: "What courses are available with a subscription?",
      answer:
        "Our subscription gives you unlimited access to all available courses, including new releases added regularly.",
    },
    {
      question: "Can I access the LMS on mobile devices?",
      answer:
        "Yes, the LMS works seamlessly on desktop, tablet, and mobile browsers.",
    },
    {
      question: "Do I need to pay before starting a course?",
      answer:
        "You can explore free sample lessons, but full course access requires an active subscription.",
    },
    {
      question: "How do I manage my subscription?",
      answer:
        "You can upgrade, downgrade, or cancel your subscription anytime from your account settings.",
    },
    {
      question: "Is there support if I face issues?",
      answer:
        "Yes, you can reach out via the support page or use our chatbot for quick help.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="bg-black px-4 py-16 text-white md:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-pink-500/20 bg-gradient-to-b from-zinc-900 to-black p-6 shadow-[0_0_40px_rgba(236,72,153,0.12)] md:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/15 text-pink-400">
            <MessageCircleQuestion className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-400">
            FAQs
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Easy answers to common questions
          </h2>
          <p className="mt-3 text-sm text-white/65 md:text-base">
            Everything you need to know about our LMS subscription
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              {...faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? -1 : index)
              }
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-16 max-w-md rounded-xl border border-pink-500/30 bg-pink-500/10 p-6 text-center"
        >
          <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500/20 text-pink-400">
            <Mail className="h-4 w-4" />
          </div>

          <p className="text-sm font-medium text-white">Still have questions?</p>
          <p className="mt-1 text-xs text-white/60">We’re here to help you</p>

          <button className="mt-4 rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-600">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
