export interface CropStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  timing: string;
  details: string;
}

export interface CropInfo {
  name: string;
  emoji: string;
  category: "रबी" | "खरीफ" | "जायद" | "नकदी" | "फल" | "सब्जी";
  image: string;
  soilType: string;
  idealTemp: string;
  waterNeed: string;
  harvestTime: string;
  description: string;
  steps: CropStep[];
  diseases: DiseaseInfo[];
}

export interface DiseaseInfo {
  name: string;
  symptoms: string;
  medicine: string;
  dosage: string;
  timing: string;
  severity: "हल्का" | "मध्यम" | "गंभीर";
}

const defaultSteps: CropStep[] = [
  { id: 1, title: "बुवाई का सही समय", description: "सही मौसम में बुवाई करें", icon: "Sprout", timing: "मौसम अनुसार", details: "अपने क्षेत्र के अनुसार बुवाई करें।" },
  { id: 2, title: "सिंचाई का समय", description: "नियमित सिंचाई करें", icon: "Droplets", timing: "आवश्यकतानुसार", details: "मिट्टी की नमी के अनुसार सिंचाई करें।" },
  { id: 3, title: "खाद और उर्वरक", description: "संतुलित खाद दें", icon: "FlaskConical", timing: "बुवाई और बाद में", details: "मिट्टी परीक्षण के आधार पर खाद दें।" },
  { id: 4, title: "खरपतवार नियंत्रण", description: "समय पर निराई करें", icon: "Bug", timing: "20-30 दिन बाद", details: "खरपतवार को समय पर हटाएं।" },
];

const defaultDiseases: DiseaseInfo[] = [
  { name: "पत्ती झुलसा", symptoms: "पत्तियों पर भूरे धब्बे", medicine: "मैंकोज़ेब 75% WP", dosage: "2.5 ग्राम/लीटर", timing: "लक्षण दिखते ही", severity: "मध्यम" },
];

export const cropDatabase: Record<string, CropInfo> = {
  // ===== रबी (Winter) =====
  "गेहूँ": {
    name: "गेहूँ", emoji: "🌾", category: "रबी",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "20-25°C", waterNeed: "6 बार सिंचाई", harvestTime: "मार्च - अप्रैल",
    description: "गेहूँ भारत की प्रमुख रबी फसल है। उत्तर भारत में सबसे ज्यादा उगाई जाती है।",
    steps: [
      { id: 1, title: "बुवाई का सही समय", description: "अक्टूबर के अंत से नवंबर के मध्य तक बुवाई करें", icon: "Sprout", timing: "अक्टूबर - नवंबर", details: "मिट्टी का तापमान 20-25°C होना चाहिए। बीज दर: 100-125 किग्रा/हेक्टेयर" },
      { id: 2, title: "सिंचाई का समय", description: "पहली सिंचाई बुवाई के 21 दिन बाद करें", icon: "Droplets", timing: "6 बार सिंचाई", details: "CRI अवस्था (21 दिन), टिलरिंग (40-45 दिन), जॉइंटिंग (60-65 दिन), फ्लावरिंग (80-85 दिन), मिल्किंग (100-105 दिन), डफ (115-120 दिन)" },
      { id: 3, title: "खाद और उर्वरक", description: "DAP और यूरिया का सही मात्रा में उपयोग करें", icon: "FlaskConical", timing: "बुवाई से पहले और बाद", details: "बुवाई के समय: DAP 100 किग्रा/हेक्टेयर + यूरिया 50 किग्रा। पहली सिंचाई पर: यूरिया 60 किग्रा। तीसरी सिंचाई पर: यूरिया 40 किग्रा" },
      { id: 4, title: "खरपतवार नियंत्रण", description: "बुवाई के 30-35 दिन बाद निराई-गुड़ाई करें", icon: "Bug", timing: "30-35 दिन बाद", details: "सल्फोसल्फ्यूरॉन 25 ग्राम/हेक्टेयर का छिड़काव करें।" }
    ],
    diseases: [
      { name: "गेरुई (रस्ट)", symptoms: "पत्तियों पर भूरे-नारंगी धब्बे", medicine: "प्रोपिकोनाज़ोल 25% EC", dosage: "1 मिली/लीटर पानी", timing: "सुबह या शाम", severity: "गंभीर" },
      { name: "करनाल बंट", symptoms: "दानों पर काले धब्बे, बदबू", medicine: "थीरम + कार्बोक्सिन", dosage: "2.5 ग्राम/किग्रा बीज", timing: "बीजोपचार", severity: "मध्यम" }
    ]
  },
  "चना": {
    name: "चना", emoji: "🫛", category: "रबी",
    image: "https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?w=400&h=300&fit=crop",
    soilType: "दोमट या बलुई दोमट", idealTemp: "15-25°C", waterNeed: "2-3 बार सिंचाई", harvestTime: "फरवरी - मार्च",
    description: "चना रबी सीजन की प्रमुख दलहन फसल है। प्रोटीन का अच्छा स्रोत है।",
    steps: [
      { id: 1, title: "बुवाई का सही समय", description: "अक्टूबर के मध्य से नवंबर के पहले सप्ताह तक", icon: "Sprout", timing: "अक्टूबर - नवंबर", details: "बीज दर: 75-80 किग्रा/हेक्टेयर (देसी), 100-120 किग्रा (काबुली)।" },
      { id: 2, title: "सिंचाई का समय", description: "चने को कम पानी चाहिए", icon: "Droplets", timing: "2-3 बार", details: "पहली सिंचाई 45 दिन बाद, दूसरी 75 दिन बाद।" },
      { id: 3, title: "खाद और उर्वरक", description: "दलहन फसल होने से नाइट्रोजन कम चाहिए", icon: "FlaskConical", timing: "बुवाई के समय", details: "DAP 50 किग्रा/हेक्टेयर। राइजोबियम + PSB कल्चर से बीजोपचार करें।" },
      { id: 4, title: "खरपतवार नियंत्रण", description: "बुवाई के 25-30 दिन बाद निराई करें", icon: "Bug", timing: "25-30 दिन बाद", details: "पेंडीमेथालिन 1 लीटर/हेक्टेयर बुवाई के 2 दिन बाद छिड़काव करें।" }
    ],
    diseases: [
      { name: "उकठा (विल्ट)", symptoms: "पूरा पौधा मुरझा जाना", medicine: "ट्राइकोडर्मा बीजोपचार", dosage: "5 ग्राम/किग्रा बीज", timing: "बुवाई से पहले", severity: "गंभीर" },
      { name: "फली छेदक", symptoms: "फलियों में छेद", medicine: "क्विनालफॉस 25 EC", dosage: "2 मिली/लीटर पानी", timing: "शाम को छिड़काव", severity: "गंभीर" }
    ]
  },
  "सरसों": {
    name: "सरसों", emoji: "🌼", category: "रबी",
    image: "https://images.unsplash.com/photo-1501004318855-dc52130efbd5?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "15-25°C", waterNeed: "2-3 बार सिंचाई", harvestTime: "फरवरी - मार्च",
    description: "सरसों भारत की प्रमुख तिलहन रबी फसल है। राजस्थान और मध्य प्रदेश में बहुत उगाई जाती है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "मसूर": {
    name: "मसूर", emoji: "🟤", category: "रबी",
    image: "https://images.unsplash.com/photo-1515543904809-0761be1e1e7c?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "15-25°C", waterNeed: "1-2 बार सिंचाई", harvestTime: "मार्च",
    description: "मसूर एक महत्वपूर्ण दलहन रबी फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "मटर": {
    name: "मटर", emoji: "🫛", category: "रबी",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "10-20°C", waterNeed: "3-4 बार सिंचाई", harvestTime: "फरवरी - मार्च",
    description: "मटर रबी सीजन की लोकप्रिय सब्जी और दलहन फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "जौ": {
    name: "जौ", emoji: "🌾", category: "रबी",
    image: "https://images.unsplash.com/photo-1631898039984-fd5e87e73814?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट", idealTemp: "15-25°C", waterNeed: "3-4 बार सिंचाई", harvestTime: "मार्च - अप्रैल",
    description: "जौ एक पुरानी और महत्वपूर्ण रबी फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },

  // ===== खरीफ (Monsoon) =====
  "धान": {
    name: "धान", emoji: "🌿", category: "खरीफ",
    image: "https://images.unsplash.com/photo-1536304993881-460e47cc53f8?w=400&h=300&fit=crop",
    soilType: "चिकनी दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "लगातार पानी", harvestTime: "अक्टूबर - नवंबर",
    description: "धान भारत की सबसे महत्वपूर्ण खरीफ फसल है।",
    steps: [
      { id: 1, title: "बुवाई का सही समय", description: "जून के मध्य से जुलाई के पहले सप्ताह तक नर्सरी डालें", icon: "Sprout", timing: "जून - जुलाई", details: "नर्सरी में बीज दर: 30-35 किग्रा/हेक्टेयर।" },
      { id: 2, title: "सिंचाई का समय", description: "खेत में 5-7 सेमी पानी बनाए रखें", icon: "Droplets", timing: "लगातार", details: "रोपाई से फूल आने तक 5 सेमी पानी रखें।" },
      { id: 3, title: "खाद और उर्वरक", description: "नाइट्रोजन, फास्फोरस और पोटाश का संतुलित उपयोग", icon: "FlaskConical", timing: "3 बार में दें", details: "बुवाई: DAP 130 किग्रा + MOP 65 किग्रा।" },
      { id: 4, title: "खरपतवार नियंत्रण", description: "रोपाई के 20-25 दिन बाद खरपतवारनाशक डालें", icon: "Bug", timing: "20-25 दिन बाद", details: "बिसपाइरीबैक सोडियम 20 मिली/हेक्टेयर का छिड़काव करें।" }
    ],
    diseases: [
      { name: "ब्लास्ट (झोंका रोग)", symptoms: "पत्तियों पर आँख जैसे धब्बे", medicine: "ट्राइसाइक्लाज़ोल 75% WP", dosage: "0.6 ग्राम/लीटर पानी", timing: "शाम को छिड़काव", severity: "गंभीर" },
      { name: "शीथ ब्लाइट", symptoms: "तने पर भूरे धब्बे", medicine: "हेक्साकोनाज़ोल 5% EC", dosage: "2 मिली/लीटर पानी", timing: "सुबह या शाम", severity: "मध्यम" }
    ]
  },
  "सोयाबीन": {
    name: "सोयाबीन", emoji: "🫘", category: "खरीफ",
    image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=400&h=300&fit=crop",
    soilType: "काली मिट्टी", idealTemp: "25-30°C", waterNeed: "बारिश पर निर्भर", harvestTime: "अक्टूबर - नवंबर",
    description: "सोयाबीन मध्य प्रदेश की प्रमुख खरीफ फसल है।",
    steps: [
      { id: 1, title: "बुवाई का सही समय", description: "जून के अंतिम सप्ताह में मानसून की पहली बारिश के बाद", icon: "Sprout", timing: "जून अंत - जुलाई", details: "बीज दर: 70-80 किग्रा/हेक्टेयर।" },
      { id: 2, title: "सिंचाई का समय", description: "बारिश पर निर्भर, सूखा पड़ने पर सिंचाई करें", icon: "Droplets", timing: "आवश्यकतानुसार", details: "फूल आने और दाना भरने के समय पानी जरूरी।" },
      { id: 3, title: "खाद और उर्वरक", description: "राइजोबियम कल्चर से बीजोपचार करें", icon: "FlaskConical", timing: "बुवाई के समय", details: "DAP 100 किग्रा/हेक्टेयर।" },
      { id: 4, title: "खरपतवार नियंत्रण", description: "बुवाई के 15-20 दिन बाद पहली निराई करें", icon: "Bug", timing: "15-20 दिन बाद", details: "इमेजेथापायर 100 मिली/हेक्टेयर छिड़काव करें।" }
    ],
    diseases: [
      { name: "पीला मोज़ेक रोग", symptoms: "पत्तियों पर पीले धब्बे", medicine: "इमिडाक्लोप्रिड 17.8 SL", dosage: "0.5 मिली/लीटर पानी", timing: "सुबह जल्दी", severity: "गंभीर" },
      { name: "चारकोल रॉट", symptoms: "तने का आधार काला पड़ना", medicine: "कार्बेन्डाज़िम 50% WP", dosage: "2 ग्राम/लीटर पानी", timing: "लक्षण दिखते ही", severity: "गंभीर" }
    ]
  },
  "मक्का": {
    name: "मक्का", emoji: "🌽", category: "खरीफ",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "5-6 बार सिंचाई", harvestTime: "सितंबर - अक्टूबर",
    description: "मक्का एक बहुउपयोगी फसल है।",
    steps: defaultSteps,
    diseases: [
      { name: "तना छेदक", symptoms: "तने में छेद, पौधा सूखना", medicine: "कार्बोफ्यूरान 3G", dosage: "8-10 किग्रा/हेक्टेयर", timing: "बुवाई के 20 दिन बाद", severity: "गंभीर" },
      { name: "डाउनी मिल्ड्यू", symptoms: "पत्तियों पर सफेद धारियाँ", medicine: "मेटालैक्सिल 35% SD", dosage: "4 ग्राम/किग्रा बीज", timing: "बीजोपचार", severity: "मध्यम" }
    ]
  },
  "मूंगफली": {
    name: "मूंगफली", emoji: "🥜", category: "खरीफ",
    image: "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=400&h=300&fit=crop",
    soilType: "हल्की बलुई मिट्टी", idealTemp: "25-30°C", waterNeed: "4-5 बार सिंचाई", harvestTime: "अक्टूबर - नवंबर",
    description: "मूंगफली एक तिलहन और दलहन दोनों है।",
    steps: defaultSteps,
    diseases: [
      { name: "टिक्का रोग", symptoms: "पत्तियों पर गोल भूरे धब्बे", medicine: "मैंकोज़ेब 75% WP", dosage: "2.5 ग्राम/लीटर", timing: "15 दिन के अंतर पर", severity: "मध्यम" },
      { name: "कॉलर रॉट", symptoms: "तने के आधार पर सड़न", medicine: "कार्बेन्डाज़िम बीजोपचार", dosage: "3 ग्राम/किग्रा बीज", timing: "बुवाई से पहले", severity: "गंभीर" }
    ]
  },
  "बाजरा": {
    name: "बाजरा", emoji: "🌾", category: "खरीफ",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट", idealTemp: "25-35°C", waterNeed: "2-3 बार सिंचाई", harvestTime: "सितंबर - अक्टूबर",
    description: "बाजरा शुष्क क्षेत्रों की प्रमुख खरीफ फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "मूंग": {
    name: "मूंग", emoji: "🟢", category: "खरीफ",
    image: "https://images.unsplash.com/photo-1612257999756-1413ae5e0e88?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "2-3 बार", harvestTime: "सितंबर",
    description: "मूंग एक महत्वपूर्ण दलहन खरीफ फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "उड़द": {
    name: "उड़द", emoji: "⚫", category: "खरीफ",
    image: "https://images.unsplash.com/photo-1612257999756-1413ae5e0e88?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "2-3 बार", harvestTime: "सितंबर - अक्टूबर",
    description: "उड़द (काला चना) एक प्रमुख दलहन फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "ज्वार": {
    name: "ज्वार", emoji: "🌾", category: "खरीफ",
    image: "https://images.unsplash.com/photo-1631898039984-fd5e87e73814?w=400&h=300&fit=crop",
    soilType: "काली मिट्टी", idealTemp: "25-35°C", waterNeed: "3-4 बार", harvestTime: "अक्टूबर",
    description: "ज्वार एक बहुउपयोगी अनाज फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },

  // ===== जायद (Summer) =====
  "तरबूज": {
    name: "तरबूज", emoji: "🍉", category: "जायद",
    image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "नियमित सिंचाई", harvestTime: "मई - जून",
    description: "तरबूज गर्मियों की प्रमुख जायद फसल है।",
    steps: defaultSteps,
    diseases: [
      { name: "चूर्णिल फफूंदी", symptoms: "पत्तियों पर सफेद पाउडर", medicine: "कैराथेन 40% EC", dosage: "1 मिली/लीटर पानी", timing: "लक्षण दिखते ही", severity: "मध्यम" },
      { name: "फ्यूज़ेरियम विल्ट", symptoms: "बेल का मुरझाना", medicine: "कार्बेन्डाज़िम 50% WP", dosage: "2 ग्राम/लीटर पानी", timing: "जड़ों में डालें", severity: "गंभीर" }
    ]
  },
  "खीरा": {
    name: "खीरा", emoji: "🥒", category: "जायद",
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop",
    soilType: "उपजाऊ दोमट मिट्टी", idealTemp: "20-30°C", waterNeed: "नियमित हल्की सिंचाई", harvestTime: "अप्रैल - जून",
    description: "खीरा जायद सीजन की लोकप्रिय सब्जी फसल है।",
    steps: defaultSteps,
    diseases: [
      { name: "डाउनी मिल्ड्यू", symptoms: "पत्तियों पर पीले धब्बे", medicine: "मैंकोज़ेब 75% WP", dosage: "2.5 ग्राम/लीटर", timing: "7 दिन के अंतर पर", severity: "मध्यम" },
      { name: "फल मक्खी", symptoms: "फलों में छेद, सड़न", medicine: "मैलाथियॉन 50 EC", dosage: "2 मिली/लीटर पानी", timing: "फल बनने पर", severity: "गंभीर" }
    ]
  },
  "खरबूजा": {
    name: "खरबूजा", emoji: "🍈", category: "जायद",
    image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट", idealTemp: "25-35°C", waterNeed: "नियमित सिंचाई", harvestTime: "मई - जून",
    description: "खरबूजा गर्मियों का एक लोकप्रिय फल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "लौकी": {
    name: "लौकी", emoji: "🫑", category: "जायद",
    image: "https://images.unsplash.com/photo-1563252722-73e8a3d4de60?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "नियमित सिंचाई", harvestTime: "मई - जुलाई",
    description: "लौकी एक स्वास्थ्यवर्धक सब्जी है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "करेला": {
    name: "करेला", emoji: "🥬", category: "जायद",
    image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "नियमित सिंचाई", harvestTime: "मई - जुलाई",
    description: "करेला औषधीय गुणों वाली सब्जी है।",
    steps: defaultSteps, diseases: defaultDiseases
  },

  // ===== नकदी (Cash Crops) =====
  "गन्ना": {
    name: "गन्ना", emoji: "🎋", category: "नकदी",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "20-35°C", waterNeed: "8-10 बार सिंचाई", harvestTime: "नवंबर - मार्च",
    description: "गन्ना भारत की सबसे महत्वपूर्ण नकदी फसल है। चीनी, गुड़ और शराब बनाने में उपयोग होता है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "कपास": {
    name: "कपास", emoji: "☁️", category: "नकदी",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=400&h=300&fit=crop",
    soilType: "काली मिट्टी", idealTemp: "25-35°C", waterNeed: "6-8 बार सिंचाई", harvestTime: "अक्टूबर - जनवरी",
    description: "कपास 'सफेद सोना' के नाम से जानी जाती है। कपड़ा उद्योग का मुख्य आधार है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "तम्बाकू": {
    name: "तम्बाकू", emoji: "🍂", category: "नकदी",
    image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट", idealTemp: "20-30°C", waterNeed: "नियमित सिंचाई", harvestTime: "फरवरी - मार्च",
    description: "तम्बाकू एक नकदी फसल है जो गुजरात और आंध्र प्रदेश में उगाई जाती है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "जूट": {
    name: "जूट", emoji: "🧵", category: "नकदी",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "लगातार नमी", harvestTime: "जुलाई - सितंबर",
    description: "जूट 'गोल्डन फाइबर' के नाम से जाना जाता है। बंगाल में सबसे ज्यादा होता है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "चाय": {
    name: "चाय", emoji: "🍵", category: "नकदी",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=300&fit=crop",
    soilType: "अम्लीय दोमट", idealTemp: "15-30°C", waterNeed: "नियमित वर्षा", harvestTime: "साल भर",
    description: "चाय असम और दार्जिलिंग की प्रमुख नकदी फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },

  // ===== फल (Fruits) =====
  "आम": {
    name: "आम", emoji: "🥭", category: "फल",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
    soilType: "गहरी दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "नियमित सिंचाई", harvestTime: "मई - जुलाई",
    description: "आम भारत का राष्ट्रीय फल है। दशहरी, लंगड़ा, अल्फांसो प्रमुख किस्में हैं।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "केला": {
    name: "केला", emoji: "🍌", category: "फल",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    soilType: "उपजाऊ दोमट", idealTemp: "25-35°C", waterNeed: "लगातार नमी", harvestTime: "साल भर",
    description: "केला भारत में सबसे ज्यादा उगाया जाने वाला फल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "अमरूद": {
    name: "अमरूद", emoji: "🍐", category: "फल",
    image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "20-30°C", waterNeed: "नियमित सिंचाई", harvestTime: "अगस्त - दिसंबर",
    description: "अमरूद विटामिन C से भरपूर फल है। कम खर्च में अच्छी आय देता है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "पपीता": {
    name: "पपीता", emoji: "🍈", category: "फल",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "नियमित सिंचाई", harvestTime: "साल भर",
    description: "पपीता जल्दी फल देने वाला पौधा है। 10-12 महीने में फल आने लगते हैं।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "अनार": {
    name: "अनार", emoji: "🔴", category: "फल",
    image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट", idealTemp: "25-35°C", waterNeed: "कम सिंचाई", harvestTime: "अक्टूबर - फरवरी",
    description: "अनार सूखे क्षेत्रों में अच्छी होती है। महाराष्ट्र में सबसे ज्यादा उगाया जाता है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "संतरा": {
    name: "संतरा", emoji: "🍊", category: "फल",
    image: "https://images.unsplash.com/photo-1547514701-42fee1e8cefe?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "20-30°C", waterNeed: "नियमित सिंचाई", harvestTime: "नवंबर - जनवरी",
    description: "संतरा (नागपुर संतरा) भारत का प्रमुख खट्टा फल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "नींबू": {
    name: "नींबू", emoji: "🍋", category: "फल",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "20-30°C", waterNeed: "नियमित सिंचाई", harvestTime: "साल भर",
    description: "नींबू विटामिन C का सबसे अच्छा स्रोत है।",
    steps: defaultSteps, diseases: defaultDiseases
  },

  // ===== सब्जी (Vegetables) =====
  "आलू": {
    name: "आलू", emoji: "🥔", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82ber95b?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट", idealTemp: "15-25°C", waterNeed: "6-8 बार सिंचाई", harvestTime: "जनवरी - मार्च",
    description: "आलू भारत की सबसे महत्वपूर्ण सब्जी फसल है। उत्तर प्रदेश सबसे बड़ा उत्पादक है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "प्याज": {
    name: "प्याज", emoji: "🧅", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "15-25°C", waterNeed: "10-12 बार सिंचाई", harvestTime: "मार्च - मई",
    description: "प्याज हर रसोई की जरूरत है। महाराष्ट्र सबसे बड़ा उत्पादक है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "टमाटर": {
    name: "टमाटर", emoji: "🍅", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "20-30°C", waterNeed: "नियमित सिंचाई", harvestTime: "साल भर",
    description: "टमाटर सबसे ज्यादा खाई जाने वाली सब्जी है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "मिर्च": {
    name: "मिर्च", emoji: "🌶️", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "20-30°C", waterNeed: "नियमित सिंचाई", harvestTime: "साल भर",
    description: "मिर्च भारतीय खाने का अहम हिस्सा है। आंध्र प्रदेश सबसे बड़ा उत्पादक है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "बैंगन": {
    name: "बैंगन", emoji: "🍆", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "नियमित सिंचाई", harvestTime: "साल भर",
    description: "बैंगन एक बहुउपयोगी सब्जी फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "गोभी": {
    name: "गोभी", emoji: "🥦", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "15-25°C", waterNeed: "नियमित सिंचाई", harvestTime: "नवंबर - फरवरी",
    description: "गोभी (फूलगोभी और पत्तागोभी) सर्दियों की प्रमुख सब्जी है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "भिंडी": {
    name: "भिंडी", emoji: "🫑", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "25-35°C", waterNeed: "नियमित सिंचाई", harvestTime: "जून - सितंबर",
    description: "भिंडी गर्मी और बरसात की लोकप्रिय सब्जी है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "पालक": {
    name: "पालक", emoji: "🥬", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "15-25°C", waterNeed: "नियमित सिंचाई", harvestTime: "नवंबर - मार्च",
    description: "पालक आयरन और विटामिन से भरपूर पत्तेदार सब्जी है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "मूली": {
    name: "मूली", emoji: "🫚", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=300&fit=crop",
    soilType: "बलुई दोमट", idealTemp: "15-25°C", waterNeed: "नियमित सिंचाई", harvestTime: "अक्टूबर - मार्च",
    description: "मूली सर्दियों की एक लोकप्रिय जड़ वाली सब्जी है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
  "लहसुन": {
    name: "लहसुन", emoji: "🧄", category: "सब्जी",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2085?w=400&h=300&fit=crop",
    soilType: "दोमट मिट्टी", idealTemp: "15-25°C", waterNeed: "8-10 बार सिंचाई", harvestTime: "मार्च - अप्रैल",
    description: "लहसुन एक महत्वपूर्ण मसाला और औषधीय फसल है।",
    steps: defaultSteps, diseases: defaultDiseases
  },
};

// Legacy support
export const diseaseResults = [
  { name: "पत्ती का झुलसा रोग (Leaf Blight)", confidence: 87, symptoms: "पत्तियों के किनारों पर भूरे-पीले धब्बे जो धीरे-धीरे बढ़ते हैं। पत्तियाँ सूखकर मुड़ जाती हैं।", medicine: "मैंकोज़ेब 75% WP", dosage: "2.5 ग्राम प्रति लीटर पानी", timing: "सुबह 7-9 बजे या शाम 4-6 बजे", severity: "मध्यम" as const, remedies: ["संक्रमित पत्तियों को तुरंत हटाएं और जला दें", "मैंकोज़ेब 75% WP - 2.5 ग्राम/लीटर पानी में मिलाकर छिड़काव करें", "कॉपर ऑक्सीक्लोराइड 3 ग्राम/लीटर पानी - 10 दिन के अंतर पर दोहराएं", "नीम तेल 5 मिली/लीटर - जैविक विकल्प के रूप में", "खेत में जल निकासी सुनिश्चित करें"] },
  { name: "तना गलन रोग (Stem Rot)", confidence: 92, symptoms: "तने का निचला हिस्सा काला और गीला हो जाता है। पौधा अचानक मुरझा जाता है।", medicine: "कार्बेन्डाज़िम 50% WP", dosage: "2 ग्राम प्रति लीटर पानी", timing: "शाम 4-6 बजे सबसे अच्छा", severity: "गंभीर" as const, remedies: ["संक्रमित पौधों को जड़ से उखाड़कर नष्ट करें", "कार्बेन्डाज़िम 50% WP - 2 ग्राम/लीटर पानी में घोलकर जड़ों में डालें", "ट्राइकोडर्मा विरिडी 5 ग्राम/लीटर - जैविक उपचार", "मिट्टी में चूना मिलाकर pH संतुलित करें", "फसल चक्र अपनाएं - एक ही खेत में बार-बार एक फसल न लगाएं"] },
  { name: "पीला मोज़ेक रोग (Yellow Mosaic)", confidence: 78, symptoms: "पत्तियों पर पीले और हरे रंग के मोज़ेक पैटर्न। पत्तियाँ छोटी और मुड़ी हुई।", medicine: "इमिडाक्लोप्रिड 17.8 SL", dosage: "0.5 मिली प्रति लीटर पानी", timing: "सुबह जल्दी छिड़काव करें", severity: "गंभीर" as const, remedies: ["सफेद मक्खी (वाहक कीट) का नियंत्रण करें", "इमिडाक्लोप्रिड 17.8 SL - 0.5 मिली/लीटर पानी", "पीली चिपचिपी ट्रैप लगाएं (20/एकड़)", "प्रतिरोधी किस्में बोएं", "संक्रमित पौधों को तुरंत उखाड़ दें"] },
  { name: "चूर्णिल फफूंदी (Powdery Mildew)", confidence: 85, symptoms: "पत्तियों पर सफेद पाउडर जैसी परत। पत्तियाँ पीली होकर गिर जाती हैं।", medicine: "कैराथेन 40% EC", dosage: "1 मिली/लीटर पानी", timing: "सुबह या शाम", severity: "मध्यम" as const, remedies: ["हवा का संचार बनाए रखें", "कैराथेन 40% EC - 1 मिली/लीटर पानी", "सल्फर डस्ट 25 किग्रा/हेक्टेयर", "पत्तियों पर ज्यादा पानी न डालें", "7-10 दिन के अंतर पर दोहराएं"] },
];
