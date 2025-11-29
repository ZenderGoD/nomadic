export default function Showreel() {
  return (
    <section className="relative w-full bg-transparent py-8 px-4 sm:px-6 md:px-8">
      <div className="relative w-full max-w-7xl mx-auto" style={{ aspectRatio: '16/9' }}>
        <video
          className="w-full h-full object-cover rounded-2xl overflow-hidden border border-transparent dark:border-[#fbbf24]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Showreel 25 3 (1).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}

