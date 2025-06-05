"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import clsx from "clsx";

type Tamu = {
  id: number;
  nama: string;
  kode: string;
  alamat: string;
  hadir: boolean;
};

const sections = [
  {
    id: "section-1",
    title: "Cuplikan Ayat Al-Qur'an",
    content:
      '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup..." (QS. Ar-Rum: 21)',
    flower: "/bunga-biru.png",
  },
  {
    id: "section-2",
    title: "Salam Pengantar",
    content:
      "Assalamu’alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan kami.",
    flower: "/bunga-kuning.png",
  },
  {
    id: "section-3",
    title: "Nama Mempelai",
    content:
      "Erlina Elviana Istiqomah & Kuncoro Galih Agung. Putri dan putra dari keluarga besar kami.",
    flower: "/bunga-banyak.png",
  },
  {
    id: "section-4",
    title: "Lokasi dan Waktu",
    content:
      "Wongsomenggolo, Klaten. Minggu, 16 November 2025 pukul 09.00 WIB.",
    flower: "/bunga-biru.png",
  },
  {
    id: "section-5",
    title: "Galeri Prewedding",
    content: "",
    gallery: ["/foto1.jpg", "/foto2.jpg", "/foto3.jpg"],
    flower: "/bunga-kuning.png",
  },
];

export default function UndanganPage() {
  const params = useParams();
  const kode = params?.kode as string;
  const [tamu, setTamu] = useState<Tamu | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

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

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      const index = sections.findIndex((_, i) => {
        const el = document.getElementById(sections[i].id);
        return el && scrollPos < el.offsetTop + el.offsetHeight;
      });
      setCurrentSection(index === -1 ? sections.length - 1 : index);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <audio
        ref={audioRef}
        src="/music/Nadin Amizah - Berpayung Tuhan (Official Music Video) - Nadin Amizah.mp3"
        loop
        muted
      />

      {/* Overlay awal dengan background bunga penuh */}
      <div
        className={clsx(
          "fixed inset-0 bg-green-50 bg-opacity-95 flex flex-col items-center justify-center z-50 transition-opacity duration-1000",
          started ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/bunga-biru.png"
            alt="Background bunga"
            fill
            className="object-cover"
          />
        </div>
        <div className="z-10 text-center">
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
      </div>

      {/* Bunga sisi-sisi setelah dibuka */}
      <div className="relative overflow-x-hidden">
        {/* Floating flowers per section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sections[currentSection].flower}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1 }}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
          >
            <Image
              src={sections[currentSection].flower}
              alt="bunga"
              width={250}
              height={250}
              className="absolute top-5 left-5 animate-float"
            />
            <Image
              src={sections[currentSection].flower}
              alt="bunga"
              width={200}
              height={200}
              className="absolute bottom-5 right-5 animate-float"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Konten utama undangan */}
      <main className="relative z-10">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-24"
          >
            <h2 className="text-4xl font-bold mb-6">{section.title}</h2>
            <p className="text-lg max-w-2xl">{section.content}</p>

            {section.gallery && (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {section.gallery.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`Galeri ${i + 1}`}
                    width={200}
                    height={200}
                    className="rounded-lg shadow"
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Style tambahan */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
