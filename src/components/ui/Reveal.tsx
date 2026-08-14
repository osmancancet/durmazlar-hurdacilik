"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Kaydırma ile beliren sarmalayıcı — kütüphane yok, tek IntersectionObserver.
 * `prefers-reduced-motion` durumunda animasyon CSS tarafında devre dışı kalır.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Saniye cinsinden gecikme; ızgaralarda sıralı beliriş için. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // bir kez belirir, tekrar gizlenmez
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
