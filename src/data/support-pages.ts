export interface SupportPageSection {
  bullets?: readonly string[];
  paragraphs: readonly string[];
  title: string;
}

export interface SupportPageFaq {
  answer: string;
  question: string;
}

export interface SupportPageData {
  contactLabel?: string;
  contactUrl?: string;
  description: string;
  faq?: readonly SupportPageFaq[];
  h1: string;
  index: boolean;
  intro: string;
  kicker: string;
  route: `/${string}`;
  sections: readonly SupportPageSection[];
  title: string;
  updatedAt: string;
}

export const supportPages = {
  help: {
    route: "/help",
    title: "TokProfile Help — Video Link Checks & Engagement Calculator",
    description:
      "Learn what TokProfile's video link checker and engagement calculator do, which inputs they accept, and what to try when a result is unavailable.",
    h1: "TokProfile Help",
    kicker: "Current product help",
    intro:
      "TokProfile currently provides a public TikTok video link checker and an engagement-rate calculator. This page explains their inputs, results and limitations without presenting unavailable download or viewer features as live.",
    updatedAt: "2026-11-20",
    index: true,
    sections: [
      {
        title: "Check a public video link",
        paragraphs: [
          "Paste a full HTTPS TikTok video URL, confirm that you own the video or have permission from the rights holder, then select Check video. The checker validates the host, video path, creator handle and video identifier.",
          "A valid result confirms the URL structure only. TokProfile does not currently fetch or return a video file, and a valid link is not proof that reuse is permitted.",
        ],
        bullets: [
          "Use a full tiktok.com/@creator/video/123… URL.",
          "Profile pages, search pages, unrelated domains and unsupported short links are rejected.",
          "Private, removed, restricted or region-limited content may remain unavailable.",
        ],
      },
      {
        title: "Calculate an estimated engagement rate",
        paragraphs: [
          "Open the Engagement Calculator and enter followers plus average likes, comments and shares. The calculation runs in the browser and shows the substituted formula with an Estimated, not official TikTok data label.",
          "Use values collected from one clearly defined sample. Do not compare rates calculated with different denominators or post windows as if they were equivalent.",
        ],
      },
      {
        title: "Features not available yet",
        paragraphs: [
          "MP4 delivery, MP3 export, Story download, current Story viewing and live public-profile lookup are not production-ready. They do not appear in primary navigation or the sitemap until their final user outcomes are verified end to end.",
        ],
      },
    ],
    faq: [
      {
        question: "Why does a valid video link not show a download button?",
        answer:
          "The current release validates the URL and rights confirmation but has no verified media source. TokProfile does not invent a file or enable a button that cannot deliver one.",
      },
      {
        question: "Why is my TikTok link rejected?",
        answer:
          "Use a full HTTPS URL for one public video. A profile, search page, unsupported redirect, non-TikTok domain or malformed video identifier is rejected.",
      },
      {
        question: "Does the engagement calculator fetch my account data?",
        answer:
          "No. You enter the counts yourself. The current calculator processes them in browser component state and labels the result as an estimate.",
      },
      {
        question: "Can TokProfile access private content?",
        answer:
          "No. TokProfile does not bypass private accounts, platform access controls, removed media or regional restrictions.",
      },
    ],
  },
  contact: {
    route: "/contact",
    title: "Contact TokProfile",
    description:
      "Contact TokProfile about product support, privacy, security or copyright concerns.",
    h1: "Contact TokProfile",
    kicker: "Support and notices",
    intro:
      "Use the address below for product support, privacy questions, security reports and copyright notices. Do not send TikTok passwords, private media or payment information.",
    updatedAt: "2026-11-20",
    index: false,
    contactLabel: "Email hello@tokprofile.com",
    contactUrl: "mailto:hello@tokprofile.com",
    sections: [
      {
        title: "What to include",
        paragraphs: [
          "Include the TokProfile page you used, the time of the issue, the input type without unnecessary personal data, and the exact message shown. For copyright notices, follow the additional checklist on the Copyright page.",
        ],
        bullets: [
          "A concise subject such as Product support, Privacy request or Copyright notice.",
          "The affected TokProfile URL and steps needed to reproduce the issue.",
          "Screenshots with passwords, tokens and unrelated personal data removed.",
        ],
      },
      {
        title: "Current channel status",
        paragraphs: [
          "This page opens your email application. Automated ticket confirmation and response-time guarantees are not currently advertised. Urgent danger or platform-account access issues should be reported to the relevant platform or local authority, not to TokProfile.",
        ],
      },
    ],
  },
  copyright: {
    route: "/copyright",
    title: "Copyright Notice Process | TokProfile",
    description:
      "Learn how to send TokProfile a complete copyright notice concerning content or links shown on the service.",
    h1: "Copyright Notice Process",
    kicker: "Rights-holder support",
    intro:
      "TokProfile does not authorize the reuse of third-party media. If you believe a page or link on TokProfile infringes your rights, send a sufficiently detailed notice so it can be reviewed.",
    updatedAt: "2026-11-20",
    index: false,
    contactLabel: "Send a copyright notice",
    contactUrl: "mailto:hello@tokprofile.com?subject=Copyright%20notice",
    sections: [
      {
        title: "Include these details",
        paragraphs: [
          "A complete notice makes it possible to identify the work, locate the material and understand your authority to act. Incomplete or vague requests may require clarification.",
        ],
        bullets: [
          "Your name, organization if applicable, and reliable contact information.",
          "A description of the copyrighted work you believe has been infringed.",
          "The exact TokProfile URL and enough information to locate the disputed material.",
          "A good-faith statement that the disputed use is not authorized by the rights holder, its agent or the law.",
          "A statement that the information is accurate and that you are the rights holder or authorized to act for one.",
          "Your physical or electronic signature.",
        ],
      },
      {
        title: "What TokProfile can review",
        paragraphs: [
          "TokProfile can review its own pages, links and processing. It cannot remove material controlled only by TikTok or another third party. A notice may need to be sent to the service hosting the original material.",
          "Information in a notice may be shared when reasonably necessary to investigate the claim, obtain a response or comply with law. Do not submit information unrelated to the request.",
        ],
      },
    ],
  },
  privacy: {
    route: "/privacy",
    title: "Privacy Policy | TokProfile",
    description:
      "Read how TokProfile handles video-link checks, calculator inputs, infrastructure request data, cookies and optional account authorization.",
    h1: "Privacy Policy",
    kicker: "Current implementation disclosure",
    intro:
      "This policy describes behavior verified in the current TokProfile application. Using a tool without a TikTok login does not mean anonymous network use or zero infrastructure logs.",
    updatedAt: "2026-11-20",
    index: true,
    contactLabel: "Send a privacy question",
    contactUrl: "mailto:hello@tokprofile.com?subject=Privacy%20question",
    sections: [
      {
        title: "Information you submit",
        paragraphs: [
          "The video checker sends the TikTok URL and rights-confirmation value to a TokProfile server route for validation. The current route does not fetch or store a media file. Engagement Calculator values stay in browser component state and are not sent to a TokProfile calculation API.",
          "Do not submit passwords, private messages, private media, payment information or unrelated personal data into a public tool field.",
        ],
      },
      {
        title: "Infrastructure request data",
        paragraphs: [
          "TokProfile is deployed on Cloudflare Workers. Cloudflare and ordinary network infrastructure may process request information to deliver, secure, rate-limit and troubleshoot the service.",
        ],
        bullets: [
          "IP address or provider-derived location and an anonymized rate-limit key.",
          "Request time, method, path, response status and request identifiers.",
          "Browser user-agent, referrer, cache, firewall and Worker execution details.",
        ],
      },
      {
        title: "Cookies and optional authorization",
        paragraphs: [
          "The current public checker and calculator do not intentionally set a TokProfile account cookie. The codebase contains an optional TikTok authorization flow that uses a short-lived security-state cookie and an opaque session cookie, but production credentials are not configured and the feature is not in public navigation.",
        ],
      },
      {
        title: "Retention and third parties",
        paragraphs: [
          "TokProfile does not currently maintain a user-media library. Infrastructure logs may be retained under the active Cloudflare account settings. TikTok and any destination you open have their own policies; TokProfile does not control their processing.",
          "The policy will be updated before new analytics, storage, advertising or production account-connection features are activated.",
        ],
      },
    ],
    faq: [
      {
        question: "Does TokProfile permanently store submitted videos?",
        answer:
          "No. The current release does not fetch a video file and does not maintain a user-media library.",
      },
      {
        question: "Are calculator values sent to a server?",
        answer:
          "The current Engagement Calculator performs its calculation in browser component state and does not send those values to a TokProfile calculation API.",
      },
      {
        question: "Does no TikTok login mean anonymous browsing?",
        answer:
          "No. A service can avoid requesting TikTok credentials while browsers, networks and hosting infrastructure still process ordinary request data.",
      },
    ],
  },
  terms: {
    route: "/terms",
    title: "Terms of Service | TokProfile",
    description:
      "Read the current terms for using TokProfile's public link checker, engagement calculator and editorial guides.",
    h1: "Terms of Service",
    kicker: "Service boundaries",
    intro:
      "These terms describe the current TokProfile service. By using the site, you agree to use it lawfully and only with public links, counts and media you are permitted to process.",
    updatedAt: "2026-11-20",
    index: false,
    contactLabel: "Ask about these terms",
    contactUrl: "mailto:hello@tokprofile.com?subject=Terms%20question",
    sections: [
      {
        title: "Current service",
        paragraphs: [
          "TokProfile currently provides a TikTok video-link validator, a user-input engagement-rate calculator and editorial guides. It does not promise MP4 or MP3 delivery, Story access, live profile retrieval or uninterrupted access.",
          "TokProfile is independent of TikTok and ByteDance and is not endorsed by them.",
        ],
      },
      {
        title: "Permitted use",
        paragraphs: [
          "You are responsible for the links and values you submit and for determining whether you have the rights and lawful basis needed for your intended use.",
        ],
        bullets: [
          "Do not attempt to access private, restricted, removed or unauthorized content.",
          "Do not bypass rate limits, probe the service for vulnerabilities or interfere with other users.",
          "Do not use TokProfile to infringe copyright, privacy, publicity or other rights.",
          "Do not misrepresent TokProfile estimates as official TikTok data.",
        ],
      },
      {
        title: "Availability and estimates",
        paragraphs: [
          "Results may be unavailable, delayed or affected by platform changes, network conditions, input errors and regional restrictions. Calculator results are estimates based only on the values you enter and are not professional, financial or official platform advice.",
          "To the extent permitted by law, the service is provided without a guarantee of uninterrupted availability, fitness for a particular purpose or accuracy of third-party information.",
        ],
      },
      {
        title: "Changes and enforcement",
        paragraphs: [
          "TokProfile may limit abusive requests, change or discontinue a feature, and update these terms when the service changes. The updated date on this page identifies the current published version.",
        ],
      },
    ],
  },
} as const satisfies Record<string, SupportPageData>;

export type SupportPageKey = keyof typeof supportPages;
