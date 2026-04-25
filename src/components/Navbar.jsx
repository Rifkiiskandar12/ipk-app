import React from "react";

// Props yang diterima: ipk (angka IPK), total (jumlah MK)
export default function Navbar({ ipk, total }) {
  return (
    <nav className="bg-white border-b border-border px-6 h-14 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Sisi Kiri: Logo & Nama */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="font-semibold text-[15px]">Konversi Nilai</span>
        <span className="text-[11px] bg-primary-light text-primary px-2 py-0.5 rounded-full font-medium">
          Akademik
        </span>
      </div>
      {/* Sisi Kanan: Stats */}
      <div className="flex gap-4 text-[13px]">
        <span className="text-muted">
          Total MK: <b className="text-[#1a202c] font-bold">{total}</b>
        </span>
        <span className="text-muted">
          IPK:{" "}
          <b className="text-primary text-[15px] font-bold">{ipk.toFixed(2)}</b>
        </span>
      </div>
    </nav>
  );
}
