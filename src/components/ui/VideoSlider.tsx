"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { VIDEOS } from "@/content/videos";
import { UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

/**
 * Havadan saha görüntüleri — tam genişlik video slider.
 *
 * Kütüphane yok. Üç klip sırayla oynar: aktif klip sessiz başlar, bitince
 * kendiliğinden sıradakine geçer, son klipten başa döner. İleri/geri
 * düğmeleriyle ve klavyeyle elle de gezilir.
 *
 * VERİ DİSİPLİNİ — bu sitede en pahalı öğe bu.
 * Klip başına ~3 MB var ve ziyaretçilerin çoğu mobil. Bu yüzden aynı anda
 * yalnızca TEK <video> elemanı DOM'da durur: sıradakine geçildiğinde önceki
 * sökülür. Böylece tarayıcı üç klibi birden indirmeye kalkmıyor; ilk açılışta
 * yalnızca bir klip iniyor. Kapak karesi (WebP, ~200 KB) poster olarak
 * verildiği için video inerken de alan boş kalmıyor ve CLS oluşmuyor.
 *
 * ERİŞİLEBİLİRLİK
 * `prefers-reduced-motion` açıksa otomatik oynatma ve otomatik geçiş devre
 * dışı kalır; kapak karesi ve bir oynat düğmesi gösterilir. Otomatik oynatma
 * tarayıcı tarafından engellenirse de aynı düğmeye düşülür — sessiz kalan bir
 * kara kutu bırakılmaz.
 */
export function VideoSlider({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState(0);
  /** Otomatik oynatma gerçekten çalışıyor mu — engellenirse oynat düğmesi çıkar. */
  const [playing, setPlaying] = useState(false);
  /** Kullanıcının hareket tercihi; sunucuda bilinmez, ilk boyamadan sonra okunur. */
  const [reducedMotion, setReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const active = VIDEOS[index];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const step = useCallback((direction: 1 | -1) => {
    setPlaying(false);
    setIndex((current) => (current + direction + VIDEOS.length) % VIDEOS.length);
  }, []);

  /*
   * Klip değişince oynatmayı dene. Tarayıcı sessiz videoların otomatik
   * oynatılmasına genelde izin verir ama garanti değil; reddedilirse
   * `playing` false kalır ve oynat düğmesi görünür.
   *
   * Azaltılmış hareket tercihinde yalnızca "oynatma" demek yetmiyor:
   * `reducedMotion` sunucuda bilinemediği için ilk render'da false başlıyor
   * ve bu etki videoyu bir kez başlatıyor. Tercih okunduğunda çalışan
   * video AKTİF OLARAK duraklatılmalı — yoksa kullanıcı hareketi kapatmış
   * olmasına rağmen ekranda oynayan bir video kalıyor.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      /*
       * `setPlaying(false)` elle çağrılmıyor: pause() zaten `pause` olayını
       * tetikliyor ve durumu onPause işleyicisi güncelliyor. Etki gövdesinde
       * doğrudan setState çağırmak zincirleme render'a yol açardı.
       */
      video.pause();
      video.currentTime = 0;
      return;
    }

    let cancelled = false;
    video
      .play()
      .then(() => {
        if (!cancelled) setPlaying(true);
      })
      .catch(() => {
        if (!cancelled) setPlaying(false);
      });

    return () => {
      cancelled = true;
    };
  }, [index, reducedMotion]);

  const playManually = () => {
    videoRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  /*
   * Düğme yalnızca video gerçekten durduğunda görünür. `reducedMotion`
   * üzerinden ayrıca koşullamak yanlış olurdu: tercihi açık olan kullanıcı
   * düğmeye basıp videoyu başlattığında, oynayan görüntünün üstünde duran
   * bir oynat düğmesi kalırdı.
   */
  const showPlayButton = !playing;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={UI.videoSection[locale]}
      className="border-y border-zinc"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
    >
      <div className="relative aspect-3/2 w-full bg-paper-deep sm:aspect-16/9 lg:aspect-[2.4/1]">
        {/*
          key={active.file}: React her klipte yeni bir <video> kurar, eskisini
          söker. Aynı elemanın src'sini değiştirmek eski klibin arabelleğini
          bırakmıyordu.
        */}
        <video
          key={active.file}
          ref={videoRef}
          className="size-full object-cover"
          poster={`/videos/${active.file}.webp`}
          preload="metadata"
          muted
          playsInline
          controls={false}
          aria-label={active.alt[locale]}
          onEnded={() => {
            if (!reducedMotion) step(1);
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={`/videos/${active.file}.mp4`} type="video/mp4" />
        </video>

        {/* Ekran okuyucuya görüntünün metin karşılığı. */}
        <p className="sr-only">{active.alt[locale]}</p>

        {showPlayButton && (
          <button
            type="button"
            onClick={playManually}
            aria-label={UI.playVideo[locale]}
            className="absolute inset-0 grid place-items-center bg-ink/25 transition-colors hover:bg-ink/35"
          >
            <span className="brand-gradient grid size-16 place-items-center text-paper shadow-lg">
              {/* Oynat üçgeni — ikon setinde yok, tek yerde kullanılıyor. */}
              <svg viewBox="0 0 24 24" className="size-7 translate-x-0.5" aria-hidden>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}

        {/* Gezinme okları — plaka üzerinde, künye şeridiyle aynı hizada. */}
        <div className="absolute end-4 bottom-4 flex gap-2 md:end-6 md:bottom-6">
          <SliderButton
            onClick={() => step(-1)}
            label={UI.previous[locale]}
            rotate
          />
          <SliderButton onClick={() => step(1)} label={UI.next[locale]} />
        </div>
      </div>

      {/*
        Künye şeridi — plakanın altındaki mono satırın aynısı. Sıra numarası
        aynı zamanda gezinme göstergesi.
      */}
      <div className="mx-auto flex max-w-[84rem] flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 md:px-8">
        <span
          className="tabular shrink-0 font-mono text-xs font-medium text-brand"
          aria-live="polite"
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(VIDEOS.length).padStart(2, "0")}
        </span>
        <span className="label">{active.caption[locale]}</span>
      </div>
    </section>
  );
}

function SliderButton({
  onClick,
  label,
  rotate = false,
}: {
  onClick: () => void;
  label: string;
  rotate?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center border border-paper/50 bg-ink/45 text-paper backdrop-blur-sm transition-colors hover:bg-ink/70"
    >
      <ArrowRightIcon className={`rtl-flip size-5 ${rotate ? "rotate-180" : ""}`} />
    </button>
  );
}
