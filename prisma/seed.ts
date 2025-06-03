import prisma from "../src/lib/db";
import { generateKodeUndangan } from "../src/utils/generateCode";

async function main() {
  const kode = generateKodeUndangan();

  await prisma.tamu.create({
    data: {
      nama: "John Doe",
      alamat: "Jl. Merpati No. 123",
      kode: kode,
      hadir: false,
      pesan: "",
    },
  });

  console.log(`Tamu berhasil dibuat dengan kode: ${kode}`);
}

main()
  .then(() => {
    console.log("✅ Done seeding");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
