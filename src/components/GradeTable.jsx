function gradeStyle(huruf) {
  if (["A", "A-"].includes(huruf)) return "bg-success-light text-success";
  if (["B+", "B", "B-"].includes(huruf)) return "bg-blue-light text-blue";
  if (["C+", "C", "C-"].includes(huruf)) return "bg-warning-light text-warning";
  return "bg-danger-light text-danger";
}

const tdClass = "py-2.5 px-3 border-b border-border text-[13px]";

// Props: data (Array), onEdit, onDelete
export default function GradeTable({ data, onEdit, onDelete }) {
  if (!data.length)
    return (
      <div className="bg-white border border-border rounded-xl p-10 text-center text-muted text-sm">
        Belum ada data. Tambahkan mata kuliah di form atas.
      </div>
    );

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50">
              {[
                "No",
                "Mata Kuliah",
                "SKS",
                "Nilai",
                "Huruf",
                "Mutu",
                "Bobot",
                "Aksi",
              ].map((h) => (
                <th
                  key={h}
                  className={`${tdClass} font-semibold text-[11px] text-muted uppercase tracking-wider text-left`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.id} className="hover:bg-slate-50 transition">
                <td className={`${tdClass} text-muted`}>{i + 1}</td>
                <td className={`${tdClass} font-medium`}>{d.nama}</td>
                <td className={tdClass}>{d.sks}</td>
                <td className={tdClass}>{d.nilai}</td>
                <td className={tdClass}>
                  <span
                    className={`${gradeStyle(d.huruf)} px-2.5 py-1 rounded-full text-xs font-semibold`}
                  >
                    {d.huruf}
                  </span>
                </td>
                <td className={tdClass}>{d.mutu.toFixed(1)}</td>
                <td className={tdClass}>{d.bobot.toFixed(2)}</td>
                <td className={tdClass}>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => onEdit(d)}
                      className="bg-warning-light text-warning py-1 px-2.5 rounded-md text-xs font-medium hover:brightness-95 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(d.id)}
                      className="bg-danger-light text-danger py-1 px-2.5 rounded-md text-xs font-medium hover:brightness-95 transition"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
