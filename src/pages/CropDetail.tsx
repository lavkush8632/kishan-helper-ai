import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Sprout, Droplets, FlaskConical, Bug, ChevronDown, ChevronUp, Thermometer, Layers, Calendar, AlertTriangle, ShieldCheck } from "lucide-react";
import { cropDatabase, type CropInfo } from "@/data/cropData";

const iconMap: Record<string, any> = { Sprout, Droplets, FlaskConical, Bug };

const stepColors = [
  "bg-leaf-light text-primary",
  "bg-sky-light text-sky",
  "bg-sun-light text-secondary",
  "bg-destructive/10 text-destructive",
];

const CropDetail = () => {
  const navigate = useNavigate();
  const { cropName } = useParams<{ cropName: string }>();
  const [cropInfo, setCropInfo] = useState<CropInfo | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"care" | "disease">("care");

  useEffect(() => {
    const decoded = decodeURIComponent(cropName || "");
    if (decoded && cropDatabase[decoded]) {
      setCropInfo(cropDatabase[decoded]);
    } else {
      navigate("/crop-catalog");
    }
  }, [cropName, navigate]);

  if (!cropInfo) return null;

  const categoryColorMap: Record<string, string> = {
    "रबी": "bg-sky-light text-sky", "खरीफ": "bg-leaf-light text-primary", "जायद": "bg-sun-light text-secondary",
    "नकदी": "bg-sun-light text-secondary", "फल": "bg-sun-light text-secondary", "सब्जी": "bg-leaf-light text-primary",
  };
  const categoryColor = categoryColorMap[cropInfo.category] || "bg-muted text-foreground";

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Hero */}
      <div className="relative h-52">
        <img src={cropInfo.image} alt={cropInfo.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute bottom-4 left-5 right-5">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${categoryColor}`}>
            {cropInfo.category}
          </span>
          <h1 className="text-3xl font-bold text-card">{cropInfo.emoji} {cropInfo.name}</h1>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-5 -mt-2">
        <div className="bg-card rounded-2xl p-4 shadow-[var(--shadow-card)] border border-border/50">
          <p className="text-sm text-muted-foreground mb-3">{cropInfo.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-leaf-light">
              <Thermometer className="w-4 h-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground">तापमान</p>
                <p className="text-xs font-bold text-foreground">{cropInfo.idealTemp}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-light">
              <Droplets className="w-4 h-4 text-sky" />
              <div>
                <p className="text-[10px] text-muted-foreground">सिंचाई</p>
                <p className="text-xs font-bold text-foreground">{cropInfo.waterNeed}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sun-light">
              <Layers className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-[10px] text-muted-foreground">मिट्टी</p>
                <p className="text-xs font-bold text-foreground">{cropInfo.soilType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-[10px] text-muted-foreground">कटाई</p>
                <p className="text-xs font-bold text-foreground">{cropInfo.harvestTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mt-5">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("care")}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "care" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"
            }`}
          >
            🌱 देखभाल
          </button>
          <button
            onClick={() => setActiveTab("disease")}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "disease" ? "bg-destructive text-destructive-foreground" : "bg-card border border-border text-foreground"
            }`}
          >
            🦠 रोग प्रबंधन
          </button>
        </div>

        {activeTab === "care" && (
          <div className="space-y-3 animate-fade-in">
            {cropInfo.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Sprout;
              const isExpanded = expandedStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                  className="action-card w-full text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl ${stepColors[index]} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-foreground">{step.title}</p>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                        🕐 {step.timing}
                      </span>
                      {isExpanded && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <p className="text-sm text-foreground leading-relaxed">{step.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {activeTab === "disease" && (
          <div className="space-y-3 animate-fade-in">
            {cropInfo.diseases.map((disease, idx) => (
              <div key={idx} className="bg-card rounded-2xl p-4 shadow-[var(--shadow-card)] border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{disease.name}</p>
                    <p className="text-xs text-muted-foreground">{disease.symptoms}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    disease.severity === "गंभीर" ? "bg-destructive/10 text-destructive" : disease.severity === "मध्यम" ? "bg-sun-light text-secondary" : "bg-leaf-light text-primary"
                  }`}>{disease.severity}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-leaf-light">
                    <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">दवा</p>
                      <p className="text-xs font-semibold text-foreground">{disease.medicine}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-sun-light">
                    <Droplets className="w-4 h-4 text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">मात्रा</p>
                      <p className="text-xs font-semibold text-foreground">{disease.dosage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDetail;
