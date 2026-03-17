import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Send, Bot, User } from "lucide-react";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const predefinedReplies: Record<string, string> = {
  "मौसम": "आज का मौसम साफ रहेगा, तापमान 30-35°C रहेगा। अगले 3 दिन बारिश की संभावना नहीं है। सिंचाई का अच्छा समय है। 🌤️",
  "भाव": "आज मंडी में गेहूँ ₹2,350/क्विंटल, धान ₹2,180/क्विंटल और सोयाबीन ₹4,600/क्विंटल चल रहा है। 📊",
  "खाद": "यूरिया ₹266/बैग (45 किग्रा), DAP ₹1,350/बैग। सरकारी केंद्र से सस्ता मिलेगा। नज़दीकी केंद्र की जानकारी ब्लॉक ऑफिस से लें। 🧪",
  "सिंचाई": "ड्रिप सिंचाई से 40-50% पानी बचता है। सरकार 90% तक सब्सिडी देती है। नज़दीकी कृषि कार्यालय में आवेदन करें। 💧",
  "कीट": "नीम के तेल का 5 मिली/लीटर पानी में घोल बनाकर शाम को छिड़काव करें। यह जैविक कीटनाशक है और फसल को नुकसान नहीं पहुँचाता। 🌿",
  "योजना": "PM किसान सम्मान निधि में ₹6,000/साल मिलते हैं। किसान क्रेडिट कार्ड पर 4% ब्याज पर लोन। अपने CSC केंद्र पर जाएं। 🏦",
};

const quickQuestions = [
  { label: "🌤️ मौसम", key: "मौसम" },
  { label: "💰 मंडी भाव", key: "भाव" },
  { label: "🧪 खाद की जानकारी", key: "खाद" },
  { label: "💧 सिंचाई टिप्स", key: "सिंचाई" },
  { label: "🐛 कीट नियंत्रण", key: "कीट" },
  { label: "🏦 सरकारी योजना", key: "योजना" },
];

const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      text: "नमस्ते! 🙏 मैं आपका AI खेती सहायक हूँ। मुझसे मौसम, मंडी भाव, खाद, सिंचाई या किसी भी खेती से जुड़ा सवाल पूछें!",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIReply = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    for (const [key, reply] of Object.entries(predefinedReplies)) {
      if (lowerText.includes(key)) return reply;
    }
    return "अच्छा सवाल है! 🤔 मैं आपकी फसल के बारे में और जानकारी इकट्ठा कर रहा हूँ। कृपया अपने नज़दीकी कृषि विज्ञान केंद्र (KVK) से भी संपर्क करें - वे आपको बेहतर मार्गदर्शन दे सकते हैं।";
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const reply: ChatMessage = { id: Date.now() + 1, role: "assistant", text: getAIReply(text) };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1200);
  };

  const simulateVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      sendMessage("मौसम कैसा रहेगा आज?");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-sky px-5 pt-6 pb-5 rounded-b-3xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">🤖 AI सहायक</h1>
            <p className="text-sm text-primary-foreground/80">बोलकर या लिखकर पूछें</p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-3 flex-shrink-0 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {quickQuestions.map((q) => (
            <button
              key={q.key}
              onClick={() => sendMessage(q.key)}
              className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground
                         active:scale-95 transition-transform whitespace-nowrap"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-sky" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-md"
                  : "bg-card border border-border text-foreground rounded-tl-md"
              }`}
            >
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-leaf-light flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 items-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-sky" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                  style={{ animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Voice Listening Overlay */}
      {isListening && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-card rounded-3xl p-8 text-center mx-6">
            <div className="w-24 h-24 rounded-full bg-sky-light flex items-center justify-center mx-auto mb-4 scan-animation">
              <Mic className="w-12 h-12 text-sky" />
            </div>
            <p className="text-lg font-bold text-foreground">सुन रहा हूँ...</p>
            <p className="text-sm text-muted-foreground mt-1">अपना सवाल बोलें 🎙️</p>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 px-4 py-3 bg-card border-t border-border">
        <div className="flex gap-2 items-center">
          <button
            onClick={simulateVoice}
            className="w-12 h-12 rounded-full bg-sky flex items-center justify-center flex-shrink-0
                       active:scale-90 transition-transform"
          >
            <Mic className="w-6 h-6 text-primary-foreground" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(inputText)}
            placeholder="यहाँ लिखकर पूछें..."
            className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground
                       placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-sky/50"
          />
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0
                       disabled:opacity-40 active:scale-90 transition-transform"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
