import { useEffect, useState } from "react";
import { medicineAPI } from "../api/api";

const CATEGORIES = ["Tabletka", "Krem", "Vitamin", "Jihozlar", "Kardiologiya"];

const empty = {
  name: "",
  price: "",
  image: "",
  stock: "",
  description: "",
  category: "Tabletka",
};

const Medicines = () => {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMedicines = async () => {
    const res = await medicineAPI.getAll();
    setMedicines(res.data.data.medicines);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleSubmit = async () => {
    if (editId) await medicineAPI.update(editId, form);
    else await medicineAPI.create(form);
    setForm(empty);
    setEditId(null);
    setShowForm(false);
    fetchMedicines();
  };

  const handleEdit = (med: any) => {
    setForm({
      name: med.name,
      price: med.price,
      image: med.image,
      stock: med.stock,
      description: med.description,
      category: med.category,
    });
    setEditId(med._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("O'chirishni tasdiqlaysizmi?")) {
      await medicineAPI.delete(id);
      fetchMedicines();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Dorilar</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setForm(empty);
            setEditId(null);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base"
        >
          + Yangi dori
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editId ? "Dorini tahrirlash" : "Yangi dori qo'shish"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Nomi", key: "name" },
              { label: "Narxi (so'm)", key: "price" },
              { label: "Rasm URL", key: "image" },
              { label: "Miqdor", key: "stock" },
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
            <div>
              <label className="text-sm text-gray-600">Kategoriya</label>
              <select
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tavsif</label>
              <input
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
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
              {["Nomi", "Narxi", "Kategoriya", "Miqdor", "Amallar"].map((h) => (
                <th
                  key={h}
                  className="text-left px-6 py-3 text-sm text-gray-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {medicines.map((med) => (
              <tr key={med._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-sm">{med.name}</td>
                <td className="px-6 py-4 text-sm">
                  {med.price.toLocaleString()} so'm
                </td>
                <td className="px-6 py-4">
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                    {med.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{med.stock} ta</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(med)}
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
                    onClick={() => handleDelete(med._id)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobil — karta ko'rinishi */}
      <div className="sm:hidden space-y-3">
        {medicines.map((med) => (
          <div key={med._id} className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-gray-800">{med.name}</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">
                {med.category}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                💰{" "}
                <span className="font-medium text-gray-800">
                  {med.price.toLocaleString()} so'm
                </span>
              </p>
              <p>
                📦 Miqdor:{" "}
                <span className="font-medium text-gray-800">
                  {med.stock} ta
                </span>
              </p>
              {med.description && <p>📝 {med.description}</p>}
            </div>
            <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleEdit(med)}
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
                onClick={() => handleDelete(med._id)}
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

export default Medicines;
