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

  useEffect(() => { fetchMedicines(); }, []);

  const handleSubmit = async () => {
    if (editId) {
      await medicineAPI.update(editId, form);
    } else {
      await medicineAPI.create(form);
    }
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dorilar</h2>
        <button
          onClick={() => { setShowForm(true); setForm(empty); setEditId(null); }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          + Yangi dori
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editId ? "Dorini tahrirlash" : "Yangi dori qo'shish"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Nomi", key: "name" },
              { label: "Narxi (so'm)", key: "price" },
              { label: "Rasm URL", key: "image" },
              { label: "Miqdor", key: "stock" },
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
            <div>
              <label className="text-sm text-gray-600">Kategoriya</label>
              <select
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tavsif</label>
              <input
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
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
              <th className="text-left px-6 py-3 text-sm text-gray-500">Nomi</th>
              <th className="text-left px-6 py-3 text-sm text-gray-500">Narxi</th>
              <th className="text-left px-6 py-3 text-sm text-gray-500">Kategoriya</th>
              <th className="text-left px-6 py-3 text-sm text-gray-500">Miqdor</th>
              <th className="text-left px-6 py-3 text-sm text-gray-500">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {medicines.map((med) => (
              <tr key={med._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{med.name}</td>
                <td className="px-6 py-4">{med.price.toLocaleString()} so'm</td>
                <td className="px-6 py-4">
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm">
                    {med.category}
                  </span>
                </td>
                <td className="px-6 py-4">{med.stock} ta</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(med)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleDelete(med._id)}
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

export default Medicines;