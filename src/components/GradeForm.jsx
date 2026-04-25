import React, { useState, useEffect } from "react";

const inputClass =
  "w-full py-2 px-3 border border-border rounded-lg text-sm outline-none bg-white mt-1 focus:border-primary transition block";
const labelClass = "text-xs font-medium text-muted mb-1 block";

// Props: onSubmit, editData (null atau object MataKuliah), onCancel
export default function GradeForm({ onSubmit, editData, onCancel }) {
  const [nama, setNama] = useState("");
  const [sks, setSks] = useState("3");
  const [nilai, setNilai] = useState("");

  // useEffect: Mengisi form saat mode EDIT (editData berubah)
  useEffect(() => {
    if (editData) {
      setNama(editData.nama);
      setSks(String(editData.sks));
      setNilai(String(editData.nilai));
    } else {
      setNama("");
      setSks("3");
      setNilai("");
    }
  }, [editData]);

  function handleSubmit() {
    if (!nama.trim() || !nilai || nilai < 0 || nilai > 4)
      return alert("Lengkapi semua field! (Nilai: 0.00 - 4.00)");
    onSubmit({ nama: nama.trim(), sks, nilai: parseFloat(nilai) });
    setNama("");
    setSks("3");
    setNilai("");
  }

  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <p className="font-semibold mb-3.5 text-sm">
        {editData ? "✏️ Edit Mata Kuliah" : "➕ Tambah Mata Kuliah"}
      </p>
      {/* Input Nama */}
      <div className="mb-2.5">
        <label className={labelClass}>Nama Mata Kuliah</label>
        <input
          className={inputClass}
          placeholder="cth: Algoritma & Pemrograman"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      {/* Input SKS & Nilai */}
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        <div>
          <label className={labelClass}>SKS</label>
          <select
            className={inputClass}
            value={sks}
            onChange={(e) => setSks(e.target.value)}
          >
            {[1, 2, 3, 4, 6].map((v) => (
              <option key={v} value={v}>
                {v} SKS
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Nilai (0.00 - 4.00)</label>
          <input
            className={inputClass}
            type="number"
            min="0"
            max="4"
            step="0.01"
            placeholder="cth: 3.5"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
          />
        </div>
      </div>
      {/* Tombol Aksi */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className="bg-primary text-white py-2 px-[18px] rounded-lg text-[13px] font-medium hover:bg-primary-dark transition"
        >
          {editData ? "Update" : "Simpan"}
        </button>
        {editData && (
          <button
            onClick={onCancel}
            className="bg-slate-100 border border-border py-2 px-[14px] rounded-lg text-[13px] hover:bg-slate-200 transition"
          >
            Batal
          </button>
        )}
      </div>
    </div>
  );
}
