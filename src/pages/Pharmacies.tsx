import { useEffect, useState } from "react";
import { pharmacyAPI } from "../api/api";

const empty = {
  name: "",
  address: "",
  phone: "",
  workingHours: "",
  latitude: "",
  longitude: "",
};

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPharmacies = async () => {
    const res = await pharmacyAPI.getAll();
    setPharmacies(res.data.data.pharmacies);
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const handleSubmit = async () => {
    if (editId) await pharmacyAPI.update(editId, form);
    else await pharmacyAPI.create(form);
    setForm(empty);
    setEditId(null);
    setShowForm(false);
    fetchPharmacies();
  };

  const handleEdit = (ph: any) => {
    setForm({
      name: ph.name,
      address: ph.address,
      phone: ph.phone,
      workingHours: ph.workingHours,
      latitude: ph.latitude || "",
      longitude: ph.longitude || "",
    });
    setEditId(ph._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("O'chirishni tasdiqlaysizmi?")) {
      await pharmacyAPI.delete(id);
      fetchPharmacies();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Dorixonalar
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setForm(empty);
            setEditId(null);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base"
        >
          + Yangi dorixona
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editId ? "Dorixonani tahrirlash" : "Yangi dorixona qo'shish"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Nomi", key: "name" },
              { label: "Manzil", key: "address" },
              { label: "Telefon", key: "phone" },
              { label: "Ish vaqti (mas: 08:00-22:00)", key: "workingHours" },
              { label: "Latitude (mas: 41.2995)", key: "latitude" },
              { label: "Longitude (mas: 69.2401)", key: "longitude" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg text-sm"
            >
              {editId ? "Saqlash" : "Qo'shish"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg text-sm"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {/* Katta ekran — jadval */}
      <div className="hidden sm:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              {["Nomi", "Manzil", "Telefon", "Ish vaqti", "Amallar"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-sm text-gray-500"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pharmacies.map((ph) => (
              <tr key={ph._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-sm">{ph.name}</td>
                <td className="px-6 py-4 text-sm">{ph.address}</td>
                <td className="px-6 py-4 text-sm">{ph.phone}</td>
                <td className="px-6 py-4 text-sm">{ph.workingHours}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(ph)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-sm font-medium"
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Tahrirlash
                  </button>

                  <button
                    onClick={() => handleDelete(ph._id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition text-sm font-medium"
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobil — karta ko'rinishi */}
      <div className="sm:hidden space-y-3">
        {pharmacies.map((ph) => (
          <div key={ph._id} className="bg-white rounded-xl shadow p-4">
            <p className="font-semibold text-gray-800 mb-2">{ph.name}</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📍 {ph.address}</p>
              <p>📞 {ph.phone}</p>
              <p>🕐 {ph.workingHours}</p>
            </div>
            <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleEdit(ph)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-sm font-medium"
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Tahrirlash
              </button>

              <button
                onClick={() => handleDelete(ph._id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition text-sm font-medium"
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pharmacies;
