import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Camera, MessageCircle, Leaf, Sun, CloudRain, User, BookOpen, Info } from "lucide-react";
import ProfileDrawer from "@/components/ProfileDrawer";
import FloatingChatButton from "@/components/FloatingChatButton";

const Dashboard = () => {
  const navigate = useNavigate();
  const [farmerName, setFarmerName] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [savedCrops, setSavedCrops] = useState<string[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("farmerName");
    const crop = localStorage.getItem("selectedCrop");
    if (!name || !crop) {
      navigate("/");
      return;
    }
    setFarmerName(name);
    setSelectedCrop(crop);
    const crops = localStorage.getItem("savedCrops");
    if (crops) setSavedCrops(JSON.parse(crops));
    else setSavedCrops([crop]);
  }, [navigate]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "सुप्रभात";
    if (hour < 17) return "नमस्ते";
    return "शुभ संध्या";
  };

  const emojiMap: Record<string, string> = {
    "गेहूँ": "🌾", "धान": "🌿", "सोयाबीन": "🫘", "मक्का": "🌽",
    "चना": "🫛", "मूंगफली": "🥜", "तरबूज": "🍉", "खीरा": "🥒",
    "सरसों": "🌼", "आलू": "🥔", "प्याज": "🧅", "टमाटर": "🍅",
    "गन्ना": "🎋", "कपास": "☁️", "आम": "🥭", "केला": "🍌",
    "मिर्च": "🌶️", "बैंगन": "🍆", "संतरा": "🍊", "अनार": "🔴",
  };

  const quickActions = [
    { title: "फसल कैटलॉग", subtitle: "सभी फसलों की जानकारी", icon: BookOpen, color: "bg-leaf-light text-leaf", route: "/crop-catalog" },
    { title: "फसल देखभाल", subtitle: "फसल चक्र और टिप्स", icon: Sprout, color: "bg-leaf-light text-leaf", route: "/crop-management" },
    { title: "बीमारी पहचानें", subtitle: "फोटो से AI जांच करें", icon: Camera, color: "bg-sun-light text-secondary", route: "/crop-doctor" },
    { title: "AI सहायक", subtitle: "बोलकर पूछें", icon: MessageCircle, color: "bg-sky-light text-sky", route: "/assistant" },
    { title: "डेवलपर के बारे में", subtitle: "इस ऐप को किसने बनाया", icon: Info, color: "bg-sun-light text-secondary", route: "/about" },
  ];

  const weatherInfo = { temp: "32°C", condition: "धूप", humidity: "65%" };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="hero-gradient px-5 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm">{getGreeting()} 🙏</p>
            <h1 className="text-2xl font-bold text-primary-foreground">{farmerName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/about")}
              className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
            >
              <Info className="w-5 h-5 text-primary-foreground" />
            </button>
            <button
              onClick={() => setProfileOpen(true)}
              className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
            >
              <User className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sun className="w-10 h-10 text-accent" />
            <div>
              <p className="text-primary-foreground font-bold text-xl">{weatherInfo.temp}</p>
              <p className="text-primary-foreground/80 text-sm">{weatherInfo.condition} | नमी: {weatherInfo.humidity}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
              <CloudRain className="w-4 h-4" />
              <span>बारिश नहीं</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Crops */}
      <div className="px-5 -mt-4">
        <div className="action-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-leaf-light flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">आपकी फसलें</p>
              <p className="font-bold text-foreground">
                {savedCrops.length > 0 ? savedCrops.length + " फसलें ट्रैक हो रही हैं" : selectedCrop}
              </p>
            </div>
          </div>
          {savedCrops.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {savedCrops.map((crop) => (
                <span key={crop} className="px-3 py-1 rounded-full bg-leaf-light text-sm font-semibold text-foreground">
                  {emojiMap[crop] || "🌱"} {crop}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-6">
        <h2 className="text-lg font-bold text-foreground mb-4">क्या करना चाहेंगे? 👇</h2>
        <div className="space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={() => navigate(action.route)}
              className="action-card w-full flex items-center gap-4 text-left"
            >
              <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center flex-shrink-0`}>
                <action.icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground text-lg">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.subtitle}</p>
              </div>
              <div className="text-muted-foreground">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="px-5 mt-6">
        <div className="bg-sun-light rounded-2xl p-4 border border-accent/30">
          <p className="text-sm font-bold text-foreground mb-1">💡 आज की टिप</p>
          <p className="text-sm text-muted-foreground">
            फसल में पीलापन दिखे तो नाइट्रोजन की कमी हो सकती है। यूरिया की हल्की मात्रा छिड़कें।
          </p>
        </div>
      </div>

      <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <FloatingChatButton />
    </div>
  );
};

export default Dashboard;
