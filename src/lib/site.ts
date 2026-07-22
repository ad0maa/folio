export const SITE = {
  title: "Adam Tunchay",
  role: "Full Stack Engineer",
  description:
    "Full-stack engineer in Melbourne/Surf Coast, Victoria. Production systems with real observability and payments infrastructure.",
  url: "https://adamtunchay.dev",
  repoUrl: "https://github.com/ad0maa/folio",
} as const;

export const CONTACT = {
  email: "adam.tunchay@me.com",
  github: "https://github.com/ad0maa",
  githubLabel: "github.com/ad0maa",
  linkedin: "https://linkedin.com/in/adam-tunchay",
  linkedinLabel: "linkedin.com/in/adam-tunchay",
  location: "Surf Coast, Victoria",
  workPreference: "Open to Melbourne hybrid or remote",
  availability: "Available now",
  resumeHref: "/resume.pdf",
} as const;

export const NAV_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

// One-line toggle: flip to true once a public résumé is ready to attach.
export const SHOW_RESUME = false;

export const SKILLS = [
  {
    label: "Core",
    items: [
      "TypeScript",
      "Node.js",
      "React",
      "React Native",
      "GraphQL",
      "RedwoodJS / CedarJS",
      "Prisma",
      "PostgreSQL",
    ],
  },
  {
    label: "Also comfortable with",
    items: [
      "Python (Flask)",
      "MongoDB",
      "AWS S3",
      "Stripe / Stripe Connect",
      "SendGrid",
      "Flutter",
      "FlutterFlow",
    ],
  },
  {
    label: "Currently learning",
    items: ["Django / DRF", "Drizzle", "Next.js"],
  },
] as const;
