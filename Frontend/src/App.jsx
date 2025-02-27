import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OurService from "./pages/OurService";
import AboutUs from "./pages/AboutUs";
import { Gallery } from "./pages/Gallery.jsx";
import { Pricing } from "./pages/Pricing.jsx";
import { ContactUs } from "./pages/ContactUs.jsx";
import Reviews from "./pages/Review";
import { Footer } from "./components/Footer.jsx";

import VenueSelectionForm from "./components/services/VenueSelectionForm";
import InvitationCardForm from "./components/services/InvitationCardForm";
import EntertainmentForm from "./components/services/EntertainmentForm";
import FoodAndDrinkForm from "./components/services/FoodAndDrinkForm";
import DecorationForm from "./components/services/DecorationForm";
import LightingForm from "./components/services/LightingForm";

import CreateEvent from "./pages/CreateEvent";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp.jsx";
import Status from "./pages/EventStatus.jsx";
import NotFound from "./pages/NotFound"; // For 404 handling

// ✅ Layout component (Header will be shown on all pages)
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <Routes>
      {/* Main pages with the Header */}
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
            <OurService />
            <AboutUs />
            <Gallery />
            <Pricing />
            <Reviews />
            <ContactUs />
            <Footer />
          </Layout>
        }
      />
      <Route
        path="/service"
        element={
          <Layout>
            <OurService />
          </Layout>
        }
      />
      <Route
        path="/about-us"
        element={
          <Layout>
            <AboutUs />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactUs />
          </Layout>
        }
      />
      <Route
        path="/create-event"
        element={
          <Layout>
            <CreateEvent />
          </Layout>
        }
      />
      <Route
        path="/gallery"
        element={
          <Layout>
            <Gallery />
          </Layout>
        }
      />
      <Route
        path="/pricing"
        element={
          <Layout>
            <Pricing />
          </Layout>
        }
      />
      <Route
        path="/reviews"
        element={
          <Layout>
            <Reviews />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />

      <Route
        path="/sign-up"
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      />
      <Route
        path="/status"
        element={
          <Layout>
            <Status />
          </Layout>
        }
      />

      {/* Service Pages (No Header needed) */}
      <Route path="/venue-selection" element={<VenueSelectionForm />} />
      <Route path="/invitation-card" element={<InvitationCardForm />} />
      <Route path="/entertainment" element={<EntertainmentForm />} />
      <Route path="/food-and-drinks" element={<FoodAndDrinkForm />} />
      <Route path="/decoration" element={<DecorationForm />} />
      <Route path="/lighting" element={<LightingForm />} />

      {/* 404 Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
