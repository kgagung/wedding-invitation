-- CreateTable
CREATE TABLE "Tamu" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "hadir" BOOLEAN NOT NULL DEFAULT false,
    "pesan" TEXT,

    CONSTRAINT "Tamu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tamu_kode_key" ON "Tamu"("kode");
