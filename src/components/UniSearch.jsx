import { useState, useEffect } from "react";

const inputClass =
  "w-full py-2 px-3 border border-border rounded-lg text-[13px] outline-none transition focus:border-primary";

export default function UniSearch() {
  const [query, setQuery] = useState("");
  const [semuaUniversitas, setSemuaUniversitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []); // Jalankan saat komponen mount

  // Async/Await + Fetch API + Error Handling
  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const responseAPI = await fetch(
        "http://universities.hipolabs.com/search?country=Indonesia",
      );
      if (!responseAPI.ok) throw new Error("Response gagal: " + responseAPI.status);
      const dataJson = await responseAPI.json();
      setSemuaUniversitas(dataJson.map((universitas) => ({ name: universitas.name, web: universitas.web_pages?.[0] || "" })));
    } catch {
      setError("Gagal memuat data. Periksa koneksi internet.");
    } finally {
      setLoading(false);
    }
  }

  const universitasTersaring = semuaUniversitas
    .filter((universitas) => universitas.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 6);

  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-sm">🏛️ Universitas Indonesia</p>
        <span className="text-[11px] bg-primary-light text-primary px-2 py-0.5 rounded-full">
          Fetch API
        </span>
      </div>
      {loading && (
        <div className="text-center py-4 text-muted text-[13px] animate-pulse">
          ⏳ Memuat data universitas...
        </div>
      )}
      {error && (
        <div className="bg-danger-light text-danger py-2 px-3 rounded-lg text-[13px] mb-2.5">
          {error}{" "}
          <button
            onClick={fetchData}
            className="ml-2 underline text-danger cursor-pointer text-[13px] bg-transparent border-none"
          >
            Coba lagi
          </button>
        </div>
      )}
      {!loading && !error && (
        <>
          <input
            className={`${inputClass} mb-2.5`}
            placeholder={`Cari dari ${semuaUniversitas.length} universitas...`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="max-h-[180px] overflow-y-auto pr-1">
            {universitasTersaring.map((universitas, index) => (
              <div
                key={index}
                className="py-[7px] border-b border-border text-[13px] last:border-0"
              >
                <div className="font-medium">{universitas.name}</div>
                {universitas.web && (
                  <a
                    href={universitas.web}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-primary hover:underline"
                  >
                    {universitas.web}
                  </a>
                )}
              </div>
            ))}
            {!universitasTersaring.length && (
              <div className="text-muted text-[13px] py-2">
                Tidak ditemukan.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
