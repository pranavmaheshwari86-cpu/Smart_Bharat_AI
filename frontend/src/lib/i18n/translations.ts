export type LanguageCode = "en" | "hi" | "bn" | "mr" | "te" | "ta" | "gu" | "ur" | "kn";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  displayLabel: string;
  dir?: "ltr" | "rtl";
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", displayLabel: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", displayLabel: "1) Hindi (हिन्दी)" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", displayLabel: "2) Bengali (বাংলা)" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", displayLabel: "3) Marathi (मराठी)" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", displayLabel: "4) Telugu (తెలుగు)" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", displayLabel: "5) Tamil (தமிழ்)" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", displayLabel: "6) Gujarati (ગુજરાતી)" },
  { code: "ur", name: "Urdu", nativeName: "اردو", displayLabel: "7) Urdu (اردو)", dir: "rtl" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", displayLabel: "8) Kannada (ಕನ್ನಡ)" },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    nav_dashboard: "Dashboard",
    nav_schemes: "Schemes",
    nav_ids: "IDs",
    nav_complaints: "Complaints",
    nav_assistant: "Assistant",
    nav_credentials: "Credentials",
    nav_signin: "Sign In",
    nav_signup: "Get Started",
    nav_signout: "Sign Out",
    nav_change_language: "Language",
    nav_language: "Language",
    nav_profile: "Profile",

    // Hero & Home
    hero_badge: "Official Digital India Initiative 24/7",
    hero_title_1: "Smart Digital Governance for Every",
    hero_title_2: "Indian Citizen",
    hero_subtitle: "Instant eligibility for government schemes, seamless foundational ID applications, rapid civic grievance redressal, and 24/7 AI policy assistant.",
    hero_search_placeholder: "Search PM-KISAN, Aadhaar Update, Pothole Complaint, Passport...",
    hero_search_button: "Search Services",
    hero_btn_schemes: "Discover Schemes",
    hero_btn_assistant: "Ask AI Assistant",

    // Assistant
    ai_title: "Smart Bharat AI",
    ai_subtitle: "Always here to help",
    ai_welcome: "Namaste! I am your Smart Bharat AI Assistant. How can I help you today with government services?",
    ai_placeholder: "Ask about schemes, upload documents, or request guidance...",
    ai_suggested_title: "Suggested for you:",
    ai_disclaimer: "Smart Bharat AI may display inaccurate info. Always verify official government sources.",
    ai_find_schemes: "Find Schemes",
    ai_find_schemes_desc: "Discover eligibility for state & central programs.",
    ai_explain_doc: "Explain Document",
    ai_explain_doc_desc: "Upload official forms for simple explanations.",
    ai_healthcare: "Healthcare Nav",
    ai_healthcare_desc: "Locate AB-PMJAY empaneled hospitals near you.",
    ai_new_chat: "New Chat",
    ai_recent_chats: "Recent Chats",

    // Schemes
    schemes_title: "Government Schemes & Welfare Programs",
    schemes_subtitle: "Explore state and central government initiatives tailored for you",
    schemes_check_eligibility: "Check Eligibility",
    schemes_apply_now: "Apply Now",
    schemes_category_all: "All Schemes",
    schemes_category_farmers: "Farmers & Agriculture",
    schemes_category_students: "Education & Scholarships",
    schemes_category_health: "Healthcare & Insurance",
    schemes_category_women: "Women & Child Care",
    schemes_category_housing: "Housing & Welfare",

    // Foundational IDs
    ids_title: "Foundational Citizen IDs & Services",
    ids_subtitle: "Apply, update, and manage your essential identity documents digitally",
    ids_aadhaar: "Aadhaar Card",
    ids_pan: "PAN Card",
    ids_voter: "Voter ID",
    ids_passport: "Passport Service",
    ids_driving: "Driving License",
    ids_ration: "Ration Card",
    ids_apply: "Apply / Update",
    ids_track: "Track Status",

    // Complaints
    complaints_title: "Civic Complaints & Grievances",
    complaints_subtitle: "Lodge civic complaints with real-time AI tracking and authority routing",
    complaints_file_new: "File New Grievance",
    complaints_track_existing: "Track Complaint",
    complaints_pothole: "Road & Infrastructure",
    complaints_water: "Water Supply & Sanitation",
    complaints_electricity: "Electricity & Power",
    complaints_waste: "Waste Management",

    // Credentials / Vault
    vault_title: "Digital Credential Vault",
    vault_subtitle: "Store, verify, and share your DigiLocker documents securely",
    vault_sync: "Sync with DigiLocker",
    vault_download: "Download PDF",

    // Footer
    footer_tagline: "Empowering 1.4 billion citizens with AI-driven seamless government services.",
    footer_quick_links: "Quick Links",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_contact: "Contact Support",
    footer_rights: "All rights reserved. Smart Bharat AI Initiative.",

    // Auth
    auth_login_title: "Sign in to Smart Bharat AI",
    auth_signup_title: "Create your Smart Bharat Account",
    auth_email: "Email Address",
    auth_password: "Password",
    auth_name: "Full Name",
    auth_phone: "Phone Number",
    auth_submit_login: "Sign In",
    auth_submit_signup: "Get Started",
  },

  hi: {
    // Navigation
    nav_dashboard: "डैशबोर्ड",
    nav_schemes: "योजनाएं",
    nav_ids: "पहचान पत्र (IDs)",
    nav_complaints: "शिकायतें",
    nav_assistant: "एआई सहायक",
    nav_credentials: "दस्तावेज़",
    nav_signin: "साइन इन",
    nav_signup: "प्रारंभ करें",
    nav_signout: "साइन आउट",
    nav_change_language: "भाषा",
    nav_language: "भाषा",
    nav_profile: "प्रोफाइल",

    // Hero & Home
    hero_badge: "आधिकारिक डिजिटल इंडिया पहल 24/7",
    hero_title_1: "प्रत्येक भारतीय नागरिक के लिए",
    hero_title_2: "स्मार्ट डिजिटल शासन",
    hero_subtitle: "सरकारी योजनाओं के लिए त्वरित पात्रता, पहचान पत्र आवेदन, त्वरित नागरिक शिकायत निवारण और 24/7 AI नीति सहायक।",
    hero_search_placeholder: "पीएम-किसान, आधार अपडेट, शिकायत, पासपोर्ट खोजें...",
    hero_search_button: "सेवाएं खोजें",
    hero_btn_schemes: "योजनाएं देखें",
    hero_btn_assistant: "AI सहायक से पूछें",

    // Assistant
    ai_title: "स्मार्ट भारत AI",
    ai_subtitle: "आपकी सहायता के लिए सदैव तत्पर",
    ai_welcome: "नमस्ते! मैं आपका स्मार्ट भारत AI सहायक हूँ। आज मैं आपकी सरकारी सेवाओं में कैसे सहायता कर सकता हूँ?",
    ai_placeholder: "योजनाओं के बारे में पूछें, दस्तावेज़ अपलोड करें या मार्गदर्शन प्राप्त करें...",
    ai_suggested_title: "आपके लिए सुझाए गए प्रश्न:",
    ai_disclaimer: "स्मार्ट भारत AI गलत जानकारी दे सकता है। कृपया आधिकारिक सरकारी स्रोतों से पुष्टि करें।",
    ai_find_schemes: "योजनाएं खोजें",
    ai_find_schemes_desc: "राज्य और केंद्रीय कार्यक्रमों की पात्रता जानें।",
    ai_explain_doc: "दस्तावेज़ समझें",
    ai_explain_doc_desc: "सरल व्याख्या के लिए आधिकारिक फॉर्म अपलोड करें।",
    ai_healthcare: "स्वास्थ्य सेवाएं",
    ai_healthcare_desc: "निकटतम आयुष्मान भारत अस्पताल खोजें।",
    ai_new_chat: "नई बातचीत",
    ai_recent_chats: "हाल की बातचीत",

    // Schemes
    schemes_title: "सरकारी योजनाएं और कल्याणकारी कार्यक्रम",
    schemes_subtitle: "आपके लिए तैयार की गई राज्य और केंद्र सरकार की पहलों की खोज करें",
    schemes_check_eligibility: "पात्रता जांचें",
    schemes_apply_now: "अभी आवेदन करें",
    schemes_category_all: "सभी योजनाएं",
    schemes_category_farmers: "किसान और कृषि",
    schemes_category_students: "शिक्षा और छात्रवृत्ति",
    schemes_category_health: "स्वास्थ्य और बीमा",
    schemes_category_women: "महिला एवं बाल विकास",
    schemes_category_housing: "आवास और कल्याण",

    // Foundational IDs
    ids_title: "नागरिक पहचान पत्र एवं सेवाएं",
    ids_subtitle: "अपने आवश्यक पहचान दस्तावेज़ों के लिए डिजिटल आवेदन और प्रबंधन करें",
    ids_aadhaar: "आधार कार्ड",
    ids_pan: "पैन कार्ड",
    ids_voter: "वोटर आईडी",
    ids_passport: "पासपोर्ट सेवा",
    ids_driving: "ड्राइविंग लाइसेंस",
    ids_ration: "राशन कार्ड",
    ids_apply: "आवेदन / अपडेट करें",
    ids_track: "स्थिति ट्रैक करें",

    // Complaints
    complaints_title: "नागरिक शिकायतें और निवारण",
    complaints_subtitle: "वास्तविक समय AI ट्रैकिंग के साथ नागरिक शिकायतें दर्ज करें",
    complaints_file_new: "नई शिकायत दर्ज करें",
    complaints_track_existing: "शिकायत ट्रैक करें",
    complaints_pothole: "सड़क और अवसंरचना",
    complaints_water: "जल आपूर्ति और स्वच्छता",
    complaints_electricity: "बिजली और ऊर्जा",
    complaints_waste: "कचरा प्रबंधन",

    // Credentials / Vault
    vault_title: "डिजिटल दस्तावेज़ वॉल्ट",
    vault_subtitle: "डिजिलॉकर दस्तावेज़ों को सुरक्षित रूप से स्टोर और सत्यापित करें",
    vault_sync: "डिजिलॉकर से सिंक करें",
    vault_download: "पीडीएफ डाउनलोड करें",

    // Footer
    footer_tagline: "1.4 अरब नागरिकों को AI-संचालित निर्बाध सरकारी सेवाओं से सशक्त बनाना।",
    footer_quick_links: "त्वरित लिंक",
    footer_privacy: "गोपनीयता नीति",
    footer_terms: "सेवा की शर्तें",
    footer_contact: "सहायता संपर्क",
    footer_rights: "सर्वाधिकार सुरक्षित। स्मार्ट भारत AI पहल।",

    // Auth
    auth_login_title: "स्मार्ट भारत AI में साइन इन करें",
    auth_signup_title: "अपना स्मार्ट भारत खाता बनाएं",
    auth_email: "ईमेल पता",
    auth_password: "पासवर्ड",
    auth_name: "पूरा नाम",
    auth_phone: "फोन नंबर",
    auth_submit_login: "साइन इन",
    auth_submit_signup: "प्रारंभ करें",
  },

  bn: {
    // Navigation
    nav_dashboard: "ড্যাশবোর্ড",
    nav_schemes: "প্রকল্পসমূহ",
    nav_ids: "পরিচয়পত্র (IDs)",
    nav_complaints: "অভিযোগ",
    nav_assistant: "এআই সহকারী",
    nav_credentials: "নথিপত্র",
    nav_signin: "সাইন ইন",
    nav_signup: "শুরু করুন",
    nav_signout: "সাইন আউট",
    nav_change_language: "ভাষা",
    nav_language: "ভাষা",
    nav_profile: "প্রোফাইল",

    // Hero & Home
    hero_badge: "অফিসিয়াল ডিজিটাল ইন্ডিয়া উদ্যোগ ২৪/৭",
    hero_title_1: "প্রতিটি ভারতীয় নাগরিকের জন্য",
    hero_title_2: "স্মার্ট ডিজিটাল শাসন ব্যবস্থা",
    hero_subtitle: "সরকারী প্রকল্পের দ্রুত যোগ্যতা যাচাই, পরিচয়পত্র আবেদন এবং ২৪/৭ AI নীতি সহকারী।",
    hero_search_placeholder: "পিএম-কিষাণ, আধার আপডেট, অভিযোগ, পাসপোর্ট খুঁজুন...",
    hero_search_button: "সেবা খুঁজুন",
    hero_btn_schemes: "প্রকল্পসমূহ দেখুন",
    hero_btn_assistant: "AI সহকারীকে জিজ্ঞাসা করুন",

    // Assistant
    ai_title: "স্মার্ট ভারত AI",
    ai_subtitle: "সর্বদা আপনার সেবায়",
    ai_welcome: "নমস্কার! আমি আপনার স্মার্ট ভারত AI সহকারী। আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
    ai_placeholder: "প্রকল্প সম্পর্কে জিজ্ঞাসা করুন, নথি আপলোড করুন...",
    ai_suggested_title: "আপনার জন্য প্রস্তাবিত:",
    ai_disclaimer: "স্মার্ট ভারত AI ভুল তথ্য দিতে পারে। তথ্য যাচাই করুন।",
    ai_find_schemes: "প্রকল্প খুঁজুন",
    ai_find_schemes_desc: "সরকারি প্রকল্পের যোগ্যতা জানুন।",
    ai_explain_doc: "নথি ব্যাখ্যা",
    ai_explain_doc_desc: "সহজ ব্যাখ্যার জন্য ফর্ম আপলোড করুন।",
    ai_healthcare: "স্বাস্থ্যসেবা",
    ai_healthcare_desc: "নিকটস্থ আয়ুষ্মান ভারত হাসপাতাল খুঁজুন।",
    ai_new_chat: "নতুন চ্যাট",
    ai_recent_chats: "সাম্প্রতিক চ্যাট",

    // Schemes
    schemes_title: "সরকারী প্রকল্প ও কল্যাণমূলক কর্মসূচি",
    schemes_subtitle: "আপনার জন্য উপযোগী রাজ্য ও কেন্দ্রীয় সরকারের উদ্যোগসমূহ দেখুন",
    schemes_check_eligibility: "যোগ্যতা যাচাই করুন",
    schemes_apply_now: "এখনই আবেদন করুন",
    schemes_category_all: "সকল প্রকল্প",
    schemes_category_farmers: "কৃষক ও কৃষি",
    schemes_category_students: "শিক্ষা ও বৃত্তি",
    schemes_category_health: "স্বাস্থ্য ও বীমা",
    schemes_category_women: "নারী ও শিশু উন্নয়ন",
    schemes_category_housing: "আবাসন ও কল্যাণ",

    // Foundational IDs
    ids_title: "নাগরিক পরিচয়পত্র ও সেবাসমূহ",
    ids_subtitle: "আপনার প্রয়োজনীয় পরিচয়পত্রের জন্য ডিজিটাল আবেদন ও পরিচালনা করুন",
    ids_aadhaar: "আধার কার্ড",
    ids_pan: "প্যান কার্ড",
    ids_voter: "ভোটার আইডি",
    ids_passport: "পাসপোর্ট সেবা",
    ids_driving: "ড্রাইভিং লাইসেন্স",
    ids_ration: "রেশন কার্ড",
    ids_apply: "আবেদন / আপডেট করুন",
    ids_track: "স্ট্যাটাস ট্র্যাক করুন",

    // Complaints
    complaints_title: "নাগরিক অভিযোগ ও প্রতিকার",
    complaints_subtitle: "রিয়েল-টাইম AI ট্র্যাকিং সহ নাগরিক অভিযোগ দায়ের করুন",
    complaints_file_new: "নতুন অভিযোগ জানান",
    complaints_track_existing: "অভিযোগ ট্র্যাক করুন",
    complaints_pothole: "রাস্তা ও অবকাঠামো",
    complaints_water: "জল সরবরাহ ও স্যানিটেশন",
    complaints_electricity: "বিদ্যুৎ সেবা",
    complaints_waste: "বর্জ্য ব্যবস্থাপনা",

    // Credentials / Vault
    vault_title: "ডিজিটাল নথি ভল্ট",
    vault_subtitle: "ডিজিলকার থেকে আপনার নথি নিরাপদে সংরক্ষণ করুন",
    vault_sync: "ডিজিলকার সিঙ্ক করুন",
    vault_download: "পিডিএফ ডাউনলোড করুন",

    // Footer
    footer_tagline: "১৪০ কোটি নাগরিককে AI-চালিত সেবার মাধ্যমে ক্ষমতায়িত করা।",
    footer_quick_links: "দ্রুত লিঙ্ক",
    footer_privacy: "গোপনীয়তা নীতি",
    footer_terms: "সেবার শর্তাবলী",
    footer_contact: "সহায়তা যোগযোগ",
    footer_rights: "সর্বস্বত্ব সংরক্ষিত। স্মার্ট ভারত AI উদ্যোগ।",

    // Auth
    auth_login_title: "স্মার্ট ভারত AI-তে সাইন ইন করুন",
    auth_signup_title: "আপনার স্মার্ট ভারত অ্যাকাউন্ট তৈরি করুন",
    auth_email: "ইমেল ঠিকানা",
    auth_password: "পাসওয়ার্ড",
    auth_name: "সম্পূর্ণ নাম",
    auth_phone: "ফোন নম্বর",
    auth_submit_login: "সাইন ইন",
    auth_submit_signup: "শুরু করুন",
  },

  mr: {
    // Navigation
    nav_dashboard: "डॅशबोर्ड",
    nav_schemes: "योजना",
    nav_ids: "ओळखपत्रे (IDs)",
    nav_complaints: "तक्रारी",
    nav_assistant: "एआय सहाय्यक",
    nav_credentials: "कागदपत्रे",
    nav_signin: "साइन इन",
    nav_signup: "सुरू करा",
    nav_signout: "साइन आउट",
    nav_change_language: "भाषा",
    nav_language: "भाषा",
    nav_profile: "प्रोफाइल",

    // Hero & Home
    hero_badge: "अधिकृत डिजिटल इंडिया उपक्रम २४/७",
    hero_title_1: "प्रत्येक भारतीय नागरिकासाठी",
    hero_title_2: "स्मार्ट डिजिटल शासन",
    hero_subtitle: "शासकीय योजनांसाठी त्वरित पात्रता, ओळखपत्र अर्ज आणि २४/७ AI धोरण सहाय्यक.",
    hero_search_placeholder: "पीएम-किसान, आधार अपडेट, तक्रार, पासपोर्ट शोधा...",
    hero_search_button: "सेवा शोधा",
    hero_btn_schemes: "योजना पहा",
    hero_btn_assistant: "AI सहाय्यकाला विचारा",

    // Assistant
    ai_title: "स्मार्ट भारत AI",
    ai_subtitle: "आपल्या सेवेसाठी सदैव तत्पर",
    ai_welcome: "नमस्ते! मी तुमचा स्मार्ट भारत AI सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
    ai_placeholder: "योजनांबद्दल विचारा, कागदपत्रे अपलोड करा...",
    ai_suggested_title: "तुमच्यासाठी सुचवलेले प्रश्न:",
    ai_disclaimer: "स्मार्ट भारत AI काही वेळा चुकीची माहिती देऊ शकते. अधिकृत माहितीची पडताळणी करा.",
    ai_find_schemes: "योजना शोधा",
    ai_find_schemes_desc: "शासकीय योजनांची पात्रता जाणून घ्या.",
    ai_explain_doc: "कागदपत्र स्पष्टीकरण",
    ai_explain_doc_desc: "सोप्या स्पष्टीकरणासाठी फॉर्म अपलोड करा.",
    ai_healthcare: "आरोग्य सेवा",
    ai_healthcare_desc: "जवळचे आयुष्मान भारत रुग्णालय शोधा.",
    ai_new_chat: "नवीन संभाषण",
    ai_recent_chats: "अलीकडील संभाषणे",

    // Schemes
    schemes_title: "शासकीय योजना आणि कल्याणकारी कार्यक्रम",
    schemes_subtitle: "तुमच्यासाठी राज्य व केंद्र शासनाच्या उपक्रमांचा शोध घ्या",
    schemes_check_eligibility: "पात्रता तपासा",
    schemes_apply_now: "आत्ताच अर्ज करा",
    schemes_category_all: "सर्व योजना",
    schemes_category_farmers: "शेतकरी आणि कृषी",
    schemes_category_students: "शिक्षण आणि शिष्यवृत्ती",
    schemes_category_health: "आरोग्य आणि विमा",
    schemes_category_women: "महिला आणि बाल विकास",
    schemes_category_housing: "गृहनिर्माण आणि कल्याण",

    // Foundational IDs
    ids_title: "नागरिक ओळखपत्रे आणि सेवा",
    ids_subtitle: "तुमच्या ओळखपत्रांसाठी डिजिटल अर्ज करा व व्यवस्थापन करा",
    ids_aadhaar: "आधार कार्ड",
    ids_pan: "पॅन कार्ड",
    ids_voter: "मतदार ओळखपत्र",
    ids_passport: "पासपोर्ट सेवा",
    ids_driving: "ड्रायव्हिंग लायसन्स",
    ids_ration: "रेशन कार्ड",
    ids_apply: "अर्ज / अपडेट करा",
    ids_track: "स्थिती तपासा",

    // Complaints
    complaints_title: "नागरी तक्रारी आणि निवारण",
    complaints_subtitle: "रिअल-टाइम AI ट्रॅकिंगसह तक्रारी नोंदवा",
    complaints_file_new: "नवीन तक्रार नोंदवा",
    complaints_track_existing: "तक्रार ट्रॅक करा",
    complaints_pothole: "रस्ते आणि पायाभूत सुविधा",
    complaints_water: "पाणी पुरवठा आणि स्वच्छता",
    complaints_electricity: "वीज पुरवठा",
    complaints_waste: "कचरा व्यवस्थापन",

    // Credentials / Vault
    vault_title: "डिजिटल कागदपत्र व्हॉल्ट",
    vault_subtitle: "डिजीलॉकर कागदपत्रे सुरक्षितपणे साठवा आणि पडताळा",
    vault_sync: "डिजीलॉकर सिंक करा",
    vault_download: "पीडीएफ डाउनलोड करा",

    // Footer
    footer_tagline: "१४० कोटी नागरिकांना AI-संचालित सेवांद्वारे सक्षम करणे.",
    footer_quick_links: "जलद लिंक्स",
    footer_privacy: "गोपनीयता धोरण",
    footer_terms: "सेवा अटी",
    footer_contact: "सपोर्ट संपर्क",
    footer_rights: "सर्व हक्क राखीव. स्मार्ट भारत AI उपक्रम.",

    // Auth
    auth_login_title: "स्मार्ट भारत AI मध्ये साइन इन करा",
    auth_signup_title: "तुमचे स्मार्ट भारत खाते तयार करा",
    auth_email: "ईमेल पत्ता",
    auth_password: "पासवर्ड",
    auth_name: "पूर्ण नाव",
    auth_phone: "फोन नंबर",
    auth_submit_login: "साइन इन",
    auth_submit_signup: "सुरू करा",
  },

  te: {
    // Navigation
    nav_dashboard: "డాష్‌బోర్డ్",
    nav_schemes: "పథకాలు",
    nav_ids: "గుర్తింపు కార్డులు (IDs)",
    nav_complaints: "ఫిర్యాదులు",
    nav_assistant: "AI అసిస్టెంట్",
    nav_credentials: "పత్రాలు",
    nav_signin: "సైన్ ఇన్",
    nav_signup: "ప్రారంభించండి",
    nav_signout: "సైన్ అవుట్",
    nav_change_language: "భాష",
    nav_language: "భాష",
    nav_profile: "ప్రొఫైల్",

    // Hero & Home
    hero_badge: "అధికారిక డిజిటల్ ఇండియా చొరవ 24/7",
    hero_title_1: "ప్రతి భారతీయ పౌరుడికి",
    hero_title_2: "స్మార్ట్ డిజిటల్ పాలన",
    hero_subtitle: "ప్రభుత్వ పథకాలకు తక్షణ అర్హత, గుర్తింపు కార్డు దరఖాస్తులు మరియు 24/7 AI పాలసీ అసిస్టెంట్.",
    hero_search_placeholder: "PM-KISAN, ఆధార్ అప్‌డేట్, ఫిర్యాదు, పాస్‌పోర్ట్ వెతకండి...",
    hero_search_button: "సేవలను వెతకండి",
    hero_btn_schemes: "పథకాలను చూడండి",
    hero_btn_assistant: "AI అసిస్టెంట్‌ని అడగండి",

    // Assistant
    ai_title: "స్మార్ట్ భారత్ AI",
    ai_subtitle: "మీ సహాయానికి ఎల్లప్పుడూ సిద్ధం",
    ai_welcome: "నమస్కారం! నేను మీ స్మార్ట్ భారత్ AI అసిస్టెంట్‌ని. ఈ రోజు మీకు ఎలా సహాయపడగలను?",
    ai_placeholder: "పథకాల గురించి అడగండి, పత్రాలను అప్‌లోడ్ చేయండి...",
    ai_suggested_title: "మీ కోసం సూచించిన ప్రశ్నలు:",
    ai_disclaimer: "స్మార్ట్ భారత్ AI కొన్నిసార్లు తప్పు సమాచారం ఇవ్వవచ్చు. దయచేసి అధికారిక సమాచారాన్ని తనిఖీ చేయండి.",
    ai_find_schemes: "పథకాలను వెతకండి",
    ai_find_schemes_desc: "ప్రభుత్వ పథకాల అర్హతలు తెలుసుకోండి.",
    ai_explain_doc: "పత్రాల వివరాలు",
    ai_explain_doc_desc: "సులభ వివరణ కోసం ఫారమ్‌లను అప్‌లోడ్ చేయండి.",
    ai_healthcare: "ఆరోగ్య సేవలు",
    ai_healthcare_desc: "సమీప ఆయుష్మాన్ భారత్ ఆసుపత్రిని కనుగొనండి.",
    ai_new_chat: "కొత్త చాట్",
    ai_recent_chats: "ఇటీవలి చాట్‌లు",

    // Schemes
    schemes_title: "ప్రభుత్వ పథకాలు & సంక్షేమ కార్యక్రమాలు",
    schemes_subtitle: "మీ కోసం రూపొందించిన కేంద్ర, రాష్ట్ర ప్రభుత్వ పథకాలను పరిశీలించండి",
    schemes_check_eligibility: "అర్హత తనిఖీ చేయండి",
    schemes_apply_now: "ఇప్పుడే దరఖాస్తు చేయండి",
    schemes_category_all: "అన్ని పథకాలు",
    schemes_category_farmers: "రైతులు & వ్యవసాయం",
    schemes_category_students: "విద్య & స్కాలర్‌షిప్‌లు",
    schemes_category_health: "ఆరోగ్యం & భీమా",
    schemes_category_women: "మహిళా & శిశు సంక్షేమం",
    schemes_category_housing: "గృహనిర్మాణం & సంక్షేమం",

    // Foundational IDs
    ids_title: "పౌర గుర్తింపు కార్డులు & సేవలు",
    ids_subtitle: "మీ ముఖ్యమైన గుర్తింపు పత్రాల కోసం డిజిటల్‌గా దరఖాస్తు చేసుకోండి",
    ids_aadhaar: "ఆధార్ కార్డు",
    ids_pan: "పాన్ కార్డు",
    ids_voter: "ఓటర్ ఐడీ",
    ids_passport: "పాస్‌పోర్ట్ సేవ",
    ids_driving: "డ్రైవింగ్ లైసెన్స్",
    ids_ration: "రేషన్ కార్డు",
    ids_apply: "దరఖాస్తు / అప్‌డేట్",
    ids_track: "స్థితిని ట్రాక్ చేయండి",

    // Complaints
    complaints_title: "ప్రజా ఫిర్యాదులు & పరిష్కారం",
    complaints_subtitle: "రియల్-టైమ్ AI ట్రాకింగ్‌తో ఫిర్యాదులు నమోదు చేయండి",
    complaints_file_new: "కొత్త ఫిర్యాదు నమోదు చేయండి",
    complaints_track_existing: "ఫిర్యాదును ట్రాక్ చేయండి",
    complaints_pothole: "రోడ్లు & మౌలిక సదుపాయాలు",
    complaints_water: "మంచినీటి సరఫరా & పారిశుధ్యం",
    complaints_electricity: "విద్యుత్ సేవలు",
    complaints_waste: "చెత్త నిర్వహణ",

    // Credentials / Vault
    vault_title: "డిజిటల్ పత్రాల వాల్ట్",
    vault_subtitle: "డిజిలాకర్ పత్రాలను సురక్షితంగా నిల్వ చేయండి మరియు ధృవీకరించండి",
    vault_sync: "డిజిలాకర్‌తో సింక్ చేయండి",
    vault_download: "PDF డౌన్‌లోడ్ చేయండి",

    // Footer
    footer_tagline: "140 కోట్ల మంది పౌరులకు AI-ఆధారిత సేవల ద్వారా సాధికారత కల్పించడం.",
    footer_quick_links: "త్వరిత లింక్‌లు",
    footer_privacy: "గోప్యతా విధానం",
    footer_terms: "సేవా నిబంధనలు",
    footer_contact: "సపోర్ట్ కాంటాక్ట్",
    footer_rights: "అన్ని హక్కులూ ప్రత్యేకించబడ్డాయి. స్మార్ట్ భారత్ AI చొరవ.",

    // Auth
    auth_login_title: "స్మార్ట్ భారత్ AI లోకి సైన్ ఇన్ చేయండి",
    auth_signup_title: "మీ స్మార్ట్ భారత్ ఖాతాను సృష్టించండి",
    auth_email: "ఈమెయిల్ చిరునామా",
    auth_password: "పాస్‌వర్డ్",
    auth_name: "పూర్తి పేరు",
    auth_phone: "ఫోన్ నంబర్",
    auth_submit_login: "సైన్ ఇన్",
    auth_submit_signup: "ప్రారంభించండి",
  },

  ta: {
    // Navigation
    nav_dashboard: "டாஷ்போர்டு",
    nav_schemes: "திட்டங்கள்",
    nav_ids: "அடையாள அட்டைகள் (IDs)",
    nav_complaints: "புகார்கள்",
    nav_assistant: "AI உதவியாளர்",
    nav_credentials: "ஆவணங்கள்",
    nav_signin: "உள்நுழை",
    nav_signup: "தொடங்கவும்",
    nav_signout: "வெளியேறு",
    nav_change_language: "மொழி",
    nav_language: "மொழி",
    nav_profile: "சுயவிவரம்",

    // Hero & Home
    hero_badge: "அதிகாரப்பூர்வ டிஜிட்டல் இந்தியா முயற்சி 24/7",
    hero_title_1: "ஒவ்வொரு இந்திய குடிமகனுக்கும்",
    hero_title_2: "ஸ்மார்ட் டிஜிட்டல் ஆளுகை",
    hero_subtitle: "அரசு திட்டங்களுக்கான తక్షణ தகுதி, அடையாள அட்டை விண்ணப்பங்கள் மற்றும் 24/7 AI கொள்கை உதவியாளர்.",
    hero_search_placeholder: "PM-KISAN, ஆதார் புதுப்பிப்பு, புகார், பாஸ்போர்ட் தேடுக...",
    hero_search_button: "சேவைகளைத் தேடுக",
    hero_btn_schemes: "திட்டங்களைக் காண்க",
    hero_btn_assistant: "AI உதவியாளரிடம் கேட்க",

    // Assistant
    ai_title: "ஸ்மார்ட் பாரத் AI",
    ai_subtitle: "உங்களுக்கு உதவ எப்போதும் தயார்",
    ai_welcome: "வணக்கம்! நான் உங்கள் ஸ்மார்ட் பாரத் AI உதவியாளர். இன்று உங்களுக்கு எவ்வாறு உதவ முடியும்?",
    ai_placeholder: "திட்டங்கள் பற்றி கேட்க, ஆவணங்களை பதிவேற்ற...",
    ai_suggested_title: "உங்களுக்காக பரிந்துரைக்கப்பட்டவை:",
    ai_disclaimer: "ஸ்மார்ட் பாரத் AI தவறான தகவல்களை வழங்கலாம். அதிகாரப்பூர்வ ஆதாரங்களை சரிபார்க்கவும்.",
    ai_find_schemes: "திட்டங்களைத் தேடுக",
    ai_find_schemes_desc: "அரசு திட்டங்களின் தகுதிகளை அறியவும்.",
    ai_explain_doc: "ஆவண விளக்கம்",
    ai_explain_doc_desc: "எளிமையான விளக்கத்திற்கு படிவங்களை பதிவேற்றவும்.",
    ai_healthcare: "சுகாதார சேவைகள்",
    ai_healthcare_desc: "அருகிலுள்ள ஆயுஷ்மான் பாரத் மருத்துவமனையைக் கண்டறியவும்.",
    ai_new_chat: "புதிய உரையாடல்",
    ai_recent_chats: "சமீபத்திய உரையாடல்கள்",

    // Schemes
    schemes_title: "அரசு திட்டங்கள் & நலத்திட்டங்கள்",
    schemes_subtitle: "உங்களுக்கான மத்திய மற்றும் மாநில அரசு திட்டங்களை ஆராயுங்கள்",
    schemes_check_eligibility: "தகுதியை சரிபார்க்கவும்",
    schemes_apply_now: "இப்பொழுதே விண்ணப்பிக்கவும்",
    schemes_category_all: "அனைத்து திட்டங்கள்",
    schemes_category_farmers: "விவசாயிகள் & விவசாயம்",
    schemes_category_students: "கல்வி & கல்வி உதவித்தொகை",
    schemes_category_health: "சுகாதாரம் & காப்பீடு",
    schemes_category_women: "பெண்கள் & குழந்தைகள் நலன்",
    schemes_category_housing: "வீட்டுவசதி & நலன்",

    // Foundational IDs
    ids_title: "குடிமக்கள் அடையாள அட்டைகள் & சேவைகள்",
    ids_subtitle: "உங்கள் அத்தியாவசிய அடையாள ஆவணங்களுக்கு டிஜிட்டல் முறையில் விண்ணப்பிக்கவும்",
    ids_aadhaar: "ஆதார் கார்டு",
    ids_pan: "பான் கார்டு",
    ids_voter: "வாக்காளர் அடையாள அட்டை",
    ids_passport: "பாஸ்போர்ட் சேவை",
    ids_driving: "ஓட்டுநர் உரிமம்",
    ids_ration: "ரேஷன் கார்டு",
    ids_apply: "விண்ணப்பிக்க / புதுப்பிக்க",
    ids_track: "நிலையை கண்காணிக்க",

    // Complaints
    complaints_title: "பொதுமக்கள் புகார்கள் & தீர்வுகள்",
    complaints_subtitle: "நேரலை AI கண்காணிப்புடன் புகார்களைப் பதிவு செய்யவும்",
    complaints_file_new: "புதிய புகார் பதிவு செய்க",
    complaints_track_existing: "புகாரைக் கண்காணிக்க",
    complaints_pothole: "சாலை & உள்கட்டமைப்பு",
    complaints_water: "குடிநீர் விநியோகம் & சுகாதாரம்",
    complaints_electricity: "மின்சார சேவை",
    complaints_waste: "கழிவு மேலாண்மை",

    // Credentials / Vault
    vault_title: "டிஜிட்டல் ஆவண பெட்டகம்",
    vault_subtitle: "டிஜிலாக்கர் ஆவணங்களை பாதுகாப்பாக சேமிக்கவும் சரிபார்க்கவும்",
    vault_sync: "டிஜிலாக்கருடன் இணைக்கவும்",
    vault_download: "PDF பதிவிறக்கவும்",

    // Footer
    footer_tagline: "140 கோடி குடிமக்களுக்கு AI-அடிப்படையிலான சேவைகள் மூலம் அதிகாரமளித்தல்.",
    footer_quick_links: "விரைவு இணைப்புகள்",
    footer_privacy: "தனியுரிமைக் கொள்கை",
    footer_terms: "சேவை விதிகள்",
    footer_contact: "உதவி தொடர்பு",
    footer_rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. ஸ்மார்ட் பாரத் AI முயற்சி.",

    // Auth
    auth_login_title: "ஸ்மார்ட் பாரத் AI இல் உள்நுழையவும்",
    auth_signup_title: "உங்கள் ஸ்மார்ட் பாரத் கணக்கை உருவாக்கவும்",
    auth_email: "மின்னஞ்சல் முகவரி",
    auth_password: "கடவுச்சொல்",
    auth_name: "முழு பெயர்",
    auth_phone: "தொலைபேசி எண்",
    auth_submit_login: "உள்நுழை",
    auth_submit_signup: "தொடங்கவும்",
  },

  gu: {
    // Navigation
    nav_dashboard: "ડેશબોર્ડ",
    nav_schemes: "યોજનાઓ",
    nav_ids: "ઓળખપત્ર (IDs)",
    nav_complaints: "ફરિયાદો",
    nav_assistant: "AI સહાયક",
    nav_credentials: "દસ્તાવેજો",
    nav_signin: "સાઇન ઇન",
    nav_signup: "શરૂ કરો",
    nav_signout: "સાઇન આઉટ",
    nav_change_language: "ભાષા",
    nav_language: "ભાષા",
    nav_profile: "પ્રોફાઇલ",

    // Hero & Home
    hero_badge: "સત્તાવાર ડિજિટલ ઇન્ડિયા પહેલ ૨૪/૭",
    hero_title_1: "દરેક ભારતીય નાગરિક માટે",
    hero_title_2: "સ્માર્ટ ડિજિટલ શાસન",
    hero_subtitle: "સરકારી યોજનાઓ માટે ત્વરિત પાત્રતા, ઓળખપત્ર અરજીઓ અને ૨૪/૭ AI નીતિ સહાયક.",
    hero_search_placeholder: "પીએમ-કિસાન, આધાર અપડેટ, ફરિયાદ, પાસપોર્ટ શોધો...",
    hero_search_button: "સેવાઓ શોધો",
    hero_btn_schemes: "યોજનાઓ જુઓ",
    hero_btn_assistant: "AI સહાયકને પૂછો",

    // Assistant
    ai_title: "સ્માર્ટ ભારત AI",
    ai_subtitle: "તમારી સેવા માટે હંમેશા તત્પર",
    ai_welcome: "નમસ્તે! હું તમારો સ્માર્ટ ભારત AI સહાયક છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
    ai_placeholder: "યોજનાઓ વિશે પૂછો, દસ્તાવેજ અપલોડ કરો...",
    ai_suggested_title: "તમારા માટે સૂચવેલ પ્રશ્નો:",
    ai_disclaimer: "સ્માર્ટ ભારત AI ખોટી માહિતી આપી શકે છે. કૃપા કરીને સત્તાવાર માહિતી ચકાસો.",
    ai_find_schemes: "યોજનાઓ શોધો",
    ai_find_schemes_desc: "સરકારી યોજનાઓની પાત્રતા જાણો.",
    ai_explain_doc: "દસ્તાવેજ સ્પષ્ટીકરણ",
    ai_explain_doc_desc: "સરળ સમજુતી માટે ફોર્મ અપલોડ કરો.",
    ai_healthcare: "આરોગ્ય સેવાઓ",
    ai_healthcare_desc: "નજીકની આયુષ્માન ભારત હોસ્પિટલ શોધો.",
    ai_new_chat: "નવી વાચચીત",
    ai_recent_chats: "તાજેતરની વાચચીતો",

    // Schemes
    schemes_title: "સરકારી યોજનાઓ અને કલ્યાણકારી કાર્યક્રમો",
    schemes_subtitle: "તમારા માટે રાજ્ય અને કેન્દ્ર સરકારની યોજનાઓ શોધો",
    schemes_check_eligibility: "પાત્રતા તપાસો",
    schemes_apply_now: "હમણાં અરજી કરો",
    schemes_category_all: "બધી યોજનાઓ",
    schemes_category_farmers: "ખેડૂતો અને કૃષિ",
    schemes_category_students: "શિક્ષણ અને શિષ્યવૃત્તિ",
    schemes_category_health: "આરોગ્ય અને વીમો",
    schemes_category_women: "મહિલા અને બાળ વિકાસ",
    schemes_category_housing: "આવાસ અને કલ્યાણ",

    // Foundational IDs
    ids_title: "નાગરિક ઓળખપત્રો અને સેવાઓ",
    ids_subtitle: "તમારા મહત્વપૂર્ણ દસ્તાવેજો માટે ડિજિટલ અરજી અને સંચાલન કરો",
    ids_aadhaar: "આધાર કાર્ડ",
    ids_pan: "પાન કાર્ડ",
    ids_voter: "ચૂંટણી કાર્ડ (Voter ID)",
    ids_passport: "પાસપોર્ટ સેવા",
    ids_driving: "ડ્રાઇવિંગ લાઇસન્સ",
    ids_ration: "રાશન કાર્ડ",
    ids_apply: "અરજી / અપડેટ કરો",
    ids_track: "સ્થિતિ ટ્રેક કરો",

    // Complaints
    complaints_title: "નાગરિક ફરિયાદો અને નિવારણ",
    complaints_subtitle: "રિયલ-ટાઇમ AI ટ્રેકિંગ સાથે ફરિયાદો નોંધાવો",
    complaints_file_new: "નવી ફરિયાદ નોંધાવો",
    complaints_track_existing: "ફરિયાદ ટ્રેક કરો",
    complaints_pothole: "રસ્તા અને માળખાકીય સુવિધા",
    complaints_water: "પાણી પુરવઠો અને સ્વચ્છતા",
    complaints_electricity: "વીજળી સેવા",
    complaints_waste: "કચરા વ્યવસ્થાપન",

    // Credentials / Vault
    vault_title: "ડિજિટલ દસ્તાવેજ વોલ્ટ",
    vault_subtitle: "ડિજીલોકર દસ્તાવેજો સુરક્ષિત રીતે સંગ્રહિત અને ચકાસો",
    vault_sync: "ડિજીલોકર સાથે સિંક કરો",
    vault_download: "પીડીએફ ડાઉનલોડ કરો",

    // Footer
    footer_tagline: "૧૪૦ કરોડ નાગરિકોને AI-સંચાલિત સેવાઓ દ્વારા સશક્ત બનાવવા.",
    footer_quick_links: "ઝડપી લિંક્સ",
    footer_privacy: "ગોપનીયતા નીતિ",
    footer_terms: "સેવાની શરતો",
    footer_contact: "સપોર્ટ સંપર્ક",
    footer_rights: "તમામ હકો અનામત. સ્માર્ટ ભારત AI પહેલ.",

    // Auth
    auth_login_title: "સ્માર્ટ ભારત AI માં સાઇન ઇન કરો",
    auth_signup_title: "તમારું સ્માર્ટ ભારત ખાતું બનાવો",
    auth_email: "ઇમેઇલ સરનામું",
    auth_password: "પાસવર્ડ",
    auth_name: "પૂરું નામ",
    auth_phone: "ફોન નંબર",
    auth_submit_login: "સાઇન ઇન",
    auth_submit_signup: "શરૂ કરો",
  },

  ur: {
    // Navigation
    nav_dashboard: "ڈیش بورڈ",
    nav_schemes: "اسکیمیں",
    nav_ids: "شناختی کارڈ (IDs)",
    nav_complaints: "شکایات",
    nav_assistant: "اے آئی اسسٹنٹ",
    nav_credentials: "دستاویزات",
    nav_signin: "سائن ان",
    nav_signup: "شروع کریں",
    nav_signout: "سائن آؤٹ",
    nav_change_language: "زبان",
    nav_language: "زبان",
    nav_profile: "پروفائل",

    // Hero & Home
    hero_badge: "سرکاری ڈیجیٹل انڈیا پہل 24/7",
    hero_title_1: "ہر بھارتی شہری کے لیے",
    hero_title_2: "اسمارٹ ڈیجیٹل گورننس",
    hero_subtitle: "سرکاری اسکیموں کی فوری اہلیت، شناختی کارڈ کی درخواستیں اور 24/7 AI پالیسی اسسٹنٹ۔",
    hero_search_placeholder: "پی ایم کسان، آدھار اپ ڈیٹ، شکایت، پاسپورٹ تلاش کریں...",
    hero_search_button: "خدمات تلاش کریں",
    hero_btn_schemes: "اسکیمیں دیکھیں",
    hero_btn_assistant: "AI اسسٹنٹ سے پوچھیں",

    // Assistant
    ai_title: "اسمارٹ بھارت AI",
    ai_subtitle: "آپ کی مدد کے لیے ہمیشہ تیار",
    ai_welcome: "سلام! میں آپ کا اسمارٹ بھارت AI اسسٹنٹ ہوں۔ آج میں آپ کی کیا مدد کر سکتا ہوں؟",
    ai_placeholder: "اسکیموں کے بارے میں پوچھیں، دستاویزات اپ لوڈ کریں...",
    ai_suggested_title: "آپ کے لیے تجویز کردہ:",
    ai_disclaimer: "اسمارٹ بھارت AI غلط معلومات دے سکتا ہے۔ براہ کرم سرکاری ذرائع سے تصدیق کریں۔",
    ai_find_schemes: "اسکیمیں تلاش کریں",
    ai_find_schemes_desc: "سرکاری اسکیموں کی اہلیت جانیں۔",
    ai_explain_doc: "دستاویز کی وضاحت",
    ai_explain_doc_desc: "آسان وضاحت کے لیے فارم اپ لوڈ کریں۔",
    ai_healthcare: "صحت کی خدمات",
    ai_healthcare_desc: "قریبی آیوِشمان بھارت ہسپتال تلاش کریں۔",
    ai_new_chat: "نئی بات چیت",
    ai_recent_chats: "حالیہ بات چیت",

    // Schemes
    schemes_title: "سرکاری اسکیمیں اور فلاحی پروگرام",
    schemes_subtitle: "مرکزی اور ریاستی حکومت کی اسکیمیں تلاش کریں",
    schemes_check_eligibility: "اہلیت چیک کریں",
    schemes_apply_now: "ابھی درخواست دیں",
    schemes_category_all: "تمام اسکیمیں",
    schemes_category_farmers: "کسان اور زراعت",
    schemes_category_students: "تعلیم اور وظائف",
    schemes_category_health: "صحت اور انشورنس",
    schemes_category_women: "خواتین اور بچوں کی بہبود",
    schemes_category_housing: "رہائش اور فلاح",

    // Foundational IDs
    ids_title: "شہری شناختی کارڈ اور خدمات",
    ids_subtitle: "اپنی ضروری شناختی دستاویزات کے لیے ڈیجیٹل درخواست دیں",
    ids_aadhaar: "آدھار کارڈ",
    ids_pan: "پین کارڈ",
    ids_voter: "ووٹر آئی ڈی",
    ids_passport: "پاسپورٹ سروس",
    ids_driving: "ڈرائيونگ لائسنس",
    ids_ration: "راشن کارڈ",
    ids_apply: "درخواست دیں / اپ ڈیٹ کریں",
    ids_track: "اسٹیٹس ٹریک کریں",

    // Complaints
    complaints_title: "عوامی شکایات اور ازالہ",
    complaints_subtitle: "ریئل ٹائم AI ٹریکنگ کے ساتھ شکایت درج کریں",
    complaints_file_new: "نئی شکایت درج کریں",
    complaints_track_existing: "شکایت ٹریک کریں",
    complaints_pothole: "سڑکیں اور بنیادی ڈھانچہ",
    complaints_water: "پانی کی فراہمی اور صفائی",
    complaints_electricity: "بجلی کی سروس",
    complaints_waste: "کوڑا کرکٹ کا انتظام",

    // Credentials / Vault
    vault_title: "ڈیجیٹل دستاویز والٹ",
    vault_subtitle: "ڈیکی لاکر دستاویزات کو محفوظ طریقے سے محفوظ اور تصدیق کریں",
    vault_sync: "ڈیجی لاکر کے ساتھ سنک کریں",
    vault_download: "PDF ڈاؤن لوڈ کریں",

    // Footer
    footer_tagline: "1.4 ارب شہریوں کو AI پر مبنی خدمات سے بااختیار بنانا۔",
    footer_quick_links: "فوری لنکس",
    footer_privacy: "پرائیویسی پالیسی",
    footer_terms: "سروس کی شرائط",
    footer_contact: "سپورٹ رابطہ",
    footer_rights: "جملہ حقوق محفوظ ہیں۔ اسمارٹ بھارت AI پہل۔",

    // Auth
    auth_login_title: "اسمارٹ بھارت AI میں سائن ان کریں",
    auth_signup_title: "اپنا اسمارٹ بھارت اکاؤنٹ بنائیں",
    auth_email: "ای میل ایڈریس",
    auth_password: "پاس ورڈ",
    auth_name: "مکمل نام",
    auth_phone: "فون نمبر",
    auth_submit_login: "سائن ان",
    auth_submit_signup: "شروع کریں",
  },

  kn: {
    // Navigation
    nav_dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    nav_schemes: "ಯೋಜನೆಗಳು",
    nav_ids: "ಗುರುತಿನ ಚೀಟಿಗಳು (IDs)",
    nav_complaints: "ದೂರುಗಳು",
    nav_assistant: "AI ಸಹಾಯಕ",
    nav_credentials: "ದಾಖಲೆಗಳು",
    nav_signin: "ಸೈನ್ ಇನ್",
    nav_signup: "ಪ್ರಾರಂಭಿಸಿ",
    nav_signout: "ಸೈನ್ ಔಟ್",
    nav_change_language: "ಭಾಷೆ",
    nav_language: "ಭಾಷೆ",
    nav_profile: "ಪ್ರೊಫೈಲ್",

    // Hero & Home
    hero_badge: "ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಇಂಡಿಯಾ ಉಪಕ್ರಮ 24/7",
    hero_title_1: "ಪ್ರತಿಯೊಬ್ಬ ಭಾರತೀಯ ಪ್ರಜೆಗೆ",
    hero_title_2: "ಸ್ಮಾರ್ಟ್ ಡಿಜಿಟಲ್ ಆಡಳಿತ",
    hero_subtitle: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ತ್ವರಿತ ಅರ್ಹತೆ, ಗುರುತಿನ ಚೀಟಿ ಅರ್ಜಿಗಳು ಮತ್ತು 24/7 AI ನೀತಿ ಸಹಾಯಕ.",
    hero_search_placeholder: "PM-KISAN, ಆಧಾರ್ ಅಪ್‌ಡೇಟ್, ದೂರು, ಪಾಸ್‌ಪೋರ್ಟ್ ಹುಡುಕಿ...",
    hero_search_button: "ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ",
    hero_btn_schemes: "ಯೋಜನೆಗಳನ್ನು ನೋಡಿ",
    hero_btn_assistant: "AI ಸಹಾಯಕರನ್ನು ಕೇಳಿ",

    // Assistant
    ai_title: "ಸ್ಮಾರ್ಟ್ ಭಾರತ್ AI",
    ai_subtitle: "ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ಸದಾ ಸಿದ್ಧ",
    ai_welcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಭಾರತ್ AI ಸಹಾಯಕ. ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    ai_placeholder: "ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ, ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ...",
    ai_suggested_title: "ನಿಮಗಾಗಿ ಸೂಚಿಸಲಾದ ಪ್ರಶ್ನೆಗಳು:",
    ai_disclaimer: "ಸ್ಮಾರ್ಟ್ ಭಾರತ್ AI ತಪ್ಪು ಮಾಹಿತಿಯನ್ನು ನೀಡಬಹುದು. ಅಧಿಕೃತ ಮೂಲಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    ai_find_schemes: "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    ai_find_schemes_desc: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅರ್ಹತೆಯನ್ನು ತಿಳಿಯಿರಿ.",
    ai_explain_doc: "ದಾಖಲೆ ವಿವರಣೆ",
    ai_explain_doc_desc: "ಸುಲಭ ವಿವರಣೆಗಾಗಿ ಫಾರ್ಮ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    ai_healthcare: "ಆರೋಗ್ಯ ಸೇವೆಗಳು",
    ai_healthcare_desc: "ಹತ್ತಿರದ ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಆಸ್ಪತ್ರೆಯನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
    ai_new_chat: "ಹೊಸ ಸಂಭಾಷಣೆ",
    ai_recent_chats: "ಇತ್ತೀಚಿನ ಸಂಭಾಷಣೆಗಳು",

    // Schemes
    schemes_title: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮಗಳು",
    schemes_subtitle: "ನಿಮಗಾಗಿ ರೂಪಿಸಲಾದ ರಾಜ್ಯ ಮತ್ತು ಕೇಂದ್ರ ಸರ್ಕಾರದ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    schemes_check_eligibility: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
    schemes_apply_now: "ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    schemes_category_all: "ಎಲ್ಲಾ ಯೋಜನೆಗಳು",
    schemes_category_farmers: "ರೈತರು ಮತ್ತು ಕೃಷಿ",
    schemes_category_students: "ಶಿಕ್ಷಣ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ",
    schemes_category_health: "ಆರೋಗ್ಯ ಮತ್ತು ವಿಮೆ",
    schemes_category_women: "ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ",
    schemes_category_housing: "ವಸತಿ ಮತ್ತು ಕಲ್ಯಾಣ",

    // Foundational IDs
    ids_title: "ನಾಗರಿಕ ಗುರುತಿನ ಚೀಟಿಗಳು ಮತ್ತು ಸೇವೆಗಳು",
    ids_subtitle: "ನಿಮ್ಮ ಅತ್ಯಗತ್ಯ ಗುರುತಿನ ದಾಖಲೆಗಳಿಗಾಗಿ ಡಿಜಿಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    ids_aadhaar: "ಆಧಾರ್ ಕಾರ್ಡ್",
    ids_pan: "ಪ್ಯಾನ್ ಕಾರ್ಡ್",
    ids_voter: "ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ",
    ids_passport: "ಪಾಸ್‌ಪೋರ್ಟ್ ಸೇವೆ",
    ids_driving: "ಚಾಲನಾ ಪರವಾನಗಿ (DL)",
    ids_ration: "ರೇಷನ್ ಕಾರ್ಡ್",
    ids_apply: "ಅರ್ಜಿ / ಅಪ್‌ಡೇಟ್",
    ids_track: "ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",

    // Complaints
    complaints_title: "ಸಾರ್ವಜನಿಕ ದೂರುಗಳು ಮತ್ತು ಪರಿಹಾರ",
    complaints_subtitle: "ರಿಯಲ್-ಟೈಮ್ AI ಟ್ರ್ಯಾಕಿಂಗ್‌ನೊಂದಿಗೆ ದೂರುಗಳನ್ನು ದಾಖಲಿಸಿ",
    complaints_file_new: "ಹೊಸ ದೂರು ದಾಖಲಿಸಿ",
    complaints_track_existing: "ದೂರನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    complaints_pothole: "ರಸ್ತೆಗಳು ಮತ್ತು ಮೂಲಸೌಕರ್ಯ",
    complaints_water: "ನೀರು ಸರಬರಾಜು ಮತ್ತು ನೈರ್ಮಲ್ಯ",
    complaints_electricity: "ವಿದ್ಯುತ್ ಸೇವೆ",
    complaints_waste: "ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ",

    // Credentials / Vault
    vault_title: "ಡಿಜಿಟಲ್ ದಾಖಲೆಗಳ ವಾಲ್ಟ್",
    vault_subtitle: "ಡಿಜಿಲಾಕರ್ ದಾಖಲೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿ",
    vault_sync: "ಡಿಜಿಲಾಕರ್‌ನೊಂದಿಗೆ ಸಿಂಕ್ ಮಾಡಿ",
    vault_download: "PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",

    // Footer
    footer_tagline: "140 ಕೋಟಿ ನಾಗರಿಕರಿಗೆ AI ಆಧಾರಿತ ಸೇವೆಗಳ ಮೂಲಕ ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.",
    footer_quick_links: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    footer_privacy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    footer_terms: "ಸೇವೆಯ ನಿಯಮಗಳು",
    footer_contact: "ಬೆಂಬಲ ಸಂಪರ್ಕ",
    footer_rights: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಸ್ಮಾರ್ಟ್ ಭಾರತ್ AI ಉಪಕ್ರಮ.",

    // Auth
    auth_login_title: "ಸ್ಮಾರ್ಟ್ ಭಾರತ್ AI ಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    auth_signup_title: "ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಭಾರತ್ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    auth_email: "ಇಮೇಲ್ ವಿಳಾಸ",
    auth_password: "ಪಾಸ್‌ವರ್ಡ್",
    auth_name: "ಪೂರ್ಣ ಹೆಸರು",
    auth_phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    auth_submit_login: "ಸೈನ್ ಇನ್",
    auth_submit_signup: "ಪ್ರಾರಂಭಿಸಿ",
  },
};
