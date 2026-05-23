export interface Project {
  id: string;
  title: string;
  theme: string;
  features: string[];
  images: string[];
  layout: "mobile" | "desktop";
}

export const projects: Project[] = [
  {
    id: "bharatpath",
    title: "BHARATPATH",
    theme: "Transit Intelligence Layer",
    features: [
      "Journey optimizer",
      "Offline-first architecture",
      "Redis caching",
      "SOS layer",
      "Live tracking"
    ],
    images: [
      "/projects/bharatpath/home.png",
      "/projects/bharatpath/journey.png",
      "/projects/bharatpath/sos.png"
    ],
    layout: "mobile"
  },
  {
    id: "politico",
    title: "POLITICO",
    theme: "Multilingual News Intelligence",
    features: [
      "Real-time aggregation",
      "Text-to-speech",
      "Cloudflare optimization",
      "95+ Lighthouse"
    ],
    images: [
      "/projects/politico/home.png"
    ],
    layout: "desktop"
  },
  {
    id: "devcopilot",
    title: "DEVCOPILOT",
    theme: "AI Debug Assistant",
    features: [
      "FastAPI backend",
      "AI review",
      "Bug detection",
      "Suggestions",
      "Report generation"
    ],
    images: [
      "/projects/devcopilot/home.png"
    ],
    layout: "desktop"
  }
];
