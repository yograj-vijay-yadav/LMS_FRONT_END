import { useMemo, useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

const QUICK_REPLIES = [
  {
    match: ["course", "courses"],
    reply: "You can browse all courses from the 'All Courses' menu or click 'Explore Courses' on the home page.",
  },
  {
    match: ["login", "sign in"],
    reply: "Use the Login button in the side menu. If you are new, create an account from Signup first.",
  },
  {
    match: ["contact", "support", "help"],
    reply: "You can reach us from the Contact Us page. We usually respond quickly to learner queries.",
  },
  {
    match: ["price", "cost", "fees"],
    reply: "Course pricing is shown on each course card and the course details page before checkout.",
  },
];

function getQuickReply(input) {
  const normalizedInput = input.toLowerCase();
  const matched = QUICK_REPLIES.find((item) =>
    item.match.some((keyword) => normalizedInput.includes(keyword))
  );

  return (
    matched?.reply ||
    "Thanks for your message. For specific questions, please share course name or your issue in detail."
  );
}

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm your LMS assistant. Ask me about courses, login, pricing, or support.",
    },
  ]);

  const chatbotApiUrl = useMemo(() => import.meta.env.VITE_CHATBOT_API_URL, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setMessage("");

    if (!chatbotApiUrl) {
      const fallbackReply = getQuickReply(trimmed);
      setMessages((prev) => [...prev, { role: "bot", text: fallbackReply }]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(chatbotApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();
      const botReply = data?.reply || getQuickReply(trimmed);

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm unable to connect right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-[320px] sm:w-[360px] rounded-xl shadow-2xl border border-gray-700 bg-gray-900 text-white overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-yellow-500 text-black">
            <h2 className="font-semibold">LMS Chat Support</h2>
            <button
              aria-label="Close chatbot"
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="h-72 overflow-y-auto p-3 space-y-3">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                  item.role === "user"
                    ? "ml-auto bg-yellow-500 text-black"
                    : "bg-gray-800"
                }`}
              >
                {item.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-800 w-fit px-3 py-2 rounded-lg text-sm">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 rounded-md px-3 py-2 text-black"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-md bg-yellow-500 text-black font-medium hover:bg-yellow-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          aria-label="Open chatbot"
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black shadow-xl flex items-center justify-center"
        >
          <FiMessageCircle size={24} />
        </button>
      )}
    </div>
  );
}

export default ChatbotWidget;
