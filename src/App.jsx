import { useState } from "react";
import Navbar from "./components/Navbar";
import GradeForm from "./components/GradeForm";
import GradeTable from "./components/GradeTable";
import UniSearch from "./components/UniSearch";
import { MataKuliah } from "./models/MataKuliah";

const STORAGE_KEY = "ipk_app_data";

// Memuat data awal dari localStorage
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map(
      (d) => new MataKuliah(d.id, d.nama, d.sks, d.nilai),
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [data, setData] = useState(loadFromStorage);
  const [editData, setEditData] = useState(null);
  let nextId = data.reduce((max, d) => Math.max(max, d.id), 0) + 1;

  function saveData(newList) {
    setData(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  }

  // CREATE + UPDATE
  function handleSubmit({ nama, sks, nilai }) {
    if (editData) {
      saveData(
        data.map((d) =>
          d.id === editData.id ? new MataKuliah(d.id, nama, sks, nilai) : d,
        ),
      );
      setEditData(null);
    } else {
      saveData([...data, new MataKuliah(nextId++, nama, sks, nilai)]);
    }
  }

  // DELETE
  function handleDelete(id) {
    if (window.confirm("Hapus mata kuliah ini?"))
      saveData(data.filter((d) => d.id !== id));
  }

  const ipk = MataKuliah.hitungIPK(data);
  const totalSKS = data.reduce((sum, d) => sum + d.sks, 0);

  return (
    <div>
      <Navbar ipk={ipk} total={data.length} />
      <div className="max-w-[960px] mx-auto py-5 px-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { label: "Total MK", val: data.length, color: "text-primary" },
            { label: "IPK", val: ipk.toFixed(2), color: "text-success" },
            { label: "Total SKS", val: totalSKS, color: "text-warning" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-border rounded-xl p-4 text-center"
            >
              <div className={`text-[26px] font-semibold ${s.color}`}>
                {s.val}
              </div>
              <div className="text-xs text-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form + UniSearch */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <GradeForm
            onSubmit={handleSubmit}
            editData={editData}
            onCancel={() => setEditData(null)}
          />
          <UniSearch />
        </div>

        {/* Tabel */}
        <GradeTable data={data} onEdit={setEditData} onDelete={handleDelete} />
      </div>
    </div>
  );
}
