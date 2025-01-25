import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateEvent from "./pages/CreateEvent";
import BrowseEvents from "./pages/BrowseEvents.jsx";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/browse-events" element={<BrowseEvents />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
