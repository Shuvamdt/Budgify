import React from "react";

const About = () => {
  return (
    <div>
      <div className="min-h-screen mx-10 my-20 px-5 sm:px-10 py-20 flex flex-col justify-center items-center rounded-lg bg-[#FAA307]">
        <h1 className="font-1 text-4xl">About</h1>
        <p className="px-2 py-5 font-1">
          Welcome to Bugit — your smart companion for effective and stress-free
          money management. Bugit is designed to help you track your spending
          and savings in real time with an intuitive, optimized dashboard that
          provides a clear overview of your financial health. By integrating
          seamlessly with your Google Pay account, Bugit automatically fetches
          your latest transactions, ensuring your budget always reflects your
          actual expenses and income accurately. To keep you on track, Bugit
          sends instant email alerts whenever you exceed your budget limits,
          empowering you to make timely adjustments and avoid overspending. We
          understand that not all transactions happen online, so Bugit makes it
          easy for you to manually credit or debit amounts — giving you complete
          control without relying solely on automatic updates. At the end of
          every month, you’ll receive a comprehensive progress report directly
          in your inbox. This detailed summary highlights both your automatic
          and manual transactions, helping you evaluate your spending habits and
          plan ahead more effectively. Please note that once a monthly report is
          sent by Bugit, it becomes a permanent record — no further edits or
          updates will be possible, encouraging you to review your entries
          carefully throughout the month. Take charge of your finances with
          confidence and transparency — let Bugit be your trusted partner in
          achieving your financial goals.
        </p>
      </div>
    </div>
  );
};

export default About;
