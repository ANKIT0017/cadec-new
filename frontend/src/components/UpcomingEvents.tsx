import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tech Innovation Workshop",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      image: "/assets/event1.jpg",
      category: "Workshop",
      attendees: 120,
      description: "Learn about the latest technologies and innovation trends in this hands-on workshop."
    },
    {
      id: 2,
      title: "Leadership Summit 2024",
      date: "March 22, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Conference Hall",
      image: "/assets/event1.jpg",
      category: "Conference",
      attendees: 200,
      description: "Join industry leaders and develop your leadership skills for the future."
    },
    {
      id: 3,
      title: "Cultural Fest Finale",
      date: "March 28, 2024",
      time: "6:00 PM - 10:00 PM",
      location: "College Ground",
      image: "/assets/event1.jpg",
      category: "Cultural",
      attendees: 500,
      description: "Celebrate diversity and talent in our grand cultural festival finale."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these exciting opportunities to learn, grow, and connect 
            with fellow students and industry professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <Badge 
                  className="absolute top-4 left-4"
                  variant={event.category === "Workshop" ? "default" : 
                           event.category === "Conference" ? "secondary" : "outline"}
                >
                  {event.category}
                </Badge>
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
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} attending
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/events">
            <Button variant="outline" size="lg">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
