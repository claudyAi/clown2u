"use client";

import { useState } from "react";
import { questions, clownTypes, calculateClownType } from "./quiz-data";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const clownType = calculateClownType(newAnswers);
      setResult(clownType);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult("");
  };

  if (showResult) {
    const clown = clownTypes[result];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="text-8xl mb-6">{clown.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            You are {clown.name}!
          </h1>
          <p className="text-xl text-gray-600 mb-6">{clown.description}</p>
          <div className="bg-gradient-to-r from-yellow-200 to-pink-200 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Your Traits:</h2>
            <ul className="space-y-2 text-left">
              {clown.traits.map((trait, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-2xl mr-2">🎪</span>
                  <span className="text-lg text-gray-700">{trait}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg"
          >
            Take Quiz Again 🎉
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="text-8xl mb-6">🤡</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Clown2U
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            What Kind of Clown Are You?
          </p>
          <p className="text-lg text-gray-500 mb-10">
            Answer a few fun questions to discover your inner clown personality! 🎪
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-5 rounded-full text-2xl font-bold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all shadow-lg"
          >
            Start Quiz 🎈
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-2xl">{question.emoji}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all transform hover:scale-102 hover:shadow-lg"
            >
              <div className="flex items-center">
                <span className="text-3xl mr-4">{option.emoji}</span>
                <span className="text-lg font-medium text-gray-700">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
