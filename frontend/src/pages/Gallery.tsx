import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Eye, Download } from "lucide-react";

const Gallery = () => {
  const events = [
    {
      id: 1,
      title: "Tech Innovation Workshop 2024",
      date: "March 15, 2024",
      category: "Workshop",
      images: [
        "/assets/event1.jpg",
        "/assets/hero-bg.jpg",
        "/assets/team-member.jpg",
        "/assets/event1.jpg",
        "/assets/hero-bg.jpg",
        "/assets/team-member.jpg"
      ]
    },
    {
      id: 2,
      title: "Cultural Fest 2024",
      date: "February 25, 2024",
      category: "Cultural",
      images: [
        "/src/assets/hero-bg.jpg",
        "/src/assets/event1.jpg",
        "/src/assets/team-member.jpg",
        "/src/assets/hero-bg.jpg"
      ]
    },
    {
      id: 3,
      title: "Leadership Summit",
      date: "January 18, 2024",
      category: "Conference",
      images: [
        "/src/assets/team-member.jpg",
        "/src/assets/event1.jpg",
        "/src/assets/hero-bg.jpg"
      ]
    }
  ];

  const achievements = [
    {
      title: "Excellence Award 2023",
      description: "Received from University of Delhi",
      image: "/src/assets/event1.jpg"
    },
    {
      title: "Innovation Challenge Winner",
      description: "Inter-college competition victory",
      image: "/src/assets/hero-bg.jpg"
    },
    {
      title: "Community Impact Award",
      description: "Recognition for social initiatives",
      image: "/src/assets/team-member.jpg"
    }
  ];

  const allImages = events.flatMap(event => 
    event.images.map(img => ({
      src: img,
      title: event.title,
      category: event.category,
      date: event.date
    }))
  );

  const ImageCard = ({ src, title, category, date }: any) => (
    <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={src}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Button size="sm" variant="secondary">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button size="sm" variant="secondary">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        <Badge className="absolute top-3 left-3" variant="secondary">
          {category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm truncate">{title}</h3>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Calendar className="h-3 w-3 mr-1" />
          {date}
        </div>
      </div>
    </Card>
  );

  const EventGallery = ({ event }: any) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
        <div className="flex items-center justify-center space-x-4 text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {event.date}
          </div>
          <Badge variant="outline">{event.category}</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {event.images.map((image: string, index: number) => (
          <ImageCard
            key={index}
            src={image}
            title={event.title}
            category={event.category}
            date={event.date}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Photo <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Capturing memorable moments from our events, workshops, and community activities. 
              Relive the excitement and energy of IGNITE PGDAV Hub.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All Photos</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allImages.map((image, index) => (
                  <ImageCard key={index} {...image} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-12">
              {events.map((event) => (
                <EventGallery key={event.id} event={event} />
              ))}
            </TabsContent>
            
            <TabsContent value="workshops" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allImages
                  .filter(img => img.category === "Workshop")
                  .map((image, index) => (
                    <ImageCard key={index} {...image} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="overflow-hidden">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </Card>
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
              <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
              <p className="text-muted-foreground">Photos Captured</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground">Events Documented</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">25+</h3>
              <p className="text-muted-foreground">Awards Displayed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">1000+</h3>
              <p className="text-muted-foreground">Memories Created</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Gallery;