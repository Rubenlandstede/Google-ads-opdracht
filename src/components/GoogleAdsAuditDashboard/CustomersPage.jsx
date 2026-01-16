import { useState } from "react";
import { addCustomer } from "../../firestoreFunctions";


function CustomersPage() {
  const months = [
    "januari", "februari", "maart", "april",
    "mei", "juni", "juli", "augustus",
    "september", "oktober", "november", "december"
  ];

  const [formData, setFormData] = useState({
    year: 2026,
    month: "januari",
    name: "",
    email: "",
    phone: "",
    company: "",
    pdfurl: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCustomer(formData);
      alert("Klant succesvol opgeslagen!");

      setFormData({
        year: 2026,
        month: "januari",
        name: "",
        email: "",
        phone: "",
        company: ""
      });
    } catch (error) {
      console.error(error);
      alert("Er ging iets mis bij het opslaan");
    }
  };

  return (
    <div className="dashboard-container min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="dashboard-title text-3xl font-bold text-gray-800 text-center mb-6">
          Nieuwe klant toevoegen
        </h1>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAxRz12LQZcG32COgwPqxc8aLMcBZWYgW_gw&s"
          alt="Logo"
          className="w-32 h-auto mx-auto mb-8 rounded-lg shadow-lg"
        />

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-10 backdrop-blur-sm bg-opacity-95">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >

            {/* Jaar */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Jaar
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm bg-gray-50
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
                           transition-all duration-200 hover:shadow-md"
              />
            </div>

            {/* Maand */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Maand
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm bg-gray-50
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
                           transition-all duration-200 hover:shadow-md"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Naam */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Naam
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm bg-gray-50
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
                           transition-all duration-200 hover:shadow-md"
              />
            </div>

            {/* E-mail */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm bg-gray-50
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
                           transition-all duration-200 hover:shadow-md"
              />
            </div>

            {/* Telefoon */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Telefoon
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm bg-gray-50
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
                           transition-all duration-200 hover:shadow-md"
              />
            </div>

            {/* Bedrijf */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Bedrijf
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm bg-gray-50
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
                           transition-all duration-200 hover:shadow-md"
              />
            </div>

            {/* PDF URL */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              PDF URL
            </label>
            <input
              type="url"
              name="pdfUrl"
              value={formData.pdfUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="rounded-xl border border-gray-300 px-5 py-3 text-sm bg-gray-50
                        focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
                        transition-all duration-200 hover:shadow-md"
            />
          </div>


            {/* Button */}
           <div className="md:col-span-2 flex justify-end pt-6">
  <button
    type="submit"
    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
               text-white font-semibold px-8 py-4 rounded-xl shadow-lg
               transition-all duration-300 transform hover:scale-105 hover:shadow-xl
               focus:outline-none focus:ring-4 focus:ring-blue-300"
  >
    Klant opslaan
  </button>
</div>


          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;


