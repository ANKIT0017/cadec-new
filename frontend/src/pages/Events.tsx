import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, ExternalLink, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [userRegistrations, setUserRegistrations] = useState<Set<string>>(new Set());
  const upcomingEvents = [
    {
      id: "68f4d74eb9cbb77c831c8cdd",
      title: "BizBlitz 2.0 - B-Plan Competition",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "CADEC Innovation Lab",
      image: "/assets/event1.jpg",
      category: "Competition",
      attendees: 150,
      description: "Showcase your innovative business ideas and compete for cash prizes worth ₹15,000. Open to all students with entrepreneurial spirit.",
      price: "Free",
      status: "Open",
      questions: [
        {
          id: "q1",
          question: "What is your team name?",
          type: "text",
          required: true,
          placeholder: "Enter your team name"
        },
        {
          id: "q2",
          question: "How many team members do you have?",
          type: "select",
          required: true,
          options: ["1", "2", "3", "4", "5+"]
        },
        {
          id: "q3",
          question: "What is your business idea about?",
          type: "textarea",
          required: true,
          placeholder: "Describe your business idea in 2-3 sentences"
        },
        {
          id: "q4",
          question: "What is your experience level?",
          type: "radio",
          required: true,
          options: ["Beginner", "Intermediate", "Advanced"]
        },
        {
          id: "q5",
          question: "What are your expectations from this competition?",
          type: "checkbox",
          required: false,
          options: ["Networking", "Mentorship", "Prize Money", "Learning", "Exposure"]
        }
      ]
    },
    {
      id: "68f4d74eb9cbb77c831c8ce3",
      title: "Startup Mentorship Workshop",
      date: "March 22, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      image: "/assets/event1.jpg",
      category: "Workshop",
      attendees: 100,
      description: "Learn from successful entrepreneurs and industry experts about building and scaling your startup venture.",
      price: "Free",
      status: "Open",
      questions: [
        {
          id: "q1",
          question: "What is your current startup stage?",
          type: "select",
          required: true,
          options: ["Idea Stage", "MVP Development", "Early Traction", "Scaling", "Not Started Yet"]
        },
        {
          id: "q2",
          question: "What specific areas do you need mentorship in?",
          type: "checkbox",
          required: true,
          options: ["Business Strategy", "Marketing", "Finance", "Technology", "Legal", "Operations"]
        },
        {
          id: "q3",
          question: "Describe your startup idea briefly",
          type: "textarea",
          required: true,
          placeholder: "Tell us about your startup in 2-3 sentences"
        }
      ]
    },
    {
      id: "68f4d74eb9cbb77c831c8ce4",
      title: "CADEC Annual Magazine Launch",
      date: "March 28, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Conference Hall",
      image: "/assets/event1.jpg",
      category: "Launch",
      attendees: 200,
      description: "Celebrate the launch of CADEC's second annual magazine featuring student success stories and entrepreneurial insights.",
      price: "Free",
      status: "Filling Fast",
      questions: [
        {
          id: "q1",
          question: "Are you interested in contributing to future magazines?",
          type: "radio",
          required: true,
          options: ["Yes", "No", "Maybe"]
        },
        {
          id: "q2",
          question: "What type of content interests you most?",
          type: "checkbox",
          required: false,
          options: ["Success Stories", "Technical Articles", "Industry Insights", "Student Experiences", "Startup Spotlights"]
        }
      ]
    }
  ];

  // Handle event registration
  const handleRegister = (event: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to register for this event.",
        variant: "destructive",
      });
      return;
    }

    if (userRegistrations.has(event.id.toString())) {
      toast({
        title: "Already Registered",
        description: "You have already registered for this event.",
        variant: "destructive",
      });
      return;
    }

    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const handleRegistrationSuccess = () => {
    if (selectedEvent) {
      setUserRegistrations(prev => new Set([...prev, selectedEvent.id.toString()]));
    }
    setShowRegistrationForm(false);
    setSelectedEvent(null);
  };

  const pastEvents = [
    {
      id: 4,
      title: "BizBlitz 1.0 - B-Plan Competition",
      date: "December 15, 2023",
      location: "Main Auditorium",
      category: "Competition",
      attendees: 120,
      description: "First edition of our B-Plan competition with cash prizes worth ₹10,000. Featured guest speaker Shri Manoj Kumar Bhatt, Founder & CEO of SuMark Global."
    },
    {
      id: 5,
      title: "University of Delhi Centenary Valedictory",
      date: "November 20, 2023",
      location: "University of Delhi",
      category: "Exhibition",
      attendees: 500,
      description: "CADEC members showcased innovative projects at the valedictory ceremony, covered by NDTV news channel."
    },
    {
      id: 6,
      title: "World Food India Participation",
      date: "November 15, 2023",
      location: "Pragati Maidan, Delhi",
      category: "Exhibition",
      attendees: 50,
      description: "Participated in World Food India on invitation by University of Delhi and Ministry of Food Processing Industries, Govt. of India."
    },
    {
      id: 7,
      title: "Diwali Stall and Sale",
      date: "November 10, 2023",
      location: "College Campus & Janpath",
      category: "Sale",
      attendees: 200,
      description: "ShriJi Gavya and Marketing Department organized Diwali stall showcasing and selling their products."
    }
  ];

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={event.image || "/assets/event1.jpg"}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <Badge 
          className="absolute top-4 left-4"
          variant={event.category === "Workshop" ? "default" : 
                   event.category === "Conference" ? "secondary" : 
                   event.category === "Technical" ? "outline" : "default"}
        >
          {event.category}
        </Badge>
        {event.status && (
          <Badge 
            className="absolute top-4 right-4"
            variant={event.status === "Open" ? "default" : 
                     event.status === "Filling Fast" ? "destructive" : "secondary"}
          >
            {event.status}
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl">{event.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {event.date}
          </div>
          {event.time && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              {event.time}
            </div>
          )}
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {event.attendees} {isPast ? "attended" : "attending"}
          </div>
        </div>
        
        {event.price && (
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{event.price}</span>
          </div>
        )}
        
        {!isPast && (
          <div className="space-y-2">
            {userRegistrations.has(event.id.toString()) ? (
              <Button className="w-full mt-4" disabled>
                <UserCheck className="mr-2 h-4 w-4" />
                Registered
              </Button>
            ) : (
              <Button 
                className="w-full mt-4" 
                onClick={() => handleRegister(event)}
              >
                Register Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CADEC <span className="text-primary">Events</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover entrepreneurial opportunities, workshops, and competitions 
              designed to nurture innovation and business excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Don't Miss Out!</h2>
                <p className="text-muted-foreground">
                  Register for these exciting upcoming events and secure your spot.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Our Journey</h2>
                <p className="text-muted-foreground">
                  Relive the memories from our successful past events and celebrations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast={true} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Organize an Event?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have an idea for an event or workshop? We'd love to hear from you! 
            Join us in creating amazing experiences for our community.
          </p>
          <Button size="lg" onClick={() => navigate('/contact')}>
            Propose an Event
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
      
      {/* Registration Form Modal */}
      {showRegistrationForm && selectedEvent && (
        <EventRegistrationForm
          eventId={selectedEvent.id.toString()}
          questions={selectedEvent.questions || []}
          onClose={() => {
            setShowRegistrationForm(false);
            setSelectedEvent(null);
          }}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  );
};

export default Events;
