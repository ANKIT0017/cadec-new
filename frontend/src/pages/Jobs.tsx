import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, ExternalLink, Search, Building2, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp Solutions",
      location: "Delhi, India",
      type: "Full-time",
      experienceLevel: "2-4 years",
      description: "We are looking for a skilled software engineer to join our development team. You will work on cutting-edge projects using modern technologies.",
      requirements: ["React.js", "Node.js", "MongoDB", "AWS"],
      applyLink: "https://techcorp.com/careers",
      companyLogo: "/assets/logo.png",
      postedDate: "2024-03-15",
      salary: "₹8-12 LPA"
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "Digital Marketing Pro",
      location: "Remote",
      type: "Internship",
      experienceLevel: "0-1 years",
      description: "Join our marketing team as an intern and learn digital marketing strategies, social media management, and content creation.",
      requirements: ["Social Media", "Content Writing", "Analytics"],
      applyLink: "https://digitalmarketingpro.com/internships",
      companyLogo: "/assets/logo.png",
      postedDate: "2024-03-14",
      salary: "₹15,000/month"
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Analytics Hub",
      location: "Mumbai, India",
      type: "Full-time",
      experienceLevel: "1-3 years",
      description: "Analyze large datasets to provide insights and recommendations. Work with stakeholders to understand business requirements.",
      requirements: ["Python", "SQL", "Tableau", "Statistics"],
      applyLink: "https://analyticshub.com/jobs",
      companyLogo: "/assets/logo.png",
      postedDate: "2024-03-13",
      salary: "₹6-10 LPA"
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Bangalore, India",
      type: "Part-time",
      experienceLevel: "2-5 years",
      description: "Create beautiful and functional user interfaces. Work closely with product managers and developers to deliver exceptional user experiences.",
      requirements: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      applyLink: "https://designstudio.com/careers",
      companyLogo: "/assets/logo.png",
      postedDate: "2024-03-12",
      salary: "₹5-8 LPA"
    },
    {
      id: 5,
      title: "Business Development Associate",
      company: "Growth Ventures",
      location: "Delhi, India",
      type: "Full-time",
      experienceLevel: "1-2 years",
      description: "Drive business growth through client acquisition and relationship management. Identify new business opportunities and partnerships.",
      requirements: ["Sales", "Communication", "CRM", "Market Research"],
      applyLink: "https://growthventures.com/jobs",
      companyLogo: "/assets/logo.png",
      postedDate: "2024-03-11",
      salary: "₹4-7 LPA"
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Remote",
      type: "Full-time",
      experienceLevel: "3-5 years",
      description: "Manage cloud infrastructure and deployment pipelines. Ensure high availability and performance of our applications.",
      requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      applyLink: "https://cloudtech.com/careers",
      companyLogo: "/assets/logo.png",
      postedDate: "2024-03-10",
      salary: "₹10-15 LPA"
    }
  ];

  const handleApply = (job: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to apply for this job.",
        variant: "destructive",
      });
      return;
    }
    // Open the apply link
    window.open(job.applyLink, '_blank', 'noopener,noreferrer');
  };

  const JobCard = ({ job }: { job: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <p className="text-primary font-medium">{job.company}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline">{job.type}</Badge>
                <Badge variant="secondary">{job.experienceLevel}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Posted {job.postedDate}</p>
            <p className="font-semibold text-primary">{job.salary}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {job.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {job.type}
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Skills Required:</p>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleApply(job)}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const fullTimeJobs = jobs.filter(job => job.type === "Full-time");
  const partTimeJobs = jobs.filter(job => job.type === "Part-time");
  const internshipJobs = jobs.filter(job => job.type === "Internship");

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Job <span className="text-primary">Opportunities</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover exciting career opportunities from our partner companies. 
              Find your next role in technology, marketing, design, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="fulltime">Full-time</TabsTrigger>
              <TabsTrigger value="parttime">Part-time</TabsTrigger>
              <TabsTrigger value="internship">Internships</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Available Positions</h2>
                <p className="text-muted-foreground">
                  Browse through our curated list of job opportunities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="fulltime" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Full-time Positions</h2>
                <p className="text-muted-foreground">
                  Permanent positions with competitive benefits and growth opportunities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fullTimeJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="parttime" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Part-time Positions</h2>
                <p className="text-muted-foreground">
                  Flexible work arrangements for students and working professionals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partTimeJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="internship" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Internship Opportunities</h2>
                <p className="text-muted-foreground">
                  Gain valuable experience and build your professional network.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {internshipJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
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
              <p className="text-muted-foreground">Active Jobs</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">15+</h3>
              <p className="text-muted-foreground">Partner Companies</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">3</h3>
              <p className="text-muted-foreground">Job Categories</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground">Applications Received</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for Talent?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Partner with us to reach our talented community of students and alumni. 
            Post your job openings and connect with qualified candidates.
          </p>
          <Button size="lg" onClick={() => navigate('/contact')}>
            Post a Job
            <Briefcase className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Jobs;
