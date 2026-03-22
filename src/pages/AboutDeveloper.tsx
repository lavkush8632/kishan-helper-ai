import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Heart, Code, Rocket, Edit3, Check, X, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileData {
  name: string;
  age: number | string;
  college: string;
  profession: string;
}

interface AboutData {
  interests: string;
  journey: string;
  aboutProject: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: "Enter your name",
  age: "--",
  college: "--",
  profession: "--",
};

const DEFAULT_ABOUT: AboutData = {
  interests: "Coding, Farming, Business",
  journey: "Share your coding journey or experience here...",
  aboutProject: "Describe your app or project here...",
};

type EditingSection = "interests" | "journey" | "aboutProject" | null;

const AboutDeveloper = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [about, setAbout] = useState<AboutData>(DEFAULT_ABOUT);
  const [editing, setEditing] = useState<EditingSection>(null);
  const [editValue, setEditValue] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    const savedAbout = localStorage.getItem("userAbout");
    if (savedAbout) setAbout(JSON.parse(savedAbout));

    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const startEdit = (section: EditingSection) => {
    if (!section) return;
    setEditing(section);
    setEditValue(about[section]);
  };

  const saveEdit = () => {
    if (!editing) return;
    if (!editValue.trim()) {
      toast({ title: "Field cannot be empty", variant: "destructive" });
      return;
    }
    const updated = { ...about, [editing]: editValue.trim() };
    setAbout(updated);
    localStorage.setItem("userAbout", JSON.stringify(updated));
    setEditing(null);
    toast({ title: "Updated successfully ✅" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditValue("");
  };

  const renderSection = (
    key: "interests" | "journey" | "aboutProject",
    title: string,
    icon: React.ReactNode,
    iconBg: string,
    delay: string
  ) => {
    const isEditing = editing === key;
    return (
      <div
        className="bg-card rounded-2xl p-5 shadow-[var(--shadow-card)] border border-border/50 animate-slide-up"
        style={{ animationDelay: delay }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
              {icon}
            </div>
            {title}
          </h2>
          {!isEditing ? (
            <button
              onClick={() => startEdit(key)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold active:scale-95 transition-transform"
            >
              <Edit3 className="w-3 h-3" />
              Edit
            </button>
          ) : (
            <div className="flex gap-1.5">
              <button
                onClick={saveEdit}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center active:scale-95 transition-transform"
              >
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </button>
              <button
                onClick={cancelEdit}
                className="w-7 h-7 rounded-full bg-destructive flex items-center justify-center active:scale-95 transition-transform"
              >
                <X className="w-3.5 h-3.5 text-destructive-foreground" />
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full min-h-[100px] rounded-xl bg-muted border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            autoFocus
          />
        ) : (
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {about[key]}
          </p>
        )}
      </div>
    );
  };

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
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-primary-foreground/20 border-4 border-primary-foreground/40 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-primary-foreground" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary border-2 border-primary-foreground flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground mt-3">{profile.name}</h1>
          <p className="text-primary-foreground/80 mt-1">{profile.profession}</p>
        </div>
      </div>

      <div className="px-5 -mt-5 space-y-4">
        {/* My Information */}
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

        {renderSection("interests", "रुचियाँ (Interests)", <Heart className="w-4 h-4 text-secondary" />, "bg-sun-light", "100ms")}
        {renderSection("journey", "कोडिंग की यात्रा (Coding Journey)", <Code className="w-4 h-4 text-sky" />, "bg-sky-light", "200ms")}
        {renderSection("aboutProject", "प्रोजेक्ट के बारे में (About Project)", <Rocket className="w-4 h-4 text-primary" />, "bg-leaf-light", "300ms")}
      </div>
    </div>
  );
};

export default AboutDeveloper;
