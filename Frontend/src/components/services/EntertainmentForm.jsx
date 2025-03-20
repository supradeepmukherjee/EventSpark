import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EntertainmentForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    music: "",
    games: "",
    play: "",
    extras: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to fill Entertainment Form.");
      navigate("/sign-in");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/entertainment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, event: id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form. Try again later.");
      }

      setMessage("Entertainment preferences submitted successfully!");
      setFormData({ music: "", games: "", play: "", extras: "" });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-center text-2xl font-bold text-orange-600 mb-4">
        Entertainment Selection Form
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mt-4">
          Preferred Music Genre:
        </label>
        <input
          type="text"
          name="music"
          placeholder="e.g. Jazz, Rock, Pop"
          value={formData.music}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />

        <label className="block font-semibold mt-4">
          Games and Activities:
        </label>
        <input
          type="text"
          name="games"
          placeholder="e.g. Board Games, Trivia, Arcade"
          value={formData.games}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />

        <label className="block font-semibold mt-4">
          Live Performances/Shows:
        </label>
        <input
          type="text"
          name="play"
          placeholder="e.g. Comedy Show, Magic Show"
          value={formData.play}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md"
        />

        <label className="block font-semibold mt-4">Additional Requests:</label>
        <textarea
          name="extras"
          placeholder="Any other entertainment preferences"
          value={formData.extras}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md h-24"
        />

        <button
          type="submit"
          className="w-full mt-6 p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EntertainmentForm;
