// Logos in public/icons/, as <name>-black.svg
export type SocialIconName = "github" | "linkedin";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconName;
};
