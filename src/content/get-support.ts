// PLACEHOLDER — draft questions. BTF's application procedure and eligibility criteria
// are not yet confirmed; review these with the team before launch.

import plantainSeller from "@/assets/support/plantain-seller.jpg";

export const supportIntro = {
  label: "Get Support",
  // Stand-in stock photo (see src/assets/hero/CREDITS.md).
  image: plantainSeller,
  title: { lead: "Let's Help You", highlight: "Start Again." },
  description:
    "Tell us about you, your business and what happened. It's seven short questions — one at a time, at your own pace.",
  facts: ["7 short questions", "About 5 minutes"],
  welcome: {
    eyebrow: "Before you start",
    title: "Seven short questions. One step closer to starting again.",
    description: "There are no right or wrong answers. Just tell us, in your own words, where things stand.",
    checklist: [
      "Your name and how we can reach you",
      "Where your business is and what it does",
      "What happened, and what support would help most",
    ],
    cta: "Start application",
    time: "Takes about 5 minutes",
  },
  success: {
    eyebrow: "Application received",
    title: "Thank you, {name}.",
    description:
      "Your application is in. Our team will read every word, and we'll be in touch using the contact details you shared.",
    primary: { label: "Back to home", href: "/" },
    secondary: { label: "Watch stories of resilience", href: "https://www.youtube.com/@AbayomiAlvinTv/videos" },
  },
};

export const supportSteps = [
  {
    id: "name",
    title: "Your name",
    question: "First things first — what's your name?",
    helper: "So we know who we're talking to.",
  },
  {
    id: "contact",
    title: "Contact details",
    question: "Nice to meet you, {name}. How can we reach you?",
    helper: "We'll only use these to follow up on your application.",
  },
  {
    id: "location",
    title: "Location",
    question: "Where is your business based?",
    helper: "Tell us the state and the city or town.",
  },
  {
    id: "business",
    title: "Your business",
    question: "Tell us a little about your business.",
    helper: "What you do, and where things stand today.",
  },
  {
    id: "setback",
    title: "What happened",
    question: "What happened?",
    helper: "Pick everything that applies, then tell us more in your own words.",
  },
  {
    id: "support",
    title: "Support needed",
    question: "What kind of support would help you most?",
    helper: "Choose as many as you need.",
  },
  {
    id: "final",
    title: "Final details",
    question: "Last thing, {name} — a couple of quick details.",
    helper: "Then you're done.",
  },
] as const;

export type SupportStepId = (typeof supportSteps)[number]["id"];

export const supportOptions = {
  businessType: [
    "Retail & provisions",
    "Food & catering",
    "Fashion & tailoring",
    "Beauty & personal care",
    "Crafts & artisan work",
    "Agriculture & farming",
    "Services & repairs",
    "Other",
  ],
  businessStatus: ["Still running, but struggling", "Temporarily closed", "Shut down completely"],
  setbacks: [
    "Financial loss or debt",
    "Theft or fraud",
    "Fire, flood or disaster",
    "Illness or family emergency",
    "Equipment breakdown",
    "Lost my shop or location",
    "Something else",
  ],
  supportNeeds: [
    "Financial support",
    "Restocking products",
    "Replacing equipment",
    "Restarting operations",
    "Not sure yet",
  ],
  shareStory: ["Yes, I'd be happy to", "Maybe later", "I'd rather keep it private"],
  heardFrom: [
    "Beyond Before / Abayomi Alvin on YouTube",
    "Social media",
    "Friend or family",
    "Community or religious group",
    "Other",
  ],
  states: [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT (Abuja)", "Gombe",
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara", "Outside Nigeria",
  ],
};
