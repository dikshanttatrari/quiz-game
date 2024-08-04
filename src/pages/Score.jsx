import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

function Score() {
  const location = useLocation();
  const { name, score, totalQuestions } = location.state;
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  let greeting = "";

  if (score === totalQuestions) {
    greeting = "Perfect Score!";
  } else if (score === 2) {
    greeting = "You can do better!";
  } else if (score === 3) {
    greeting = "Good Job!";
  } else if (score === 4) {
    greeting = "Great Job!";
  } else {
    greeting = "Better Luck Next Time!";
  }

  useEffect(() => {
    gsap.fromTo(
      ".score-container",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }
    );

    gsap.fromTo(
      ".congrats-text",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "bounce.out" }
    );

    gsap.fromTo(
      ".score-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "bounce.out" }
    );
  }, []);

  return (
    <div className="h-[100vh] w-full bg-gradient-to-bl from-[#6717B7] to-[#191970] flex items-center justify-center text-white">
      <div className="score-container bg-[#282c34] p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold congrats-text">
          {greeting}, <spam className="text-[#CCFF00]">{name}!</spam>
        </h1>
        <p className="text-2xl mt-5 score-text">
          You scored <span className="text-[#FFD700] font-bold">{score}</span>{" "}
          out of{" "}
          <span className="text-[#FFD700] font-bold">{totalQuestions}</span>!
        </p>
        <div className="mt-10">
          <button
            onClick={goToHome}
            className="bg-[#32CD32] text-black font-semibold py-2 px-5 rounded-md transition duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Score;
