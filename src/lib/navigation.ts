export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Our Story", href: "/our-story" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Our Impact", href: "/our-impact" },
  { label: "Get Involved", href: "/get-involved" },
];

export const supportCta: NavItem = { label: "Get Support", href: "/get-support" };

export const youtubeChannel = "https://www.youtube.com/@AbayomiAlvinTv/videos";

export const footerContent = {
  cta: {
    hashtag: "#StartAgain",
    title: { lead: "Your comeback can", highlight: "start today." },
    // Fact sheet beside the banner.
    facts: [
      { label: "For", value: "Small business owners" },
      { label: "Support", value: "Financial & recovery" },
      { label: "Where", value: "Nigeria" },
    ],
    primary: { label: "Get Support", href: "/get-support" },
    secondary: { label: "or get involved", href: "/get-involved" },
  },
  tagline: "A fall should never mean the end of someone's story.",
  about:
    "Beyond The Fall Initiative helps small business owners in Nigeria rebuild after setbacks, connected to Abayomi Alvin's storytelling platform, Beyond Before.",
  columns: [
    {
      title: "Explore",
      links: [{ label: "Home", href: "/" }, ...primaryNav],
    },
    {
      title: "Take part",
      links: [
        { label: "Apply for support", href: "/get-support" },
        { label: "Partner with us", href: "/get-involved" },
        { label: "Impact stories", href: "/our-impact" },
      ],
    },
  ],
  watch: {
    title: "Watch",
    text: "Real stories of setbacks and comebacks, on YouTube.",
    label: "AbayomiAlvin Tv",
  },
};
