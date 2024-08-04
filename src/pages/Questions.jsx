import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

function Questions() {
  const location = useLocation();
  const { name } = location.state;
  const [screen, setScreen] = useState(1);
  const navigate = useNavigate();
  const [selectedAns, setSelectedAns] = useState({});
  const questions = [
    {
      id: 1,
      text: "Q1. What is the capital of India?",
      options: ["Mumbai", "Bengaluru", "New Delhi", "Chennai"],
      answer: "New Delhi",
    },
    {
      id: 2,
      text: "Q2. What comes after 99876?",
      options: ["99877", "99878", "99879", "99880"],
      answer: "99877",
    },
    {
      id: 3,
      text: "Q3. When did India get independence?",
      options: ["10 July 2000", "14 Feb 2024", "15 Aug 1947", "26 Jan 1950"],
      answer: "15 Aug 1947",
    },
    {
      id: 4,
      text: "Q4. What is the full form of CPU?",
      options: [
        "Computer Programming Unit",
        "Central Processing Unit",
        "Control Processing Unit",
        "Central Program Unit",
      ],
      answer: "Central Processing Unit",
    },
    {
      id: 5,
      text: "Q5. Who is Kabir Singh?",
      options: ["Shahid Kapoor", "Salman Khan", "Aamir Khan", "Ranbir Kapoor"],
      answer: "Shahid Kapoor",
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      ".question",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 }
    );

    gsap.fromTo(
      ".options .button",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.2 }
    );
  }, [screen]);

  const handleAnswerClick = (answer) => {
    setSelectedAns((prev) => ({ ...prev, [screen]: answer }));
  };

  const handleQuestionClick = (id) => {
    setScreen(id);
  };

  const handleNextClick = () => {
    if (screen < questions.length) {
      setScreen((prev) => prev + 1);
    } else {
      const score = questions.reduce((acc, question) => {
        return acc + (selectedAns[question.id] === question.answer ? 1 : 0);
      }, 0);
      navigate("/score", {
        state: { name, score, totalQuestions: questions.length },
      });
    }
  };

  return (
    <div className="h-[100vh] w-full bg-gradient-to-bl from-[#6717B7] to-[#191970]">
      <h1 className="pt-10 mx-10 text-3xl font-semibold text-gray-200">
        All the best <span className="text-[#00FFFF] font-bold">{name}</span> 👍
      </h1>
      {questions.map((question) => (
        <div
          key={question.id}
          className={`question ${
            screen === question.id ? "block" : "hidden"
          } pt-20 mx-10`}
        >
          <div className="bg-[#282c34] p-5 rounded-lg shadow-lg">
            <h1 className="text-white text-xl mb-8">{question.text}</h1>
            <div className="options grid grid-cols-1 md:grid-cols-2 gap-5">
              {question.options.map((answer) => (
                <button
                  key={answer}
                  onClick={() => handleAnswerClick(answer)}
                  className={`flex items-center justify-between px-5 py-4 rounded-lg transition duration-300 transform hover:scale-105 ${
                    selectedAns[screen] === answer
                      ? "bg-[#32CD32] text-white"
                      : "bg-[#FF4500] text-white"
                  }`}
                >
                  {answer}
                  {selectedAns[screen] === answer && (
                    <TiTick className="ml-2 text-xl" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextClick}
              className="mt-5 bg-[#FFD700] text-black font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
            >
              {screen < questions.length ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      ))}
      <div className="fixed bottom-0 left-0 w-full bg-[#191970] p-5 shadow-lg">
        <div className="flex justify-center space-x-2">
          {questions.map((question) => (
            <button
              key={question.id}
              onClick={() => handleQuestionClick(question.id)}
              className={`px-4 py-2 rounded-full ${
                screen === question.id
                  ? "bg-[#32CD32] text-white"
                  : "bg-[#FF4500] text-white"
              }`}
            >
              {question.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Questions;
