import { useState, useEffect, useContext } from "react";
import { fetchAdminSettings, updateAdminSettings } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";

const Settings = () => {
  const [settings, setSettings] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchAdminSettings(user.token)
      .then(setSettings)
      .catch((err) => console.error("Error fetching settings:", err));
  }, [user.token]);

  const handleUpdate = () => {
    updateAdminSettings(settings, user.token).then(() => {
      alert("Settings updated successfully!");
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">Admin Settings</h2>
      <label className="block mb-3 text-white">
        Site Title:
        <input
          type="text"
          value={settings.siteTitle || ""}
          onChange={(e) =>
            setSettings({ ...settings, siteTitle: e.target.value })
          }
          className="block w-full p-2 border rounded text-white"
        />
      </label>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
