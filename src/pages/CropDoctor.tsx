import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Upload, X, ShieldCheck, AlertTriangle, Clock, Droplets, Activity, CheckCircle2 } from "lucide-react";
import { diseaseResults } from "@/data/cropData";
import FloatingChatButton from "@/components/FloatingChatButton";

type ScanState = "idle" | "scanning" | "result";

const CropDoctor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<typeof diseaseResults[0] | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    setScanState("scanning");
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);
      const randomResult = diseaseResults[Math.floor(Math.random() * diseaseResults.length)];
      setResult(randomResult);
      setTimeout(() => setScanState("result"), 300);
    }, 2200);
  };

  const resetScan = () => {
    setSelectedImage(null);
    setScanState("idle");
    setResult(null);
    setScanProgress(0);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-secondary px-5 pt-6 pb-8 rounded-b-3xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-secondary-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-secondary-foreground">🔬 AI फसल डॉक्टर</h1>
        <p className="text-secondary-foreground/80 mt-1">फोटो खींचें, बीमारी पहचानें</p>
      </div>

      <div className="px-5 mt-6">
        {/* Idle State */}
        {scanState === "idle" && (
          <div className="animate-slide-up space-y-4">
            {!selectedImage ? (
              <>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-secondary/50 rounded-2xl p-10 flex flex-col items-center 
                             justify-center bg-card cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="w-20 h-20 rounded-full bg-sun-light flex items-center justify-center mb-4">
                    <Camera className="w-10 h-10 text-secondary" />
                  </div>
                  <p className="text-lg font-bold text-foreground">फोटो खींचें या चुनें</p>
                  <p className="text-sm text-muted-foreground mt-1">बीमार पत्ती या पौधे की फोटो लगाएं</p>
                  <div className="mt-4 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    फोटो अपलोड करें
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground 
                             shadow-[var(--shadow-button)] active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  कैमरा खोलें
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={selectedImage} alt="अपलोड की गई फसल" className="w-full h-64 object-cover" />
                  <button
                    onClick={resetScan}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-foreground/60 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-background" />
                  </button>
                </div>
                <button
                  onClick={startScan}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-secondary text-secondary-foreground 
                             shadow-md active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  AI से जांच करें
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Scanning State with Progress Bar */}
        {scanState === "scanning" && (
          <div className="animate-fade-in flex flex-col items-center justify-center py-12">
            <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6">
              {selectedImage && (
                <img src={selectedImage} alt="स्कैनिंग" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 scan-animation rounded-full border-4 border-primary/60" />
              <div className="absolute left-0 right-0 h-1 bg-primary/80 scan-line-animation" />
            </div>
            <p className="text-xl font-bold text-foreground">AI फसल की जांच कर रहा है...</p>
            <p className="text-sm text-muted-foreground mt-2">कृपया प्रतीक्षा करें 🔍</p>

            {/* Progress Bar */}
            <div className="w-full max-w-xs mt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>विश्लेषण हो रहा है</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <div className="flex flex-col gap-1 mt-4 text-xs text-muted-foreground">
                <span className={scanProgress > 20 ? "text-primary font-semibold" : ""}>✅ फोटो लोड हो गई</span>
                <span className={scanProgress > 50 ? "text-primary font-semibold" : ""}>
                  {scanProgress > 50 ? "✅" : "⏳"} पत्ती का पैटर्न पहचान रहा है
                </span>
                <span className={scanProgress > 80 ? "text-primary font-semibold" : ""}>
                  {scanProgress > 80 ? "✅" : "⏳"} बीमारी डेटाबेस से मिलान
                </span>
                <span className={scanProgress >= 100 ? "text-primary font-semibold" : ""}>
                  {scanProgress >= 100 ? "✅" : "⏳"} रिपोर्ट तैयार हो रही है
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Result State */}
        {scanState === "result" && result && (
          <div className="animate-slide-up space-y-4">
            {/* Disease Card */}
            <div className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-destructive/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">बीमारी पहचानी गई</p>
                  <p className="font-bold text-lg text-foreground">{result.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  result.severity === "गंभीर" ? "bg-destructive/10 text-destructive" : "bg-sun-light text-secondary"
                }`}>
                  {result.severity}
                </span>
              </div>

              {/* Confidence Score */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-leaf-light mb-3">
                <Activity className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">AI विश्वास स्कोर</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${result.confidence}%` }} />
                    </div>
                    <span className="text-sm font-bold text-primary">{result.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div className="p-3 rounded-xl bg-sun-light">
                <p className="text-xs font-semibold text-muted-foreground mb-1">🔍 लक्षण</p>
                <p className="text-sm text-foreground">{result.symptoms}</p>
              </div>
            </div>

            {/* Treatment / Remedies */}
            <div className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-border/50 space-y-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                💊 इलाज और उपाय (Step-by-Step)
              </h3>
              {result.remedies.map((remedy, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm text-foreground">{remedy}</p>
                </div>
              ))}
            </div>

            {/* Quick Info Cards */}
            <div className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-border/50 space-y-3">
              <h3 className="font-bold text-foreground">📋 दवा की जानकारी</h3>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-leaf-light">
                <Droplets className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">कौन सी दवा</p>
                  <p className="font-semibold text-foreground">{result.medicine}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-sun-light">
                <ShieldCheck className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">दवा की मात्रा</p>
                  <p className="font-semibold text-foreground">{result.dosage}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-sky-light">
                <Clock className="w-5 h-5 text-sky mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">स्प्रे करने का सही समय</p>
                  <p className="font-semibold text-foreground">{result.timing}</p>
                </div>
              </div>
            </div>

            <button
              onClick={resetScan}
              className="w-full py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground 
                         shadow-[var(--shadow-button)] active:scale-[0.97] transition-all"
            >
              दोबारा जांच करें
            </button>
          </div>
        )}
      </div>
      <FloatingChatButton />
    </div>
  );
};

export default CropDoctor;
