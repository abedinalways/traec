const steps = [
  {
    id: 1,
    title: "location & contact",
    desc: "Where is your event?",
  },
  {
    id: 2,
    title: "Event Details",
    desc: "Tell us about your event",
  },
  {
    id: 3,
    title: "Date & Time",
    desc: "When the event is?",
  },
  {
    id: 4,
    title: "Questionnaire",
    desc: "What do you prefer?",
  },
  {
    id: 5,
    title: "Add-ons",
    desc: "Enhance your booking",
  },
  {
    id: 6,
    title: "Review",
    desc: "Confirm your booking",
  },
];

const BookingSidebar = () => {
  return (
    <div className="space-y-5 border border-[#dfe1e7] rounded-xl p-5 pr-14 h-fit">
      <h1 className="capitalize font-inter font-medium text-base leading-6 tracking-[0.01em] text-black">
        booking progress
      </h1>

      <div className="flex flex-col gap-5">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            <div className="s_gra_bg size-9 rounded-full p-0.5">
              <div className="bg-white rounded-full flex items-center justify-center size-full">
                <p className="font-inter font-medium text-base leading-6 s_gra_text tracking-[0.01em]">
                  {step.id}
                </p>
              </div>
            </div>

            <div>
              <h1 className="capitalize font-inter font-medium text-base leading-6 tracking-[0.01em] text-black">
                {step.title}
              </h1>
              <p className="font-inter font-normal text-base leading-6 tracking-[0.01em] text-[#777980]">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSidebar;
