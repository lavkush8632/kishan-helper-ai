import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, GraduationCap, Heart, Code, Rocket, MapPin } from "lucide-react";

const AboutDeveloper = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="hero-gradient px-5 pt-6 pb-10 rounded-b-3xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-primary-foreground/20 border-4 border-primary-foreground/40 flex items-center justify-center mx-auto mb-3">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground">Ritika Prajapati</h1>
          <p className="text-primary-foreground/80 mt-1">BCA Student & Web Developer</p>
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
              { label: "नाम", value: "Ritika Prajapati" },
              { label: "उम्र", value: "19 वर्ष" },
              { label: "कॉलेज", value: "Maa Jinvani College of Legal Studies Pushpgiri Teerth, Sonkatch" },
              { label: "पिताजी का नाम", value: "Mr. Jitendra Prajapati" },
              { label: "माताजी का नाम", value: "Mrs. Sangeeta Prajapati" },
              { label: "शिक्षा", value: "BCA (Bachelor of Computer Application) में पढ़ाई के साथ-साथ Web Development सीख रही हूँ ताकि मजबूत तकनीकी कौशल बना सकूँ।" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-muted">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
              </div>
            ))}
            <div className="p-3 rounded-xl bg-leaf-light flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">वर्तमान स्थान</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  गाँव: Jawar, जिला: Sehore, राज्य: Madhya Pradesh
                </p>
              </div>
            </div>
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
            मुझे <span className="font-bold text-primary">CodeYogi</span> के बारे में अपने कॉलेज, 
            <span className="font-semibold"> Maa Jinvani College of Legal Studies Pushpgiri Teerth, Sonkatch</span> से पता चला। 
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
