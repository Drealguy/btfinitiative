import craftShop from "@/assets/hero/craft-shop.jpg";
import provisionStore from "@/assets/hero/provision-store.jpg";
import plantainSeller from "@/assets/support/plantain-seller.jpg";
import secondChances from "@/assets/what-we-do/second-chances.jpg";
import founderPhoto from "@/assets/our-story/abayomi-alvin.png";

// Copy supplied by the client (Our Story brief). The founder photo was supplied by the client;
// the other photos are stand-in stock (see src/assets/hero/CREDITS.md).

export const storyHero = {
  eyebrow: "Our Story",
  note: "Beyond The Fall",
  title: { lead: "Because Everyone Deserves", highlight: "a Chance to Rise Again." },
  intro:
    "Every great story has its difficult chapters. Some come with unexpected losses, failed attempts, and moments when starting over feels impossible.",
  belief: "At Beyond The Fall Initiative, we believe those moments shouldn't determine how someone's story ends.",
  promise:
    "We're here to help small business owners find their feet again, rebuild what they've lost, and rediscover the possibility of a better tomorrow.",
  image: plantainSeller,
  imageAlt: "A trader carrying a large bunch of plantains on his shoulder outside a shop",
  facts: [
    { label: "Founder", value: "Abayomi Alvin" },
    { label: "For", value: "Small business owners" },
    { label: "Where", value: "Nigeria" },
  ],
};

export const beginning = {
  label: "Our Beginning",
  title: { lead: "Born From Experience.", highlight: "Built on Compassion." },
  image: founderPhoto,
  imageAlt: "Abayomi Alvin, founder of Beyond The Fall Initiative",
  caption: "Abayomi Alvin · Founder",
  // Chapter labels are editorial; the paragraphs are the client's copy.
  chapters: [
    {
      label: "The setback",
      paragraphs: [
        "Sometimes, it takes experiencing a difficult season yourself to understand just how much a helping hand can mean.",
        "For our founder, Abayomi Alvin, the inspiration behind Beyond The Fall Initiative came from a deeply personal place.",
        "Having experienced significant financial and business setbacks himself, he understood the uncertainty, pressure, and emotional weight that come with watching something you've worked hard to build fall apart.",
      ],
    },
    {
      label: "The question",
      paragraphs: [
        "He eventually found a way to recover.",
        "But that journey left him with an important question:",
      ],
      question: "What happens to the people who haven't been able to bounce back?",
      after: [
        "The business owners who still have dreams but no longer have the resources to pursue them. The entrepreneurs who have the skills, experience, and determination to try again but need someone to give them a chance.",
      ],
    },
    {
      label: "The answer",
      paragraphs: [
        "That question became a driving force behind Beyond The Fall Initiative.",
        "An initiative created to reach people in those difficult moments and offer practical support that could help them begin again.",
      ],
    },
  ],
};

export const founder = {
  label: "The Person Behind the Vision",
  title: { lead: "Meet", highlight: "Abayomi Alvin." },
  role: "Founder, Beyond The Fall Initiative",
  image: founderPhoto,
  imageAlt: "Portrait of Abayomi Alvin",
  roles: ["Actor", "Filmmaker", "Screenwriter", "Content creator", "Entrepreneur"],
  bio: [
    "Abayomi Alvin Towase is a Nigerian actor, filmmaker, screenwriter, content creator, and entrepreneur.",
    "Known for his work across Nigeria's entertainment industry, Abayomi has built a career in storytelling while pursuing entrepreneurial interests beyond the screen.",
    "But beyond his professional accomplishments is a personal understanding of what it means to experience setbacks and find the courage to begin again.",
    "Through his storytelling project, Beyond Before, Abayomi explores people's rock-bottom experiences and the journeys that followed.",
    "Those conversations also raised another important reality: while some people eventually find their way back up, many others are still searching for that opportunity.",
  ],
  closing:
    "Beyond The Fall Initiative grew from a desire to do more than share stories of resilience, but to contribute toward creating new ones.",
  // Points to his YouTube channel until a dedicated contact route exists.
  cta: { label: "Connect With Our Founder", href: "https://www.youtube.com/@AbayomiAlvinTv" },
};

export const purpose = {
  label: "What Drives Us",
  title: { lead: "We Believe in", highlight: "Second Chances." },
  beliefs: [
    "A failed business doesn't mean a failed person.",
    "A financial setback doesn't erase years of dedication, experience, or potential.",
    "Sometimes, the difference between giving up and trying again is simply having someone believe in you enough to help.",
  ],
  description:
    "Beyond The Fall Initiative exists to give small business owners facing difficult circumstances an opportunity to rebuild their livelihoods and move forward with renewed confidence.",
  closing: "We want to look beyond what people have lost and recognize what they're still capable of becoming.",
};

export const missionVision = {
  label: "What We Stand For",
  title: { lead: "A Purpose Bigger", highlight: "Than the Setback." },
  mission: {
    label: "Our Mission",
    title: "Helping People Rebuild What Matters.",
    text: "To empower small business owners affected by financial and business setbacks through practical assistance, renewed opportunities, and support that helps them rebuild their livelihoods.",
    image: secondChances,
    imageAlt: "A smiling shop worker steaming milk at a coffee machine",
  },
  vision: {
    label: "Our Vision",
    title: "A Future Where Setbacks Don't Define Success.",
    text: "To build a world where struggling entrepreneurs are not defined by their most difficult moments, but are given meaningful opportunities to recover, grow, and thrive.",
  },
};

export const values = {
  label: "The Beliefs That Guide Us",
  title: { lead: "What We", highlight: "Believe In." },
  items: [
    {
      name: "Compassion",
      title: "People First. Always.",
      text: "Every business has a human story behind it. We believe in listening, understanding, and treating every individual with dignity.",
    },
    {
      name: "Second Chances",
      title: "There's Always More to the Story.",
      text: "We believe setbacks should not permanently close the door to opportunity, especially for those determined to try again.",
    },
    {
      name: "Empowerment",
      title: "Support That Helps People Move Forward.",
      text: "Our focus is on providing meaningful assistance that helps individuals regain independence and rebuild their livelihoods.",
    },
    {
      name: "Hope",
      title: "Better Days Are Worth Building Toward.",
      text: "Even after difficult experiences, we believe there can still be room for growth, recovery, and new beginnings.",
    },
  ],
  ribbon: ["Compassion", "Second Chances", "Empowerment", "Hope", "Rise Again"],
};

export const lookingAhead = {
  label: "The Journey Ahead",
  title: { lead: "We're Just", highlight: "Getting Started." },
  paragraphs: [
    "Beyond The Fall Initiative began with a simple desire to help people get back on their feet.",
    "But the vision goes beyond a single act of kindness.",
    "We hope to reach more small business owners, create opportunities for meaningful partnerships, and build a growing community committed to helping people recover from difficult circumstances.",
  ],
  // The client's closing lines, set as a statement with photo pills.
  statement: [
    { text: "Every person supported" },
    { image: provisionStore },
    { text: "represents an opportunity for a new beginning. And every new beginning" },
    { image: craftShop },
    { text: "is a reminder of why this initiative exists." },
  ],
};

export const closingCta = {
  label: "Be Part of the Story",
  title: { lead: "Together, We Can Help", highlight: "More People Rise Again." },
  description:
    "Whether you're a small business owner looking for support, an individual who wants to help, or an organization interested in making a difference, there's a place for you in this story.",
  primary: { label: "Get Support", href: "/get-support" },
  secondary: { label: "Get Involved", href: "/get-involved" },
  // The three audiences named in the description, each with its next step.
  paths: [
    { label: "Small business owners", text: "Looking for support", cta: "Get Support", href: "/get-support" },
    { label: "Individuals", text: "Want to help", cta: "Get Involved", href: "/get-involved" },
    { label: "Organisations", text: "Ready to make a difference", cta: "Partner with us", href: "/get-involved" },
  ],
};
