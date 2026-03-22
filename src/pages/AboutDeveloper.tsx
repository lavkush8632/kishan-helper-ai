import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, GraduationCap, Heart, Code, Rocket, MapPin, Edit3 } from "lucide-react";

interface ProfileData {
  name: string;
  age: number | string;
  college: string;
  profession: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: "Enter your name",
  age: "--",
  college: "--",
  profession: "--",
};

const AboutDeveloper = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="hero-gradient px-5 pt-6 pb-10 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-semibold active:scale-95 transition-transform"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-primary-foreground/20 border-4 border-primary-foreground/40 flex items-center justify-center mx-auto mb-3">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground">{profile.name}</h1>
          <p className="text-primary-foreground/80 mt-1">{profile.profession}</p>
        </div>
      </div>

      <div className="px-5 -mt-5 space-y-4">
        {/* Section 1: My Information */}
        <div className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-border/50 animate-slide-up">
          <h2 className="font-bold text-foreground text-lg flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-leaf-light flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            मेरी जानकारी
          </h2>
          <div className="space-y-3">
            {[
              { label: "Name", value: profile.name },
              { label: "Age", value: profile.age === "--" ? "--" : `${profile.age} वर्ष` },
              { label: "College", value: profile.college },
              { label: "Pesha (Profession)", value: profile.profession },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-muted">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Interests */}
        <div className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-border/50 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h2 className="font-bold text-foreground text-lg flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-sun-light flex items-center justify-center">
              <Heart className="w-4 h-4 text-secondary" />
            </div>
            रुचियाँ
          </h2>
          <p className="text-sm text-foreground leading-relaxed">
            मुझे बचपन से ही तकनीक में रुचि रही है। मुझे तकनीक के डिज़ाइन पक्ष में आनंद मिलता है। 
            User experiences तैयार करना और डिजिटल इंटरफेस की सुंदरता को explore करना — यह मेरा passion है। 
            मेरी रुचियों में <span className="font-bold text-primary">coding</span>, <span className="font-bold text-primary">technology सीखना</span>, 
            और <span className="font-bold text-primary">3D printing</span> शामिल हैं। 
            मेरा सपना है कि मैं अपने परिवार के साथ दुनिया घूमूँ। ✈️🌍
          </p>
        </div>

        {/* Section 3: Journey to Coding */}
        <div className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-border/50 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h2 className="font-bold text-foreground text-lg flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-sky-light flex items-center justify-center">
              <Code className="w-4 h-4 text-sky" />
            </div>
            कोडिंग की यात्रा
          </h2>
          <p className="text-sm text-foreground leading-relaxed">
            CodeYogi की बदौलत, मैं coding में आत्मविश्वास हासिल कर रही हूँ और तकनीक में अपने भविष्य के लिए 
            एक मजबूत नींव बना रही हूँ। 💪🎯
          </p>
        </div>

        {/* Section 4: Project Overview */}
        <div className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-border/50 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <h2 className="font-bold text-foreground text-lg flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-leaf-light flex items-center justify-center">
              <Rocket className="w-4 h-4 text-primary" />
            </div>
            प्रोजेक्ट के बारे में
          </h2>
          <p className="text-sm text-foreground leading-relaxed">
            यह प्रोजेक्ट '<span className="font-bold text-primary">Kisan Helper AI</span>' वेबसाइट का एक प्रोटोटाइप है, 
            जो खेती सीखने और प्रदर्शन के उद्देश्य से बनाया गया है। किसान कृषि से संबंधित उपयोगी जानकारी आसानी से प्राप्त कर सकते हैं, 
            फसलों, मौसम, खेती की तकनीकों और सामान्य समस्याओं के बारे में सवाल पूछ सकते हैं और सरल मार्गदर्शन प्राप्त कर सकते हैं। 
            मुख्य लक्ष्य किसानों को सही समय पर सही जानकारी से सहायता करना है। 🌾👨‍🌾
          </p>
          <div className="mt-3 p-3 rounded-xl bg-muted">
            <p className="text-xs text-muted-foreground">तकनीक</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">React, TypeScript, Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
