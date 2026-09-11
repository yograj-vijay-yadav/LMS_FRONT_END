import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What courses are available with a subscription?",
    answer:
      "Your subscription gives you unlimited access to all available courses, including new releases added regularly.",
  },
  {
    question: "Can I access the LMS on mobile devices?",
    answer:
      "Yes. The LMS works seamlessly on desktop, tablet, and mobile browsers with responsive layouts everywhere.",
  },
  {
    question: "Do I need to pay before starting a course?",
    answer:
      "You can browse the full catalog for free — full lecture access requires an active subscription.",
  },
  {
    question: "How do I manage my subscription?",
    answer:
      "You can view your subscription status any time from your profile, where you can also cancel it.",
  },
  {
    question: "Is there support if I face issues?",
    answer:
      "Yes — reach out through the contact page and our team will get back to you quickly.",
  },
];

function FaqItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <div
      className={`card overflow-hidden transition-colors duration-200 ${
        isOpen ? "border-rose-500/40" : "hover:border-slate-700"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span
          className={`text-base font-medium ${
            isOpen ? "text-white" : "text-slate-200"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-rose-400" : "text-slate-500"
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-panel-${index}`}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-slate-800 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-400">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div className="anim-fade-up text-center">
            <span className="badge badge-rose font-semibold uppercase tracking-wider">
              FAQs
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Easy answers to common questions
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Everything you need to know about the learning platform.
            </p>
          </div>

          <div className="stagger mt-10 space-y-3">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
              />
            ))}
          </div>

          <div className="card anim-fade-up mt-12 p-6 text-center">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
              <MessageCircleQuestion className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm font-medium text-white">
              Still have questions?
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Our team is here to help you.
            </p>
            <Link to="/contact" className="btn btn-primary btn-sm mt-4">
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
