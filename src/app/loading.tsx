export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#ffe95d] text-[#131313]">
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
  );
}
