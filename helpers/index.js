// const a = 2;
// const b = 5;
// const c = 9;
const a = 3;
const b = 6;
const c = 10;
//Fungsi Keanggotaan
const baik = (x) => {
  if (x <= a || x >= c) return 0;
  if (a <= x && x <= b) return (x - a) / (b - a);
  if (b <= x && x <= c) return (c - x) / (c - b);
};

const sedang = (x) => {
  if (x <= a) return 0;
  if (a <= x && x <= b) return (x - a) / (b - a);
  if (x >= b) return 1;
};

const kurang = (x) => {
  if (x <= a) return 1;
  if (x >= b) return 0;
  if (a <= x && x <= b) return (b - x) / (b - a);
};

const ipks = (x) => {
  if (x <= 3) return 1;
  if (x >= 4) return 0;
  if (3 <= x && x <= 4) return (4 - x) / (4 - 3);
};

//implikasi fuzzy
const impikasiFuzzy = (data) => {
  const pendidikan = data.pendidikan == "S2" ? 6 : 8;
  const r1 = Math.min(
    ...[
      baik(pendidikan),
      baik(data.karyaIlmiah),
      baik(data.keahlian),
      ipks(data.ipk),
      baik(data.berinteraksi),
      baik(data.mengajar),
    ]
  );
  const r2 = Math.min(
    ...[sedang(pendidikan), baik(data.psikologi), baik(data.mengajar)]
  );
  const r3 = Math.min(
    ...[sedang(data.kesehatan), kurang(data.psikologi), baik(data.kompetensi)]
  );
  const r4 = Math.min(...[kurang(data.berinteraksi), sedang(data.sertifikat)]);
  const r5 = Math.min(
    ...[
      kurang(data.kompetensi),
      kurang(data.mengajar),
      kurang(data.berinteraksi),
    ]
  );

  const z1 = r1 * 2;
  const z2 = r2 * 2;
  const z3 = r3 * 2 + 2.1;
  const z4 = r4 * 2 + 4;
  const z5 = r5 * 2 + 6;
  const rz = r1 * z1 + r2 * z2 + r3 * z3 + r4 * z4 + r5 * z5;
  const sumR = r1 + r2 + r3 + r4 + r5;

  //defuzifikasi
  let defuzifikasi = rz / sumR;
  defuzifikasi = defuzifikasi ? defuzifikasi : 0;

  const rank =
    defuzifikasi < 2
      ? "A"
      : defuzifikasi >= 2 && defuzifikasi < 3
      ? "B"
      : defuzifikasi >= 3 && defuzifikasi < 6
      ? "C"
      : "D";

  return { defuzifikasi: defuzifikasi.toFixed(2), rank };
};

module.exports = impikasiFuzzy;
