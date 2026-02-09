import ExpertsCarousel from "../reusable/ExpertCarousel";


export default function Experts() {
  return (
    <div className="w-full mx-auto py-12 px-4 md:px-8 relative bg-[#FFFBF7]">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4 font-[glory]">
          Expert Service{' '}
          <span className="text-transparent bg-clip-text bg-red-500 italic font-[glory] font-semibold">
            Providers
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto font-[inter]">
          Connect with our top-rated professionals who consistently deliver
          exceptional results
        </p>
      </div>
      <ExpertsCarousel/>
    </div>
  );
}