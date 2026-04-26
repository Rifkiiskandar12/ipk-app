// OOP JavaScript - Class, Constructor, Method
export class MataKuliah {
  // CONSTRUCTOR: dijalankan setiap kali `new MataKuliah(...)` dipanggil
  constructor(id, nama, sks, nilai) {
    this.id = id;
    this.nama = nama;
    this.sks = parseInt(sks);
    this.nilai = parseFloat(nilai);
    this.huruf = this.toHuruf();
    this.mutu = this.toMutu();
    this.bobot = parseFloat((this.mutu * this.sks).toFixed(2));
  }

  toHuruf() {
    const n = this.nilai;
    if (n >= 4.0) return "A";
    if (n >= 3.75) return "A-";
    if (n >= 3.5) return "B+";
    if (n >= 3.0) return "B";
    if (n >= 2.5) return "B-";
    if (n >= 2.0) return "C";
    if (n >= 1.0) return "D";
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

  static hitungIPK(list) {
    const totalSKS = list.reduce((sum, d) => sum + d.sks, 0);
    if (!totalSKS) return 0;
    return parseFloat(
      (list.reduce((s, d) => s + d.bobot, 0) / totalSKS).toFixed(2),
    );
  }
}
