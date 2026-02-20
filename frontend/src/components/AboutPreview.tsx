import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Heart, Lightbulb } from "lucide-react";

const AboutPreview = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Striving for the highest standards in everything we do.",
    },
    {
      icon: Heart,
      title: "Community",
      description: "Building strong connections and fostering collaboration.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing creativity and new ideas to drive progress.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About CADEC <span className="text-primary">PGDAV </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              CADEC PGDAV is a dynamic student organization dedicated to
              fostering innovation, leadership, and academic excellence within
              the PGDAV College community. We believe in empowering students to
              reach their full potential through engaging activities, workshops,
              and collaborative projects.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our mission is to create an inclusive environment where every
              student can thrive, learn, and contribute to making a positive
              impact in their academic journey and beyond.
            </p>
            <Button className="group">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Values Grid */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6">
                <CardContent className="flex items-start space-x-4 p-0">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
