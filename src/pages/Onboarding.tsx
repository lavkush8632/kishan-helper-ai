import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Sprout, ArrowRight, Info } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import { cropDatabase } from "@/data/cropData";

const onboardingCrops = ["गेहूँ", "धान", "सोयाबीन", "मक्का", "चना", "मूंगफली", "तरबूज", "खीरा",
  "आलू", "प्याज", "टमाटर", "गन्ना", "कपास", "आम", "केला", "सरसों"];

const Onboarding = () => {
  const [name, setName] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const navigate = useNavigate();

  const emojiMap: Record<string, string> = {};
  Object.values(cropDatabase).forEach((c) => { emojiMap[c.name] = c.emoji; });

  const handleSubmit = () => {
    if (name && selectedCrop) {
      localStorage.setItem("farmerName", name);
      localStorage.setItem("selectedCrop", selectedCrop);
      localStorage.setItem("savedCrops", JSON.stringify([selectedCrop]));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden rounded-b-3xl">
        <img src={heroImage} alt="खेत" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <Sprout className="w-12 h-12 mx-auto mb-2" />
            <h1 className="text-3xl font-bold">Kisan Helper AI</h1>
            <p className="text-lg opacity-90">आपका खेती सहायक</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/about")}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
        >
          <Info className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 py-6 space-y-6 animate-slide-up">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">नमस्ते! 🙏</h2>
          <p className="text-muted-foreground mt-1">अपनी जानकारी भरें और शुरू करें</p>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            अपना नाम लिखें
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="जैसे: रामू किसान"
            className="w-full px-4 py-4 rounded-xl border border-input bg-card text-foreground text-lg
                       focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                       placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Crop Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sprout className="w-4 h-4 text-primary" />
            अपनी मुख्य फसल चुनें
          </label>
          <div className="grid grid-cols-4 gap-3">
            {onboardingCrops.map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`p-3 rounded-xl border-2 text-center transition-all duration-200
                  ${selectedCrop === crop
                    ? "border-primary bg-leaf-light text-foreground shadow-md scale-105"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
              >
                <span className="text-2xl block mb-1">{emojiMap[crop] || "🌱"}</span>
                <span className="text-xs font-semibold">{crop}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!name || !selectedCrop}
          className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2
                     bg-primary text-primary-foreground shadow-[var(--shadow-button)]
                     disabled:opacity-40 disabled:shadow-none
                     active:scale-[0.97] transition-all duration-150"
        >
          शुरू करें
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
