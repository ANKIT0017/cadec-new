import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  Building2,
  MessageSquare,
  Settings,
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!user?.isAdmin) {
    navigate("/");
    return null;
  }

  const adminCards = [
    {
      title: "Manage Jobs",
      description: "Add, edit, or remove job postings",
      icon: Briefcase,
      href: "/admin/jobs",
      color: "text-blue-600",
    },
    {
      title: "Manage Startups",
      description: "Add, edit, or remove startup profiles",
      icon: Building2,
      href: "/admin/startups",
      color: "text-green-600",
    },
    {
      title: "Contact Messages",
      description: "View and manage contact form submissions",
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "text-purple-600",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      href: "/admin/users",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your society website content, users, and communications.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-muted`}>
                        <IconComponent className={`h-6 w-6 ${card.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {card.description}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => navigate(card.href)}
                    >
                      Manage
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">12</h3>
              <p className="text-muted-foreground">Total Jobs</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">8</h3>
              <p className="text-muted-foreground">Active Startups</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">25</h3>
              <p className="text-muted-foreground">Contact Messages</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">150</h3>
              <p className="text-muted-foreground">Registered Users</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default AdminDashboard;
