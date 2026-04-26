import { useState } from "react";
import Navbar from "./components/Navbar";
import GradeForm from "./components/GradeForm";
import GradeTable from "./components/GradeTable";
import UniSearch from "./components/UniSearch";
import { MataKuliah } from "./models/MataKuliah";

const STORAGE_KEY = "ipk_app_data";

function loadFromStorage() {
  try {
    const dataTersimpan = localStorage.getItem(STORAGE_KEY);
    if (!dataTersimpan) return [];
    return JSON.parse(dataTersimpan).map(
      (mataKuliah) => new MataKuliah(mataKuliah.id, mataKuliah.nama, mataKuliah.sks, mataKuliah.nilai),
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [daftarMataKuliah, setDaftarMataKuliah] = useState(loadFromStorage);
  const [dataEdit, setDataEdit] = useState(null);
  let nextId = daftarMataKuliah.reduce((maxId, mataKuliah) => Math.max(maxId, mataKuliah.id), 0) + 1;

  function saveData(daftarBaru) {
    setDaftarMataKuliah(daftarBaru);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarBaru));
  }

  // CREATE + UPDATE
  function handleSubmit({ nama, sks, nilai }) {
    if (dataEdit) {
      saveData(
        daftarMataKuliah.map((mataKuliah) =>
          mataKuliah.id === dataEdit.id ? new MataKuliah(mataKuliah.id, nama, sks, nilai) : mataKuliah,
        ),
      );
      setDataEdit(null);
    } else {
      saveData([...daftarMataKuliah, new MataKuliah(nextId++, nama, sks, nilai)]);
    }
  }

  // DELETE
  function handleDelete(id) {
    if (window.confirm("Hapus mata kuliah ini?"))
      saveData(daftarMataKuliah.filter((mataKuliah) => mataKuliah.id !== id));
  }

  const ipk = MataKuliah.hitungIPK(daftarMataKuliah);
  const totalSKS = daftarMataKuliah.reduce((totalSementara, mataKuliah) => totalSementara + mataKuliah.sks, 0);

  return (
    <div>
      <Navbar ipk={ipk} total={daftarMataKuliah.length} />
      <div className="max-w-[960px] mx-auto py-5 px-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { label: "Total MK", val: daftarMataKuliah.length, color: "text-primary" },
            { label: "IPK", val: ipk.toFixed(2), color: "text-success" },
            { label: "Total SKS", val: totalSKS, color: "text-warning" },
          ].map((statistik) => (
            <div
              key={statistik.label}
              className="bg-white border border-border rounded-xl p-4 text-center"
            >
              <div className={`text-[26px] font-semibold ${statistik.color}`}>
                {statistik.val}
              </div>
              <div className="text-xs text-muted mt-0.5">{statistik.label}</div>
            </div>
          ))}
        </div>

        {/* Form + UniSearch */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <GradeForm
            onSubmit={handleSubmit}
            editData={dataEdit}
            onCancel={() => setDataEdit(null)}
          />
          <UniSearch />
        </div>

        {/* Tabel */}
        <GradeTable daftarMataKuliah={daftarMataKuliah} onEdit={setDataEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
