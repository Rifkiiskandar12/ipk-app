import { useState } from "react";

const inputClass =
  "w-full py-2 px-3 border border-border rounded-lg text-sm outline-none bg-white mt-1 focus:border-primary transition block";
const labelClass = "text-xs font-medium text-muted mb-1 block";

// Props: onSubmit, editData (null atau object MataKuliah), onCancel
export default function GradeForm({ onSubmit, editData, onCancel }) {
  // Inisialisasi state langsung dari props (tidak perlu useEffect)
  const [kode, setKode] = useState(editData?.kode ?? "");
  const [nama, setNama] = useState(editData?.nama ?? "");
  const [sks, setSks] = useState(editData ? String(editData.sks) : "3");
  const [nilai, setNilai] = useState(editData ? String(editData.nilai) : "");

  function handleSubmit() {
    if (!kode.trim() || !nama.trim() || !nilai || nilai < 0 || nilai > 100)
      return alert("Lengkapi semua field! (Nilai: 0 - 100)");
    onSubmit({ kode: kode.trim(), nama: nama.trim(), sks, nilai: parseFloat(nilai) });
    setKode("");
    setNama("");
    setSks("3");
    setNilai("");
  }

  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <p className="font-semibold mb-3.5 text-sm">
        {editData ? "✏️ Edit Mata Kuliah" : "➕ Tambah Mata Kuliah"}
      </p>
      {/* Input Kode */}
      <div className="mb-2.5">
        <label className={labelClass}>Kode Mata Kuliah</label>
        <input
          className={inputClass}
          placeholder="cth: IF1234"
          value={kode}
          onChange={(event) => setKode(event.target.value)}
        />
      </div>
      {/* Input Nama */}
      <div className="mb-2.5">
        <label className={labelClass}>Nama Mata Kuliah</label>
        <input
          className={inputClass}
          placeholder="cth: Algoritma & Pemrograman"
          value={nama}
          onChange={(event) => setNama(event.target.value)}
        />
      </div>
      {/* Input SKS & Nilai */}
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        <div>
          <label className={labelClass}>SKS</label>
          <select
            className={inputClass}
            value={sks}
            onChange={(event) => setSks(event.target.value)}
          >
            {[1, 2, 3, 4, 6].map((nilaiSks) => (
              <option key={nilaiSks} value={nilaiSks}>
                {nilaiSks} SKS
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Nilai (0 - 100)</label>
          <input
            className={inputClass}
            type="number"
            min="0"
            max="100"
            step="0.01"
            placeholder="cth: 85"
            value={nilai}
            onChange={(event) => setNilai(event.target.value)}
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
