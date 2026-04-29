"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const choices = [
  {
    id: "semantic",
    text: "Semantic networks with only deterministic links",
  },
  {
    id: "bayes",
    text: "Bayesian networks for probabilistic reasoning",
  },
  {
    id: "rules",
    text: "Pure IF-THEN rule base with no uncertainty model",
  },
  {
    id: "frames",
    text: "Frames storing static object slots only",
  },
];

export default function Home() {
  const memeRef = useRef<HTMLVideoElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!selected) return;
    setSubmitted(true);
    requestAnimationFrame(() => {
      const meme = memeRef.current;
      if (!meme) return;
      void meme.play().catch(() => undefined);
      if (document.fullscreenElement) return;
      if (meme.requestFullscreen) {
        void meme.requestFullscreen().catch(() => undefined);
        return;
      }
      const iosVideo = meme as HTMLVideoElement & {
        webkitEnterFullscreen?: () => void;
      };
      iosVideo.webkitEnterFullscreen?.();
    });
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <video
          ref={memeRef}
          className="h-full w-full bg-black object-contain"
          src="/meme.mp4"
          autoPlay
          playsInline
          disablePictureInPicture
          disableRemotePlayback
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff8ea] text-[#131313]">
      <div
        className={`fixed inset-0 z-40 flex min-h-screen items-center justify-center overflow-hidden bg-[#ffe95d] text-[#131313] transition-opacity duration-500 ${
          loadingScreen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.2)_1px,transparent_0)] [background-size:18px_18px]" />
        <div className="loading-fade relative rounded-3xl border-4 border-black bg-white px-8 py-10 text-center shadow-[8px_8px_0px_#111]">
          <p className="text-xs font-black tracking-[0.22em] sm:text-sm loading-fade-delay">
            COMIC QUIZ DROP
          </p>
          <p className="mt-3 text-3xl font-black sm:text-4xl loading-fade">
            LOADING...
          </p>
        </div>
      </div>

      <div
        className={`relative transition-opacity duration-500 ${
          loadingScreen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.16)_1px,transparent_0)] [background-size:18px_18px]" />
        <div className="pointer-events-none absolute -left-28 top-20 h-52 w-52 rounded-full border-4 border-black bg-[#ffe95d]" />
        <div className="pointer-events-none absolute -right-20 bottom-16 h-48 w-48 rotate-12 rounded-2xl border-4 border-black bg-[#7ef8ff]" />

        <main className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
          <section className="rounded-3xl border-4 border-black bg-[#ff5fd2] p-5 shadow-[8px_8px_0px_#111] sm:p-8">
            <p className="mb-3 inline-block -rotate-3 rounded-full border-2 border-black bg-[#fff8ea] px-4 py-1 text-xs font-black tracking-[0.2em] sm:text-sm">
              SCAN. TAP. QUIZ.
            </p>
            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              Comic Quiz Drop
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold sm:text-base">
              You scanned the QR and landed in the vibe zone. One punchy
              question only, all about Knowledge Representation in AI.
            </p>
          </section>

          <section className="loading-fade rounded-3xl border-4 border-black bg-white p-4 shadow-[8px_8px_0px_#111] sm:p-7">
            <p className="loading-fade-delay mb-4 inline-block rounded-full border-2 border-black bg-[#ffe95d] px-3 py-1 text-xs font-black tracking-wider sm:text-sm">
              QUESTION 01
            </p>
            <h2 className="loading-fade text-xl font-black leading-snug sm:text-2xl">
              In Knowledge Representation for AI, which method is best suited
              for representing uncertain knowledge?
            </h2>

            <form
              className="loading-fade-delay mt-6 space-y-3"
              onSubmit={handleSubmit}
            >
              {choices.map((choice) => {
                const active = selected === choice.id;
                return (
                  <label
                    key={choice.id}
                    className={`loading-fade flex cursor-pointer items-start gap-3 rounded-2xl border-[3px] px-4 py-3 text-sm font-semibold transition sm:text-base ${
                      active
                        ? "border-black bg-[#7ef8ff]"
                        : "border-black/70 bg-[#fffaf3]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="kr-question"
                      className="mt-1 h-4 w-4 accent-black"
                      checked={active}
                      onChange={() => setSelected(choice.id)}
                      disabled={submitted}
                    />
                    <span>{choice.text}</span>
                  </label>
                );
              })}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={!selected || submitted}
                  className="loading-fade rounded-full border-[3px] border-black bg-[#3cff71] px-5 py-3 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_#111] transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-[6px_6px_0px_#111] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Check answer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setSubmitted(false);
                  }}
                  className="loading-fade-delay rounded-full border-[3px] border-black bg-[#fff] px-5 py-3 text-sm font-black uppercase tracking-wider"
                >
                  Reset
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
