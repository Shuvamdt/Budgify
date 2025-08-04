import React from "react";

const About = () => {
  return (
    <div>
      <div className="min-h-screen mx-10 my-20 px-5 sm:px-10 py-20 flex flex-col justify-center items-center rounded-lg bg-[#FAA307]">
        <h1 className="font-1 text-4xl">About</h1>
        <p className="px-2 py-5 font-1">
          Welcome to Budgify — your smart companion for effective and
          stress-free money management. Budgify is designed to help you track
          your spending and savings in real time with an intuitive, optimized
          dashboard that provides a clear overview of your financial health. By
          integrating seamlessly with your Plaid account, Budgify automatically
          fetches your latest transactions, ensuring your budget always reflects
          your actual expenses and income accurately. To keep you on track, Take
          charge of your finances with confidence and transparency — let Budgify
          be your trusted partner in achieving your financial goals.
        </p>
      </div>
    </div>
  );
};

export default About;
