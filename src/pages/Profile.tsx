import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Edit3, Save, GraduationCap, Briefcase, Calendar, Camera } from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  age: number;
  college: string;
  profession: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: "Your Name",
  age: 16,
  college: "Your College",
  profession: "Student",
};

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [editData, setEditData] = useState<ProfileData>(DEFAULT_PROFILE);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({});
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const parsed = JSON.parse(saved) as ProfileData;
      setProfile(parsed);
      setEditData(parsed);
    }
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setProfileImage(base64);
      localStorage.setItem("userProfileImage", base64);
      toast.success("Profile photo updated ✅");
    };
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileData, string>> = {};
    if (!editData.name.trim()) newErrors.name = "Name is required";
    if (!editData.age || editData.age < 1 || editData.age > 120) newErrors.age = "Enter a valid age (1-120)";
    if (!editData.college.trim()) newErrors.college = "College is required";
    if (!editData.profession.trim()) newErrors.profession = "Profession is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const trimmed: ProfileData = {
      name: editData.name.trim(),
      age: editData.age,
      college: editData.college.trim(),
      profession: editData.profession.trim(),
    };
    localStorage.setItem("userProfile", JSON.stringify(trimmed));
    setProfile(trimmed);
    setIsEditing(false);
    toast.success("Profile Updated ✅");
  };

  const handleEdit = () => {
    setEditData({ ...profile });
    setErrors({});
    setIsEditing(true);
  };

  const fields: { key: keyof ProfileData; label: string; icon: typeof User; type: string }[] = [
    { key: "name", label: "Name", icon: User, type: "text" },
    { key: "age", label: "Age", icon: Calendar, type: "number" },
    { key: "college", label: "College", icon: GraduationCap, type: "text" },
    { key: "profession", label: "Pesha (Profession)", icon: Briefcase, type: "text" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="hero-gradient px-4 pt-5 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <h1 className="text-lg font-bold text-primary-foreground">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-semibold active:scale-95 transition-transform"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
          ) : (
            <div className="w-16" />
          )}
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 border-3 border-primary-foreground/40 flex items-center justify-center shadow-lg overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-primary-foreground" />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary border-2 border-primary-foreground flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="mt-3 text-lg font-bold text-primary-foreground">{profile.name}</p>
          <p className="text-sm text-primary-foreground/70">{profile.profession}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-4 pb-8">
        {!isEditing ? (
          /* View Mode */
          <div className="bg-card rounded-2xl shadow-md border border-border overflow-hidden animate-fade-in">
            {fields.map((field, i) => (
              <div
                key={field.key}
                className={`flex items-center gap-4 px-5 py-4 ${i < fields.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <field.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{field.label}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {String(profile[field.key])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Edit Mode */
          <div className="bg-card rounded-2xl shadow-md border border-border p-5 space-y-4 animate-fade-in">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <field.icon className="w-4 h-4 text-primary" />
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={editData[field.key]}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 transition-all ${
                    errors[field.key]
                      ? "border-destructive focus:ring-destructive/50"
                      : "border-input focus:ring-primary/50"
                  }`}
                />
                {errors[field.key] && (
                  <p className="text-xs text-destructive font-medium">{errors[field.key]}</p>
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setErrors({});
                }}
                className="flex-1 py-3 rounded-xl font-bold border border-border text-muted-foreground active:scale-[0.97] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-md flex items-center justify-center gap-2 active:scale-[0.97] transition-all"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
