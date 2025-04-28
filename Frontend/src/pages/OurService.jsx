import { Link } from "react-router-dom";
import Card, { CardContent } from "../components/ui/Card";
import { MapPin, Mail, Music, Utensils, Image, Lightbulb } from "lucide-react";

const services = [
  { icon: <MapPin />, title: "Venue Selection", path: "/venue-selection" },
  { icon: <Mail />, title: "Invitation Card", path: "/invitation-card" },
  { icon: <Music />, title: "Entertainment", path: "/entertainment" },
  { icon: <Utensils />, title: "Food and Drinks", path: "/food-and-drinks" },
  { icon: <Image />, title: "Decoration", path: "/decoration" },
  { icon: <Lightbulb />, title: "Lighting", path: "/lighting" },
];

const OurService = () => {
  return (
    <section className="py-16 px-[9%] bg-[#1e1e1e] min-h-screen text-center text-white">
      <h1 className="text-4xl font-bold mb-10">
        OUR <span className="text-blue-500">SERVICES</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <Link key={index} to={service.path} className="group">
            <Card className="bg-[#2a2a2a] rounded-2xl shadow-md hover:shadow-2xl hover:bg-gradient-to-br from-blue-600 to-indigo-700 transition-all duration-500 transform hover:-translate-y-3">
              <CardContent className="flex flex-col items-center p-8 space-y-5">
                <div className="bg-blue-600 p-4 rounded-full text-white text-4xl group-hover:scale-110 group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-semibold group-hover:text-white transition-all duration-300">
                  {service.title}
                </h2>
                <p className="text-gray-400 text-sm group-hover:text-gray-200">
                  Click to explore our {service.title} services.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OurService;
