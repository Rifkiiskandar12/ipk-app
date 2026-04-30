// OOP JavaScript - Class, Constructor, Method
export class MataKuliah {
  // CONSTRUCTOR: dijalankan setiap kali `new MataKuliah(...)` dipanggil
  constructor(id, kode, nama, sks, nilai) {
    this.id = id;
    this.kode = kode;
    this.nama = nama;
    this.sks = parseInt(sks);
    this.nilai = parseFloat(nilai);
    this.huruf = this.toHuruf();
    this.mutu = this.toMutu();
    this.bobot = parseFloat((this.mutu * this.sks).toFixed(2));
  }

  toHuruf() {
    const n = this.nilai;
    if (n >= 85) return "A";
    if (n >= 80) return "A-";
    if (n >= 75) return "B+";
    if (n >= 70) return "B";
    if (n >= 65) return "B-";
    if (n >= 60) return "C";
    if (n >= 50) return "D";
    return "E";
  }

  // METHOD 2: Konversi huruf → angka mutu (A=4, B=3, dst)
  toMutu() {
    const map = {
      A: 4,
      "A-": 3.7,
      "B+": 3.3,
      B: 3,
      "B-": 2.7,
      C: 2,
      D: 1,
      E: 0,
    };
    return map[this.huruf] ?? 0;
  }

  static hitungIPK(daftarMataKuliah) {
    const totalSKS = daftarMataKuliah.reduce(
      (totalSementara, mataKuliah) => totalSementara + mataKuliah.sks,
      0,
    );
    if (!totalSKS) return 0;
    return parseFloat(
      (
        daftarMataKuliah.reduce(
          (totalBobotSementara, mataKuliah) =>
            totalBobotSementara + mataKuliah.bobot,
          0,
        ) / totalSKS
      ).toFixed(2),
    );
  }
}
