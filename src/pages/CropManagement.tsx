import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sprout, Droplets, FlaskConical, Bug, ChevronDown, ChevronUp } from "lucide-react";
import { cropDatabase, type CropInfo } from "@/data/cropData";

const iconMap: Record<string, any> = {
  Sprout,
  Droplets,
  FlaskConical,
  Bug,
};

const stepColors = [
  "bg-leaf-light text-primary",
  "bg-sky-light text-sky",
  "bg-sun-light text-secondary",
  "bg-destructive/10 text-destructive",
];

const CropManagement = () => {
  const navigate = useNavigate();
  const [cropInfo, setCropInfo] = useState<CropInfo | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  useEffect(() => {
    const crop = localStorage.getItem("selectedCrop");
    if (!crop || !cropDatabase[crop]) {
      navigate("/");
      return;
    }
    setCropInfo(cropDatabase[crop]);
  }, [navigate]);

  if (!cropInfo) return null;

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="hero-gradient px-5 pt-6 pb-8 rounded-b-3xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground">
          {cropInfo.emoji} {cropInfo.name} की देखभाल
        </h1>
        <p className="text-primary-foreground/80 mt-1">फसल चक्र और पूरी जानकारी</p>
      </div>

      {/* Timeline Steps */}
      <div className="px-5 mt-6 space-y-4">
        {cropInfo.steps.map((step, index) => {
          const IconComponent = iconMap[step.icon] || Sprout;
          const isExpanded = expandedStep === step.id;

          return (
            <div key={step.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              {/* Timeline line */}
              {index < cropInfo.steps.length - 1 && (
                <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-border -mb-4 z-0" />
              )}

              <button
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                className="action-card w-full text-left relative z-10"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${stepColors[index]} flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-foreground text-base">{step.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      🕐 {step.timing}
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-foreground leading-relaxed">{step.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CropManagement;
