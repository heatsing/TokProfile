import type { UtilityToolContent } from "@/components/utility-tool/tool-landing";

export const storyDownloadContent: UtilityToolContent = {
  title: "Download TikTok Story",
  description: "Paste the link to a TikTok Story to check its format.",
  availability: "Link check only. Story files are not available to download here yet.",
  acceptedInput: "TikTok Story link",
  inputExample: "Copy the link from the Story itself in TikTok.",
  intro: {
    title: "Start with the Story you want to save",
    text: "Open the Story and use its share menu to copy the link if that option appears. A link to the creator’s profile takes you to their account instead of the individual Story.",
  },
  steps: [
    {
      title: "Open the Story",
      text: "Find the Story in TikTok while it’s still visible to you.",
    },
    {
      title: "Copy and paste the link",
      text: "Use the Story’s share menu. Paste the full address into the box above.",
    },
    {
      title: "Check the link format",
      text: "Select Check Story link. The result tells you whether the address has a supported format.",
    },
  ],
  result: [
    { title: "Link check", text: "Recognizes the supported Story URL format." },
    { title: "Story file", text: "Downloads are currently unavailable." },
    {
      title: "Availability",
      text: "Open the Story in TikTok to see whether it’s still visible to you.",
    },
  ],
  guideTitle: "If the Story link doesn’t work",
  guide: [
    {
      title: "The link opens a profile",
      text: "Go back to the Story and copy its own link if TikTok offers one.",
    },
    {
      title: "The Story is no longer visible",
      text: "For your own Story, check your camera roll or editing project for the original file.",
    },
    {
      title: "You only have the username",
      text: "Open the account in TikTok and check whether it has an active Story you can see.",
    },
  ],
  faq: [
    {
      question: "Can I download the Story here now?",
      answer:
        "The current tool checks link format. It doesn’t fetch or save the Story file.",
    },
    {
      question: "Can I paste the account’s profile link?",
      answer:
        "Use the address of the Story itself. The profile link identifies the account.",
    },
    {
      question: "Can I use a video post link?",
      answer: "Use the homepage checker for ordinary TikTok posts.",
    },
    {
      question: "Where can I find my original Story?",
      answer: "Check the camera roll or editing project you used when creating it.",
    },
  ],
  related: [
    { href: "/story-viewer", label: "Story Viewer" },
    { href: "/#download", label: "Video link checker" },
    { href: "/help", label: "Help" },
  ],
};

export const mp3Content: UtilityToolContent = {
  title: "TikTok to MP3",
  description: "Check the link to the TikTok video that contains the sound you want.",
  availability: "Link check only. MP3 conversion is not available here yet.",
  acceptedInput: "TikTok video link",
  inputExample: "Copy the link from a video that plays the sound you want.",
  intro: {
    title: "Which link should you use?",
    text: "Copy the link to a video that contains the exact audio you want. TikTok posts that use the same sound can start at different points or mix it with a voice-over.",
  },
  steps: [
    {
      title: "Find the right clip",
      text: "Play the video in TikTok to check you have the sound you want.",
    },
    {
      title: "Paste the video link",
      text: "Tap Share, then Copy link. Paste the full video address above.",
    },
    {
      title: "Check the format",
      text: "Select Check video link to see whether the address identifies one video.",
    },
  ],
  result: [
    { title: "Link check", text: "Recognizes a full TikTok video URL." },
    {
      title: "MP3 file",
      text: "Audio extraction and file delivery are currently unavailable.",
    },
    {
      title: "Input",
      text: "Use a video post link. Open one of the videos first if you are on a sound page.",
    },
  ],
  guideTitle: "Check the sound before copying the link",
  guide: [
    {
      title: "Need just the voice?",
      text: "If you created the clip, look for your original recording. The posted version might mix your voice with other sounds.",
    },
    {
      title: "The clip plays without sound",
      text: "Turn up the volume and play the post in TikTok. Use a clip that already contains the sound you want.",
    },
    {
      title: "The link opens several videos",
      text: "Open the individual post and copy the address again from that post’s share menu.",
    },
  ],
  faq: [
    {
      question: "Can I save an MP3 here now?",
      answer:
        "The current form checks the video link only. It doesn’t create an audio file.",
    },
    {
      question: "Can I paste a TikTok sound page?",
      answer: "Copy the link to a video that uses the sound instead.",
    },
    {
      question: "Will the link get me the entire song?",
      answer:
        "A video link identifies the posted clip. It does not identify a full recording beyond what’s in that clip.",
    },
    {
      question: "Can the form separate vocals from music?",
      answer:
        "The current form only checks the address. Use your original audio tracks for an editing project.",
    },
  ],
  related: [
    { href: "/#download", label: "Video link checker" },
    { href: "/download-tiktok-stories", label: "Download TikTok Story" },
    { href: "/help", label: "Help" },
  ],
};

export const storyViewerContent: UtilityToolContent = {
  title: "TikTok Story Viewer",
  description: "Check the username you want to use for a TikTok Story lookup.",
  availability: "Username check only. Live Story lookup is not available here yet.",
  acceptedInput: "TikTok username",
  inputExample: "Use the handle that starts with @ on the creator’s profile.",
  intro: {
    title: "Find the right account before looking for a Story",
    text: "Copy the exact handle from the creator’s TikTok profile. Several accounts may use the same display name, so check any numbers, periods or underscores in the handle.",
  },
  steps: [
    { title: "Open the profile", text: "Find the person you’re looking for in TikTok." },
    {
      title: "Copy the username",
      text: "Choose the handle starting with @ and enter it in the box above.",
    },
    {
      title: "Check the username",
      text: "The form checks its format. Open the account in TikTok to see what it has shared with you.",
    },
  ],
  result: [
    { title: "Username check", text: "Recognizes a handle in the supported format." },
    {
      title: "Live Stories",
      text: "Story results are currently unavailable from TokProfile.",
    },
    {
      title: "Where to watch",
      text: "Check the original TikTok profile for any Story visible to you.",
    },
  ],
  guideTitle: "If you can’t find a Story",
  guide: [
    {
      title: "Check the spelling",
      text: "Copy the handle from the profile again if it contains a period or underscore.",
    },
    {
      title: "Check when it was posted",
      text: "A Story that was visible earlier may have expired or been removed.",
    },
    {
      title: "Check the audience",
      text: "The creator controls who can watch what they share. Look for the Story while signed in to your own account in TikTok.",
    },
  ],
  faq: [
    {
      question: "Can I watch a Story here now?",
      answer:
        "TokProfile can check the username format. It doesn’t currently retrieve or play Stories.",
    },
    {
      question: "Can I search by display name?",
      answer: "Use the exact @username shown on the profile.",
    },
    {
      question: "Does passing the check mean the account has a Story?",
      answer:
        "The result tells you whether the username format is supported. Open the original profile to check for a Story.",
    },
    {
      question: "Can I see who watched my own Story?",
      answer: "Check your Story’s views in TikTok.",
    },
  ],
  related: [
    { href: "/download-tiktok-stories", label: "Download TikTok Story" },
    { href: "/profile-viewer", label: "Profile Viewer" },
    { href: "/help", label: "Help" },
  ],
};

export const profileViewerContent: UtilityToolContent = {
  title: "TikTok Profile Viewer",
  description:
    "Enter a TikTok username or public profile link to check the account reference.",
  availability:
    "Live profile details are currently unavailable. You can still check the input format.",
  acceptedInput: "TikTok username or profile link",
  inputExample: "Use @username or the address from the creator’s profile.",
  intro: {
    title: "Check that you have the right handle",
    text: "The handle starts with @ and can include numbers and punctuation. Copy it from the original profile if you have the link. A display name can appear on multiple accounts.",
  },
  steps: [
    {
      title: "Copy the handle",
      text: "Open the creator’s profile or copy the username from a credit you’re checking.",
    },
    {
      title: "Enter the account",
      text: "Paste the handle or a public profile link and choose View profile.",
    },
    {
      title: "Review the result",
      text: "The result tells you which inputs it can recognize and whether live details are available.",
    },
  ],
  result: [
    {
      title: "Overview",
      text: "Account details appear when a live public source returns them.",
    },
    {
      title: "Counts",
      text: "Follower and following counts depend on what the source provides.",
    },
    {
      title: "More tabs",
      text: "Reposts, liked videos, following and followers require their own data connections.",
    },
  ],
  guideTitle: "If the account doesn’t show up",
  guide: [
    {
      title: "Check the exact handle",
      text: "Look for a missing period, underscore or number.",
    },
    {
      title: "Open the original link",
      text: "The creator might have changed their username. The original profile may show their current handle.",
    },
    {
      title: "Check availability in TikTok",
      text: "Use TikTok to see what the creator shares with your account.",
    },
  ],
  faq: [
    {
      question: "Do I enter a username or a display name?",
      answer: "Enter the @username, or use the link to the creator’s profile.",
    },
    {
      question: "Can this tool view private posts?",
      answer:
        "Profile Viewer is designed for public account information. Access to private posts is managed in TikTok.",
    },
    {
      question: "Why are the profile details missing?",
      answer:
        "Live profile lookup is currently unavailable. A valid handle can still pass the format check.",
    },
    {
      question: "Does the profile view include who visited my account?",
      answer:
        "For that information, check Profile View History for your own account in TikTok.",
    },
  ],
  related: [
    { href: "/story-viewer", label: "Story Viewer" },
    {
      href: "/blog/what-information-is-public-on-tiktok",
      label: "What is public on TikTok?",
    },
    {
      href: "/blog/can-people-see-who-viewed-their-tiktok-profile",
      label: "TikTok profile view history",
    },
    { href: "/help", label: "Help" },
  ],
};
