export type CourseLesson = {
  slug: string;
  title: string;
  module: string;
};

export const courseLessons: CourseLesson[] = [
  { slug: "introduction", title: "Introduction", module: "Start Here" },
  { slug: "about-the-author", title: "About the Author", module: "Start Here" },
  { slug: "mindset", title: "Mindset", module: "Start Here" },
  { slug: "ai-tips", title: "AI Tips", module: "Start Here" },
  {
    slug: "networking-on-linkedin",
    title: "How Networking Actually Works on LinkedIn",
    module: "Start Here",
  },
  { slug: "profile-photo", title: "Profile Photo", module: "Build Your Profile" },
  { slug: "banner-photo", title: "Banner Photo", module: "Build Your Profile" },
  { slug: "headline", title: "Headline", module: "Build Your Profile" },
  { slug: "your-location", title: "Your Location", module: "Build Your Profile" },
  { slug: "about-section", title: "About Section", module: "Build Your Profile" },
  { slug: "experience", title: "Experience", module: "Build Your Profile" },
  { slug: "education", title: "Education", module: "Build Your Profile" },
  {
    slug: "volunteer-experience",
    title: "Volunteer Experience",
    module: "Build Your Profile",
  },
  {
    slug: "certifications-projects-publications",
    title: "Certifications, Projects & Publications",
    module: "Strengthen Your Profile",
  },
  { slug: "skills", title: "Skills", module: "Strengthen Your Profile" },
  {
    slug: "recommendations",
    title: "Recommendations",
    module: "Strengthen Your Profile",
  },
  {
    slug: "open-to-work",
    title: "Open to Work",
    module: "Strengthen Your Profile",
  },
  {
    slug: "connections",
    title: "Connections",
    module: "Strengthen Your Profile",
  },
  {
    slug: "additional-sections",
    title: "Additional Sections",
    module: "Strengthen Your Profile",
  },
  { slug: "wrap-up", title: "Wrap Up", module: "Finish Strong" },
  { slug: "bonus-content", title: "Bonus Content", module: "Finish Strong" },
];

export const courseModules = Array.from(
  new Set(courseLessons.map((lesson) => lesson.module))
);
