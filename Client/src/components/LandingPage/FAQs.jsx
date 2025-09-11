import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Peer-to-Peer (P2P) lending?",
    answer:
      "P2P lending allows individuals to borrow and lend money directly without the involvement of a traditional financial institution.",
  },
  {
    question: "How is my data and investment kept secure?",
    answer:
      "We use bank-level encryption and comply with industry security standards to ensure your data and investments remain safe.",
  },
  {
    question: "What are the eligibility criteria for getting a loan?",
    answer:
      "Eligibility is determined based on factors like credit score, repayment history, and our internal risk assessment model.",
  },
  {
    question: "What are the risks involved for lenders?",
    answer:
      "Lenders face the risk of borrower default. However, our platform uses data-driven assessments to minimize this risk.",
  },
  {
    question: "How are interest rates determined on the platform?",
    answer:
      "Interest rates are determined by market demand, borrower risk profile, and our automated assessment models.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="w-full py-16 px-6 bg-white">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          Get answers to common questions about our peer-to-peer lending
          platform.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 cursor-pointer"
          >
            <div
              className="flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-gray-900 font-medium">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
