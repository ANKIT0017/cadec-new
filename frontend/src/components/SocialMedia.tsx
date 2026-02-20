import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const SocialMedia = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      bgColor: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      bgColor: "bg-pink-600",
      hoverColor: "hover:bg-pink-700",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50 rounded-2xl p-3 shadow-lg">
        <div className="flex flex-col space-y-3">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                className={`${social.bgColor} ${social.hoverColor} w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;

