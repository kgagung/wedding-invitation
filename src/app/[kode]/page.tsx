"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function UndanganPage() {
  const params = useParams();
  const kode = params?.kode as string;
  const [tamu, setTamu] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [started, setStarted] = useState(false); // tombol sudah ditekan
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch tamu
  useEffect(() => {
    const getTamu = async () => {
      try {
        const res = await fetch(`/api/tamu/${kode}`);
        if (!res.ok) throw new Error("Tamu tidak ditemukan");

        const data = await res.json();
        setTamu(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (kode) getTamu();
  }, [kode]);

  // Play musik saat tombol ditekan
  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 1;
      audioRef.current.play().catch(console.error);
    }
  }, [started]);

  if (loading) return <p className="text-white">Memuat undangan...</p>;
  if (!tamu) return <p className="text-red-500">Tamu tidak ditemukan</p>;

  return (
    <>
      {/* Audio */}
      <audio
        ref={audioRef}
        src="/music/Nadin Amizah - Berpayung Tuhan (Official Music Video) - Nadin Amizah.mp3"
        loop
        muted
      />

      {/* Overlay full screen awal */}
      <div
        className={`fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50
          transition-opacity duration-1000
          ${started ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <h2 className="text-3xl font-bold mb-6">Undangan Pernikahan</h2>
        <p className="text-xl mb-4">Kepada Yth:</p>
        <p className="text-2xl font-semibold mb-8">{tamu.nama}</p>
        <button
          onClick={() => setStarted(true)}
          className="bg-pink-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-pink-700 transition"
        >
          Buka Undangan
        </button>
      </div>

      {/* Bunga animasi di sisi-sisi, muncul setelah tombol ditekan */}
      <div
        className={`fixed inset-0 pointer-events-none z-40
          transition-opacity duration-1500
          ${started ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* Contoh bunga animasi di tiap sisi */}
        <img
          src="/bunga-banyak.png"
          alt="bunga banyak"
          className="absolute top-0 left-0 w-40 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <img
          src="/bunga-biru.png"
          alt="bunga biru"
          className="absolute bottom-0 right-0 w-40 animate-bunga-muncul"
          style={{ animationDelay: "0.5s" }}
        />
        <img
          src="/bunga-kuning.png"
          alt="bunga kuning"
          className="absolute bottom-1/3 right-0 w-32 animate-float animate-bunga-muncul"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Konten utama undangan */}
      <main
        className={`flex flex-col items-center justify-center min-h-screen p-6 transition-opacity duration-1000
          ${started ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="p-6 rounded shadow w-full max-w-md relative z-10">
          <h1 className="text-2xl font-bold mb-2">Undangan Pernikahan</h1>
          <p className="mb-4">Kepada Yth:</p>
          <p className="text-lg font-semibold">{tamu.nama}</p>
          <p className="mb-6 text-sm">{tamu.alamat}</p>
        </div>
        <h2 className="text-4xl font-bold mt-8">The Wedding of</h2>
        <p className="mt-2 text-2xl">
          Erlina Elviana Istiqomah & Kuncoro Galih Agung
        </p>

        <div className="mt-4 text-center max-w-md">
          <p>Putri dari Bapak Ridwan Setyawan & Ibu Yuli Isruslina</p>
          <p>Putra dari Bapak Supriyanto & Ibu Srimiyem</p>
        </div>

        <div className="mt-6 max-w-md text-center">
          <p className="text-lg">Alamat Acara:</p>
          <p>Wongsomenggolo, Klaten</p>
        </div>
      </main>

      {/* Tambahkan CSS animasi */}
      <style jsx>{`
        @keyframes bungaMuncul {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-bunga-muncul {
          animation-name: bungaMuncul;
          animation-duration: 1s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
