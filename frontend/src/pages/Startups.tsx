import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Users, Calendar, Globe, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Startups = () => {
  const navigate = useNavigate();
  const startups = [
    {
      id: 1,
      name: "TechVenture Solutions",
      description: "AI-powered analytics platform for small businesses to optimize their operations and increase productivity through intelligent data insights.",
      logo: "/src/assets/logo.png",
      founders: ["Rajesh Kumar", "Priya Sharma"],
      status: "Incubated",
      website: "https://techventure.com",
      category: "Technology",
      yearFounded: 2023,
      funding: "₹50 Lakhs"
    },
    {
      id: 2,
      name: "EcoGreen Innovations",
      description: "Sustainable packaging solutions using biodegradable materials to reduce environmental impact while maintaining product quality.",
      logo: "/src/assets/logo.png",
      founders: ["Amit Singh", "Sneha Patel"],
      status: "Accelerated",
      website: "https://ecogreen.in",
      category: "Sustainability",
      yearFounded: 2022,
      funding: "₹75 Lakhs"
    },
    {
      id: 3,
      name: "HealthTech Pro",
      description: "Telemedicine platform connecting patients with healthcare providers for remote consultations and health monitoring.",
      logo: "/src/assets/logo.png",
      founders: ["Dr. Vikram Mehta", "Anita Gupta"],
      status: "Incubated",
      website: "https://healthtechpro.com",
      category: "Healthcare",
      yearFounded: 2023,
      funding: "₹30 Lakhs"
    },
    {
      id: 4,
      name: "EduLearn Platform",
      description: "Interactive online learning platform with personalized curriculum and AI-driven assessments for skill development.",
      logo: "/src/assets/logo.png",
      founders: ["Ravi Verma", "Kavya Reddy"],
      status: "Accelerated",
      website: "https://edulearn.edu",
      category: "Education",
      yearFounded: 2022,
      funding: "₹1.2 Crores"
    },
    {
      id: 5,
      name: "AgriTech Solutions",
      description: "IoT-based smart farming solutions helping farmers optimize crop yield through precision agriculture and data analytics.",
      logo: "/src/assets/logo.png",
      founders: ["Suresh Kumar", "Meera Joshi"],
      status: "Incubated",
      website: "https://agritech.in",
      category: "Agriculture",
      yearFounded: 2023,
      funding: "₹40 Lakhs"
    },
    {
      id: 6,
      name: "FinTech Innovations",
      description: "Digital payment solutions and financial services for underserved communities with focus on financial inclusion.",
      logo: "/src/assets/logo.png",
      founders: ["Arjun Patel", "Deepika Singh"],
      status: "Accelerated",
      website: "https://fintechinnov.com",
      category: "Finance",
      yearFounded: 2022,
      funding: "₹2 Crores"
    }
  ];

  const StartupCard = ({ startup }: { startup: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <img
                src={startup.logo}
                alt={startup.name}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-xl">{startup.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant={startup.status === "Accelerated" ? "default" : "secondary"}
                >
                  {startup.status}
                </Badge>
                <Badge variant="outline">{startup.category}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {startup.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span className="font-medium">Founders:</span>
            <span className="ml-1">{startup.founders.join(", ")}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Founded: {startup.yearFounded}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 mr-2" />
            <span>Funding: {startup.funding}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" size="sm" asChild>
            <a href={startup.website} target="_blank" rel="noopener noreferrer">
              <Globe className="h-4 w-4 mr-2" />
              Visit Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const incubatedStartups = startups.filter(startup => startup.status === "Incubated");
  const acceleratedStartups = startups.filter(startup => startup.status === "Accelerated");

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Startups</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover the innovative startups incubated and accelerated by CADEC. 
              These ventures represent the entrepreneurial spirit and innovation 
              that drives our community forward.
            </p>
          </div>
        </div>
      </section>

      {/* Startups Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all">All Startups</TabsTrigger>
              <TabsTrigger value="incubated">Incubated</TabsTrigger>
              <TabsTrigger value="accelerated">Accelerated</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Our Portfolio</h2>
                <p className="text-muted-foreground">
                  A diverse range of innovative startups nurtured through our programs.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {startups.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="incubated" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Incubated Startups</h2>
                <p className="text-muted-foreground">
                  Early-stage startups receiving mentorship and support through our incubation program.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {incubatedStartups.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accelerated" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Accelerated Startups</h2>
                <p className="text-muted-foreground">
                  Growth-stage startups receiving intensive support to scale their operations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {acceleratedStartups.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">6</h3>
              <p className="text-muted-foreground">Active Startups</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">₹5.2Cr</h3>
              <p className="text-muted-foreground">Total Funding Raised</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">15+</h3>
              <p className="text-muted-foreground">Founders Supported</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">3</h3>
              <p className="text-muted-foreground">Industries Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Startup Idea?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our incubation and acceleration programs to turn your innovative ideas 
            into successful businesses. Get mentorship, funding support, and access to 
            our entrepreneurial network.
          </p>
          <Button size="lg" onClick={() => navigate('/contact')}>
            Apply for Incubation
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Startups;
