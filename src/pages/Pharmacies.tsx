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
    if (editId) {
      await pharmacyAPI.update(editId, form);
    } else {
      await pharmacyAPI.create(form);
    }
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dorixonalar</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setForm(empty);
            setEditId(null);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          + Yangi dorixona
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editId ? "Dorixonani tahrirlash" : "Yangi dorixona qo'shish"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg"
            >
              {editId ? "Saqlash" : "Qo'shish"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {/* Jadval */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm text-gray-500">
                Nomi
              </th>
              <th className="text-left px-6 py-3 text-sm text-gray-500">
                Manzil
              </th>
              <th className="text-left px-6 py-3 text-sm text-gray-500">
                Telefon
              </th>
              <th className="text-left px-6 py-3 text-sm text-gray-500">
                Ish vaqti
              </th>
              <th className="text-left px-6 py-3 text-sm text-gray-500">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pharmacies.map((ph) => (
              <tr key={ph._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{ph.name}</td>
                <td className="px-6 py-4">{ph.address}</td>
                <td className="px-6 py-4">{ph.phone}</td>
                <td className="px-6 py-4">{ph.workingHours}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(ph)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleDelete(ph._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pharmacies;
