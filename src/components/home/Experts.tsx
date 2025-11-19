import ExpertsCarousel from "../reusable/ExpertCarousel";


export default function Experts() {
  return (
    <div className="w-full mx-auto py-12 px-4 md:px-8 relative bg-[#FFFBF7]">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Expert Service{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 italic font-serif">
            Providers
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Connect with our top-rated professionals who consistently deliver
          exceptional results
        </p>
      </div>
      <ExpertsCarousel/>
    </div>
  );
}