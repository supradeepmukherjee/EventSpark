import { Link } from "react-router-dom";
import Card, { CardContent } from "../components/ui/Card";
import { MapPin, Mail, Music, Utensils, Image, Lightbulb } from "lucide-react";

const services = [
  {
    icon: <MapPin />,
    title: "Venue Selection",
    path: "/venue-selection",
  },
  {
    icon: <Mail />,
    title: "Invitation Card",
    path: "/invitation-card",
  },
  {
    icon: <Music />,
    title: "Entertainment",
    path: "/entertainment",
  },
  {
    icon: <Utensils />,
    title: "Food and Drinks",
    path: "/food-and-drinks",
  },
  {
    icon: <Image />,
    title: "Decoration",
    path: "/decoration",
  },
  {
    icon: <Lightbulb />,
    title: "Lighting",
    path: "/lighting",
  },
];

const OurService = () => {
  return (
    <section className="py-8 px-[9%] bg-[#1e1e1e] min-h-screen text-center">
      <h1 className="text-3xl font-bold text-white mb-6">
        OUR <span className="text-blue-500">SERVICE</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link key={index} to={service.path}>
            <Card>
              <CardContent>
                <div className="flex flex-col items-center space-y-3">
                  <div className="bg-blue-600 p-4 rounded-full text-white text-3xl">
                    {service.icon}
                  </div>
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                  <p className="text-sm text-gray-400">
                    Click to explore our {service.title} services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OurService;
