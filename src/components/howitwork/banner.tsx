import Image from "next/image";

export default function Banner() {
  return (
    <section className=" px-55 py-10">
      <div
        className="
          relative w-full rounded-2xl 
          bg-linear-to-r from-[#FF5C2C] to-[#FF8A00]
          text-white overflow-hidden 
          flex flex-col md:flex-row items-center justify-between
          px-6 md:px-16 py-12
        "
      >
        {/* Left Image */}
        <div className="hidden md:block absolute left-0 bottom-0 translate-y-6 -translate-x-6 rotate-[-4deg] drop-shadow-xl">
          <Image
            src="/images/leftbanner.png"
            alt="Party Image Left"
            width={220}
            height={140}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Right Image */}
        <div className="hidden md:block absolute right-0 top-0 -translate-y-6 translate-x-6 rotate-[4deg] drop-shadow-xl">
          <Image
            src="/images/rightbanner.png"
            alt="Party Image Right"
            width={220}
            height={140}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Center Content */}
        <div className="text-center max-w-xl mx-auto relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Find Your Perfect Party Rental Today
          </h1>

          <p className="text-white/90 mb-6 leading-relaxed">
            Browse trusted providers, compare reviews and pricing, and book
            instantly. Enjoy safe setup, flexible delivery, and hassle-free
            pickup—so you can focus on the fun.
          </p>

          <button
            className="
              bg-white text-orange-600 font-medium
              px-6 py-2 rounded-full shadow-md
              hover:bg-gray-100 transition
            "
          >
            Browse Rentals
          </button>
        </div>

        {/* Gradient Waves Decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/images/wave.png"
            alt="Decoration Waves"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
