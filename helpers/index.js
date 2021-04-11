// const a = 2;
// const b = 5;
// const c = 9;
const a = 3;
const b = 6;
const c = 10;
//Fungsi Keanggotaan
const ipks = (x) => {
  if (x <= 3) {
    const string = `${x} \\leq 3 = 1`;
    const data = 1;
    return { string, data };
  }
  if (x >= 4) {
    const string = `${x} \\geq 4 =0`;
    const data = 0;
    return { string, data };
  }
  if (3 <= x && x <= 4) {
    const string = `3 \\leq ${x} \\leq 4 = {4 - ${x} \\over 4 - 3}`;
    const data = (4 - x) / (4 - 3);
    return { string, data };
  }
};

const anggotaPrint = (x) => {
  const leq = "\\leq";
  const geq = "\\geq";
  const baik = (x) => {
    if (x <= a || x >= c) {
      const string = `${a} ${geq} ${x} ${geq} ${b} = 0`;
      const data = 0;
      return { string, data };
    }
    if (a <= x && x <= b) {
      const string = `${a} ${leq} ${x} ${leq} ${b} = {${x} - ${a} \\over ${b} - ${a}}`;
      const data = +((x - a) / (b - a)).toFixed(3);
      return { string, data };
    }
    if (b <= x && x <= c) {
      const string = `${b} ${leq} ${x} ${leq} ${c} = {${c} - ${x} \\over ${c} - ${b}}`;
      const data = +((c - x) / (c - b)).toFixed(3);
      return { string, data };
    }
  };

  const sedang = (x) => {
    if (x <= a) {
      const string = ` ${x} ${geq} ${a} = 0 `;
      const data = 0;
      return { string, data };
    }
    if (a <= x && x <= b) {
      const string = ` ${a} ${leq} ${x} ${leq} ${b} = {${x} - ${a} \\over ${b} - ${a}}`;
      const data = +((x - a) / (b - a)).toFixed(3);
      return { string, data };
    }
    if (x >= b) {
      const string = `${x} ${geq} ${b} = 1 `;
      const data = 1;
      return { string, data };
    }
  };

  const kurang = (x) => {
    if (x <= a) {
      const string = `${x} ${leq} ${a} ${geq} ${c} = 1`;
      const data = 1;
      return { string, data };
    }
    if (x >= b) {
      const string = ` ${x} ${geq} ${b} = 0`;
      const data = 0;
      return { string, data };
    }
    if (a <= x && x <= b) {
      const string = `${a} ${leq} ${x} ${leq} ${b} = {${b} - ${x} \\over ${b} - ${a}}`;
      const data = +((b - x) / (b - a)).toFixed(3);
      return { string, data };
    }
  };

  return { baik: baik(x), sedang: sedang(x), kurang: kurang(x) };
};

//implikasi fuzzy
const impikasiFuzzy = (data) => {
  const pendidikans = data.pendidikan == "S2" ? 6 : 8;
  const pendidikan = anggotaPrint(pendidikans);
  const mengajar = anggotaPrint(data.mengajar);
  const karyaIlmiah = anggotaPrint(data.karyaIlmiah);
  const ipk = ipks(data.ipk);
  const keahlian = anggotaPrint(data.keahlian);
  const sertifikat = anggotaPrint(data.sertifikat);
  const psikologi = anggotaPrint(data.psikologi);
  const kompetensi = anggotaPrint(data.kompetensi);
  const kesehatan = anggotaPrint(data.kesehatan);
  const berinteraksi = anggotaPrint(data.berinteraksi);

  const r1 = Math.min(
    ...[
      pendidikan.baik.data,
      karyaIlmiah.baik.data,
      keahlian.baik.data,
      ipk.data,
      berinteraksi.baik.data,
      mengajar.baik.data,
    ]
  );

  const r2 = Math.min(
    ...[pendidikan.sedang.data, psikologi.baik.data, mengajar.baik.data]
  );
  const r3 = Math.min(
    ...[kesehatan.sedang.data, psikologi.kurang.data, kompetensi.baik.data]
  );
  const r4 = Math.min(...[berinteraksi.kurang.data, sertifikat.sedang.data]);
  const r5 = Math.min(
    ...[kompetensi.kurang.data, mengajar.kurang.data, berinteraksi.kurang.data]
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

  const string = `\\[Z = {(${r1} * ${z1}) + (${r2} * ${z2}) + (${r3} * ${z3}) +( ${r4} * ${z4}) + (${r5} * ${z5}) \\over ${r1} + ${r2} + ${r3} + ${r4} + ${r5}} = ${defuzifikasi.toFixed(
    2
  )}\\]`;
  const r = { r1, r2, r3, r4, r5 };
  const z = { z1, z2, z3, z4, z5 };
  const datas = {
    pendidikan,
    mengajar,
    karyaIlmiah,
    ipk,
    keahlian,
    sertifikat,
    psikologi,
    kompetensi,
    kesehatan,
    berinteraksi,
  };
  return { datas, r, z, string, defuzifikasi: defuzifikasi.toFixed(2), rank };
};

module.exports = impikasiFuzzy;
