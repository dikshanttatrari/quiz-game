import React, { useState } from "react";
import Avatar from "../assets/avatar.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

function HomePage() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  console.log(name);
  const navigate = useNavigate();

  const goToQuestions = () => {
    if (name === "") {
      setNameError(true);
    } else {
      navigate("/questions", { state: { name } });
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      "#hello",
      {
        opacity: 0,
        x: -10,
      },
      {
        opacity: 1,
        duration: 1,
        x: 0,
      }
    );

    gsap.fromTo(
      "#image",
      {
        opacity: 0,
        x: 10,
      },
      {
        opacity: 1,
        duration: 1,
        x: 0,
      }
    );

    gsap.fromTo(
      ".para",
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        delay: 1,
        stagger: 0.5,
      }
    );

    gsap.fromTo(
      ".button",
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        delay: 3,
      }
    );
  }, []);

  return (
    <div className="h-[100vh] w-full bg-gradient-to-bl from-[#6717B7] to-[#191970] text-white">
      <nav className="flex w-full items-center justify-between pt-10 px-10">
        <h1
          id="hello"
          className="text-3xl text-center font-semibold flex gap-2"
        >
          Hola{" "}
          <h1 className="text-[#00FFFF] font-bold">{name ? name : "Amigo"}!</h1>
        </h1>
        <img id="image" src={Avatar} className="h-12 w-12" />
      </nav>

      <main className="mt-20 mx-10">
        <section className="flex item-center justify-center flex-col">
          <h1 className="text-3xl md:text-5xl font-bold text-center para text-[#CCFF00]">
            Multiple Choice Questions
          </h1>
          <p className="para mt-5 md:text-lg text-gray-400 text-center text-sm">
            This is a quiz template just enter your name and start the quiz
          </p>
          <p className="para mt-5 md:text-lg text-gray-400 text-center text-sm">
            For each <spam className="text-[#00FFFF]">correct answer</spam> you
            will be given <spam className="text-[#00FFFF]">+1 point</spam> and
            there is no negative marking as this is not{" "}
            <spam className="text-[#FF00FF]"> JEE Advance.</spam>
          </p>
        </section>

        <section className="para w-full items-center justify-center flex flex-col mt-10 ">
          <input
            required
            type="text"
            placeholder="Enter your name.."
            className={
              nameError
                ? "w-[300px] py-2 pl-2 rounded-lg outline-none text-black border-red-500 border-4 error"
                : "w-[300px] py-2 pl-2 rounded-md outline-none text-black"
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <div className="flex gap-1 text-sm mt-1 items-center ">
              <MdError className="text-red-500" />
              <p className="text-red-500">Name is required</p>
            </div>
          )}
        </section>

        <div className="button mt-10 flex items-center justify-center">
          <button
            onClick={goToQuestions}
            className="bg-[#FFD700] text-black font-semibold py-2 px-4 rounded-md ml-2"
          >
            Start Quiz
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
