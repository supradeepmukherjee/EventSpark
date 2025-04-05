import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

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

    const { music, games, play, extras, } = formData

    if (!(music && games && play)) return toast.error('Please fill in all the required fields')

    setLoading(true);
    setMessage("");

    toast.info('Submitting. Please Wait')
    try {
      console.log(formData)
      const { data } = await axios.post(import.meta.env.VITE_SERVER + "/entertainment",
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
      console.log(data)
      toast.dismiss()
      if (data?.success) toast.success('Details Submitted Successfully')
      else {
        if (data?.msg) toast.error(data?.msg)
      }

      setMessage("Entertainment preferences submitted successfully!");
      setFormData({ music: "", games: "", play: "", extras: "" });
    } catch (error) {
      setMessage(error.message);
      toast.dismiss()
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const f = async () => {
      const { data } = await axios.get(import.meta.env.VITE_SERVER + "/event/by-account", { withCredentials: true })
      setFormData({ ...formData, event: data?.event })
    }
    f()
  }, [])

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
      <ToastContainer />
    </div>
  );
};

export default EntertainmentForm;
