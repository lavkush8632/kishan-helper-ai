import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingChatButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  // Don't show on assistant page itself
  if (location.pathname === "/assistant") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-card border border-border rounded-2xl p-3 shadow-lg w-48 animate-fade-in">
          <p className="text-sm font-semibold text-foreground">🤖 AI सहायक</p>
          <p className="text-xs text-muted-foreground mt-1">खेती से जुड़ा कोई भी सवाल पूछें!</p>
        </div>
      )}
      <button
        onClick={() => navigate("/assistant")}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-button)] 
                   flex items-center justify-center active:scale-90 transition-all float-bounce"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingChatButton;
