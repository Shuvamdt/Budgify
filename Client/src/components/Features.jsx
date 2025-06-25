import React from "react";

const Features = () => {
  return (
    <div id="page" className="overflow-x-hidden">
      <div className="flex flex-col justify-center items-center py-10 md:py-30 px-10 md:px-30 lg:px-60 font-1">
        <div className="rounded-full text-center px-3 py-1 bg-[#F48C06]">
          <p>features</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 row-span-4 grid-rows-6 sm:grid-rows-3 md:grid-rows-2 gap-4 py-4">
          <div className="px-5 pt-4 pb-4 rounded-2xl bg-[#FAA307]">
            <p className="px-1">
              <img
                src="feature-1.png"
                alt="icon"
                className="float-left mt-2 mr-3 h-8 w-8 rounded-full bg-[#D00000] px-1 py-1"
              />
              Optimized real-time dashboard, which helps you to track your
              progress accurately.
            </p>
          </div>
          <div className="px-5 pt-4 pb-4 rounded-2xl bg-[#FAA307]">
            <p className="px-1">
              <img
                src="feature-2.png"
                alt="icon"
                className="float-left mt-2 mr-3 h-8 w-8 rounded-full bg-[#D00000] px-1 py-1"
              />
              Real-time updates from your Google Pay account help you to stay on
              track.
            </p>
          </div>
          <div className="px-5 pt-4 pb-4 rounded-2xl bg-[#FAA307]">
            <p className="px-1">
              <img
                src="feature-3.png"
                alt="icon"
                className="float-left mt-2 mr-3 h-8 w-8 rounded-full bg-[#D00000] px-1 py-1"
              />
              If you run out of budget, email alerts will alert you to stay
              updated.
            </p>
          </div>
          <div className="px-5 pt-4 pb-4 rounded-2xl bg-[#FAA307]">
            <p className="px-1">
              <img
                src="feature-4.png"
                alt="icon"
                className="float-left mt-2 mr-3 h-8 w-8 rounded-full bg-[#D00000] px-1 py-1"
              />
              Additionally, you can debit or credit your account manually so
              that you don't need to stay dependent on Google Pay.
            </p>
          </div>
          <div className="px-5 pt-4 pb-4 rounded-2xl bg-[#FAA307]">
            <p className="px-1">
              <img
                src="feature-5.png"
                alt="icon"
                className="float-left mt-2 mr-3 h-8 w-8 rounded-full bg-[#D00000] px-1 py-1"
              />
              For each month, you will get a result through your mail about your
              progress for the month, and manual transactions will be
              highlighted.
            </p>
          </div>
          <div className="px-5 pt-5 pb-4 rounded-2xl bg-[#FAA307]">
            <p className="px-1">
              <img
                src="feature-6.png"
                alt="icon"
                className="float-left mt-2 mr-3 h-8 w-8 rounded-full bg-[#D00000] px-1 py-1"
              />
              Once the progress report is released through mail, you cannot
              change or get an updated report for any mistakes that happen from
              your end.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
