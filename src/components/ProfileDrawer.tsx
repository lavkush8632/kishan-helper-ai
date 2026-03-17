import { useState, useEffect } from "react";
import { X, User, MapPin, Phone, Settings, Sprout, Check } from "lucide-react";
import { cropDatabase } from "@/data/cropData";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const allCropNames = Object.keys(cropDatabase);

const ProfileDrawer = ({ isOpen, onClose }: ProfileDrawerProps) => {
  const [farmerName, setFarmerName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [savedCrops, setSavedCrops] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"profile" | "crops" | "settings">("profile");

  useEffect(() => {
    setFarmerName(localStorage.getItem("farmerName") || "");
    setPhone(localStorage.getItem("farmerPhone") || "");
    setLocation(localStorage.getItem("farmerLocation") || "");
    const crops = localStorage.getItem("savedCrops");
    if (crops) {
      setSavedCrops(JSON.parse(crops));
    } else {
      const selected = localStorage.getItem("selectedCrop");
      if (selected) setSavedCrops([selected]);
    }
  }, [isOpen]);

  const toggleCrop = (crop: string) => {
    setSavedCrops((prev) => {
      const next = prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop];
      localStorage.setItem("savedCrops", JSON.stringify(next));
      return next;
    });
  };

  const saveProfile = () => {
    localStorage.setItem("farmerName", farmerName);
    localStorage.setItem("farmerPhone", phone);
    localStorage.setItem("farmerLocation", location);
    onClose();
  };

  if (!isOpen) return null;

  const emojiMap: Record<string, string> = {};
  Object.values(cropDatabase).forEach((c) => { emojiMap[c.name] = c.emoji; });

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-2xl overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="hero-gradient px-5 pt-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary-foreground">👤 मेरी प्रोफाइल</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <X className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/40 flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <p className="text-lg font-bold text-primary-foreground">{farmerName || "किसान"}</p>
              <p className="text-sm text-primary-foreground/80">{savedCrops.length} फसलें ट्रैक कर रहे हैं</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {([
            { key: "profile", label: "जानकारी", icon: User },
            { key: "crops", label: "मेरी फसलें", icon: Sprout },
            { key: "settings", label: "सेटिंग्स", icon: Settings },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors
                ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5 space-y-4">
          {activeTab === "profile" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> नाम
                </label>
                <input
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" /> फोन नंबर
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="जैसे: 9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> स्थान
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="जैसे: गाँव, जिला, राज्य"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/60"
                />
              </div>
              <button
                onClick={saveProfile}
                className="w-full py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-[var(--shadow-button)] active:scale-[0.97] transition-all"
              >
                सेव करें ✅
              </button>
            </>
          )}

          {activeTab === "crops" && (
            <>
              <p className="text-sm text-muted-foreground">अपनी फसलें चुनें (एक से ज्यादा चुन सकते हैं):</p>
              <div className="grid grid-cols-3 gap-2 max-h-[60vh] overflow-y-auto">
                {allCropNames.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => toggleCrop(crop)}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all text-sm relative
                      ${savedCrops.includes(crop)
                        ? "border-primary bg-leaf-light text-foreground shadow-sm"
                        : "border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                  >
                    {savedCrops.includes(crop) && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <span className="text-lg block">{emojiMap[crop] || "🌱"}</span>
                    <span className="text-xs font-semibold">{crop}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-muted">
                <p className="text-sm font-semibold text-foreground">🌐 भाषा</p>
                <p className="text-xs text-muted-foreground mt-1">हिंदी (डिफ़ॉल्ट)</p>
              </div>
              <div className="p-4 rounded-xl bg-muted">
                <p className="text-sm font-semibold text-foreground">🔔 नोटिफिकेशन</p>
                <p className="text-xs text-muted-foreground mt-1">सक्रिय</p>
              </div>
              <div className="p-4 rounded-xl bg-muted">
                <p className="text-sm font-semibold text-foreground">📱 ऐप वर्शन</p>
                <p className="text-xs text-muted-foreground mt-1">Kisan Helper AI v1.0</p>
              </div>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="w-full py-3 rounded-xl font-bold bg-destructive text-destructive-foreground active:scale-[0.97] transition-all"
              >
                लॉग आउट 🚪
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
