import craftShop from "@/assets/hero/craft-shop.jpg";
import provisionStore from "@/assets/hero/provision-store.jpg";
import foodHandout from "@/assets/partners/food-handout.jpg";
import fashionStorePortrait from "@/assets/impact/fashion-store.jpg";
import fruitSellerPortrait from "@/assets/impact/fruit-seller.jpg";
import provisionStorePortrait from "@/assets/impact/provision-store.jpg";
import toolSharpenerPortrait from "@/assets/impact/tool-sharpener.jpg";
import businessRecovery from "@/assets/what-we-do/business-recovery.jpg";
import financialSupport from "@/assets/what-we-do/financial-support.jpg";
import secondChances from "@/assets/what-we-do/second-chances.jpg";
import storiesImage from "@/assets/what-we-do/stories.jpg";

export const hero = {
  eyebrow: "Beyond The Fall Initiative",
  note: "A fall should never mean the end of someone's story",
  title: {
    lead: "Helping Small Business Owners",
    highlight: "Bounce Back.",
  },
  description:
    "Every business deserves a second chance. We're helping small business owners overcome financial setbacks, rebuild what they've lost, and find the support they need to start again.",
  primaryCta: { label: "Get Support", href: "/get-support" },
  secondaryCta: { label: "Our Mission", href: "/our-story#mission" },
  // Stand-in stock photo (see src/assets/hero/CREDITS.md).
  image: provisionStore,
  imageLabel: "Small business · Nigeria",
  facts: [
    { label: "Who we help", value: "Small business owners" },
    { label: "How", value: "Practical support" },
    { label: "Where", value: "Nigeria" },
  ],
  // Scrolling ribbon along the bottom of the hero.
  ribbon: ["Financial Support", "Business Recovery", "Second Chances", "Stories of Resilience", "Start Again"],
};

// PLACEHOLDER — replace with a confirmed figure. The avatars are the stock impact portraits,
// not people BTF has supported.
export const heroProof = {
  stat: "120+",
  statLabel: "business owners supported",
  detail: "Across Lagos, Ibadan, Kaduna & more",
  avatars: [fashionStorePortrait, provisionStorePortrait, toolSharpenerPortrait, fruitSellerPortrait],
};

// PLACEHOLDER — invented organisations so the strip can be designed. BTF has no confirmed
// partners yet; never swap in real company logos without a confirmed partnership and permission.
export const partners = {
  label: "Our Partners",
  title: {
    lead: "Partners Who Believe",
    highlight: "in Second Chances.",
  },
  cta: { label: "Become a partner", href: "/get-involved" },
  // The first logo is the featured (principal) partner.
  featuredDetail: "Foundation · Principal partner",
  // Stand-in stock photo (see src/assets/hero/CREDITS.md).
  featuredImage: foodHandout,
  logos: [
    { name: "Ashwood Foundation", role: "Principal partner", mark: "ring", style: "title" },
    { name: "Kinfolk Trust", role: "Funding partner", mark: "leaf", style: "upper" },
    { name: "Solace Capital", role: "Funding partner", mark: "stack", style: "title" },
    { name: "Riverline", role: "Community partner", mark: "wave", style: "bold" },
    { name: "Harmattan Ventures", role: "Programme partner", mark: "sun", style: "upper" },
    { name: "Cedarstone", role: "Programme partner", mark: "diamond", style: "bold" },
    { name: "Brightgate", role: "Friend", mark: "arch", style: "title" },
    { name: "Evergreen Fund", role: "Friend", mark: "spark", style: "upper" },
  ],
  // Final cell of the grid — an open invitation.
  invite: { label: "Your organisation", text: "Partner with us", href: "/get-involved" },
} as const;

export const whatWeDo = {
  label: "What We Do",
  title: {
    lead: "A Setback Shouldn't Be",
    highlight: "the End of Your Story.",
  },
  description:
    "Behind every small business is a dream, years of effort, and someone determined to make things work.",
  cta: { label: "Get Support", href: "/get-support" },
  link: { label: "Explore what we do", href: "/what-we-do" },
  purpose: {
    label: "Our purpose",
    image: financialSupport,
    // Muted text with the strong phrases picked out.
    statement: [
      { text: "Helping " },
      { text: "small business owners", strong: true },
      { text: " through hard times " },
      { text: "rebuild", strong: true },
      { text: ", restart and " },
      { text: "find their feet", strong: true },
      { text: " again." },
    ],
  },
  ways: {
    label: "How we help",
    figure: "04",
    caption: "Ways we help business owners start again",
    image: businessRecovery,
    imageLabel: "Business Recovery",
  },
  offer: {
    label: "What we offer",
    description:
      "We exist to help business owners facing difficult times find the support and opportunity they need to move forward.",
  },
  items: [
    {
      image: financialSupport,
      label: "Financial Support",
      title: "Helping You Find Your Feet Again.",
      description:
        "Sometimes, all a struggling business needs is a little financial support to get moving again. We provide assistance to help small business owners overcome immediate challenges and take meaningful steps toward recovery.",
    },
    {
      image: businessRecovery,
      label: "Business Recovery",
      title: "Rebuilding What Matters.",
      description:
        "Whether it's restocking products, replacing essential equipment, or restarting operations, we focus on helping entrepreneurs get their businesses back on track and regain their independence.",
    },
    {
      image: secondChances,
      label: "Second Chances",
      title: "Because One Setback Isn't the End.",
      description:
        "We believe a difficult season shouldn't define someone's future. Our initiative is built around giving determined business owners another opportunity to pursue what they've worked so hard to build.",
    },
    {
      image: storiesImage,
      label: "Stories of Resilience",
      title: "Every Comeback Has a Story.",
      description:
        "Beyond financial assistance, we want to highlight the journeys of people who have faced difficult circumstances and are finding their way forward, inspiring others to believe that starting again is possible.",
    },
  ],
};

export const storiesInsights = {
  label: "Stories & Insights",
  // Centred statement; image parts render as photo pills inside the sentence.
  statement: [
    { text: "Real conversations about losing it all" },
    { image: craftShop },
    { text: "finding your feet again" },
    { image: secondChances },
    { text: "and building the courage to" },
    { image: storiesImage },
    { text: "start over." },
  ],
  source: "Beyond Before",
  // Fallback for videos without their own summary.
  summary: "A conversation from Beyond Before, Abayomi Alvin's storytelling platform on setbacks and comebacks.",
  cta: { label: "Explore More Stories", href: "https://www.youtube.com/@AbayomiAlvinTv/videos" },
  // Titles from YouTube, recased to match the site's type style. Tags are editorial labels drawn from each title.
  videos: [
    {
      id: "jV6SAp9u5r4",
      title: "How to Build a Dollar Millionaire Empire in Nigeria",
      // Condensed from the YouTube description.
      kicker: "Is he really worth $4 million?",
      summary:
        "Face to face at his Lagos home, he shares his origin story, his hardest financial downfalls, and what it truly takes to build success from the ground up.",
      guest: { name: "Chief Francis Nwaogwugwu", role: "CEO, Vintage Interiors" },
      tags: ["Interview", "Origin story"],
    },
    { id: "yG2vaIreIds", title: "How Wealthy Nigerians Are Losing Their Millions", tags: ["Money", "Lessons"] },
    { id: "xs662lP1Sjg", title: "How to Bounce Back After Losing Millions in Business", tags: ["Bouncing back", "Business"] },
    { id: "kmtZSy7Bbjg", title: "I Asked Successful Nigerians How Much Money They Have Lost in Business", tags: ["Street talk", "Loss"] },
  ],
};

// PLACEHOLDER — sample stories and stock portraits so the design can be reviewed.
// The people pictured are not the people described. Replace each entry (name, story,
// photo) with a real beneficiary who has consented to being featured before launch.
export const impactStories = {
  label: "Our Impact",
  title: {
    lead: "Real People.",
    highlight: "Real Comebacks.",
  },
  description:
    "Every comeback starts with someone who refused to give up. These are some of the business owners we've walked alongside as they rebuilt.",
  cta: { label: "See all impact stories", href: "/our-impact" },
  stories: [
    {
      name: "Folake Adeyemi",
      business: "Fashion & fabric store",
      location: "Ibadan",
      image: fashionStorePortrait,
      story: [
        "Folake spent nine years building her fabric and ready-to-wear shop. When flooding destroyed most of her stock in a single night, she was left with empty shelves and a loan she couldn't repay.",
        "With support to restock her best-selling lines, she reopened within weeks. Today her shop is busier than before, and she has taken on an apprentice of her own.",
      ],
      quote: "I thought it was over. Now I know it was only a pause.",
    },
    {
      name: "Ibrahim Musa",
      business: "Provision store",
      location: "Kaduna",
      image: provisionStorePortrait,
      story: [
        "Ibrahim trusted a supplier with his savings for a bulk order that never arrived. Overnight, the capital that kept his provision store running was gone.",
        "Support to restart operations helped him rebuild his inventory and re-open to the neighbourhood customers who had relied on him for years.",
      ],
      quote: "My customers never stopped asking for me. I'm glad I could open my doors again.",
    },
    {
      name: "Emmanuel Okon",
      business: "Tool & knife sharpening",
      location: "Calabar",
      image: toolSharpenerPortrait,
      story: [
        "For decades, Emmanuel's grinding wheel kept the kitchens and workshops around his street running. When the machine finally broke down, so did his only source of income.",
        "Replacing his essential equipment put him back to work the same week, and he now sharpens tools for three local markets.",
      ],
      quote: "This wheel is my livelihood. Getting it turning again gave me back my dignity.",
    },
    {
      name: "Chinedu Obi",
      business: "Fresh fruit stall",
      location: "Enugu",
      image: fruitSellerPortrait,
      story: [
        "Chinedu lost his stall and most of his savings during a long illness that kept him away from the market for months.",
        "Support to get back on his feet covered a new stall and his first restock. He's back at the market every morning, building toward a second location.",
      ],
      quote: "Falling down taught me a lot. Getting back up taught me more.",
    },
  ],
};
