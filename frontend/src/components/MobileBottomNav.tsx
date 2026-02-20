import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info, Calendar, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const MobileBottomNav = () => {
  const location = useLocation();
  const { isDark, toggleDarkMode } = useTheme();

  const navItems = [
    {
      name: "About",
      href: "/about",
      icon: Info,
      color: "text-blue-500"
    },
    {
      name: "Events",
      href: "/events", 
      icon: Calendar,
      color: "text-green-500"
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Mail,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50 rounded-2xl shadow-lg mx-4 mb-3">
        <div className="flex items-center justify-around py-2 px-4">
          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/15 text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className={`p-1.5 rounded-full transition-colors ${
                    isActive 
                      ? 'bg-primary/20' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}>
                    <IconComponent className={`h-4 w-4 ${isActive ? item.color : ''}`} />
                  </div>
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
            >
              <div className={`p-1.5 rounded-full transition-colors ${
                isDark 
                  ? 'bg-yellow-100 text-yellow-600' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {isDark ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
