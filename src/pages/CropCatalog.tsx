import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Droplets, Thermometer, Layers } from "lucide-react";
import { cropDatabase } from "@/data/cropData";
import FloatingChatButton from "@/components/FloatingChatButton";

const categories = ["सभी", "रबी", "खरीफ", "जायद", "नकदी", "फल", "सब्जी"] as const;

const CropCatalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("सभी");

  const allCrops = Object.values(cropDatabase);

  const filteredCrops = allCrops.filter((crop) => {
    const matchesSearch = crop.name.includes(searchQuery);
    const matchesCategory = activeCategory === "सभी" || crop.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryColors: Record<string, string> = {
    "रबी": "bg-sky-light text-sky",
    "खरीफ": "bg-leaf-light text-primary",
    "जायद": "bg-sun-light text-secondary",
    "नकदी": "bg-earth-light text-earth",
    "फल": "bg-sun-light text-secondary",
    "सब्जी": "bg-leaf-light text-primary",
  };

  const categoryEmojis: Record<string, string> = {
    "सभी": "📋", "रबी": "❄️", "खरीफ": "🌧️", "जायद": "☀️",
    "नकदी": "💰", "फल": "🍎", "सब्जी": "🥬",
  };

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
        <h1 className="text-2xl font-bold text-primary-foreground">🌱 फसल कैटलॉग</h1>
        <p className="text-primary-foreground/80 mt-1">सभी फसलों की जानकारी एक जगह</p>

        <div className="mt-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="फसल खोजें..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card text-foreground border border-border
                       placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-5 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all
                ${activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-foreground"
                }`}
            >
              {categoryEmojis[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Grid */}
      <div className="px-5 mt-4">
        <p className="text-sm text-muted-foreground mb-3">{filteredCrops.length} फसलें मिलीं</p>
        <div className="grid grid-cols-2 gap-3">
          {filteredCrops.map((crop) => (
            <button
              key={crop.name}
              onClick={() => navigate(`/crop/${encodeURIComponent(crop.name)}`)}
              className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-border/50
                         active:scale-[0.97] transition-transform text-left"
            >
              <div className="relative h-28">
                <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" loading="lazy" />
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold ${categoryColors[crop.category] || "bg-muted text-foreground"}`}>
                  {crop.category}
                </span>
              </div>
              <div className="p-3">
                <p className="font-bold text-foreground text-lg">{crop.emoji} {crop.name}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Thermometer className="w-3 h-3" />
                    <span>{crop.idealTemp}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Droplets className="w-3 h-3" />
                    <span>{crop.waterNeed}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Layers className="w-3 h-3" />
                    <span>{crop.soilType}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <FloatingChatButton />
    </div>
  );
};

export default CropCatalog;
