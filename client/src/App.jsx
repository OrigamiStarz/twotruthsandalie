import React, { useState, useEffect } from "react";

function App() {
  const [choices, setChoices] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [result, setResult] = useState("");

  useEffect(() => {
    // console.log("Fetching choices...");
    fetch("/generate")
      .then(
        // store result in json
        (res) => res.json(),
      )
      .then(
        // store json result as a choice
        (res) => {
          setChoices(res.choices);
          // console.log("Choices fetched:", res.choices);
        },
      );
  }, []);

  const handleSelect = (index) => {
    if (result === "") setSelectedId(index);
    // console.log("Selected choice index:", index);
  };

  const handleSubmit = () => {
    // make a post request to /verify with
    // {"choices": choices, "selected": selectedId}
    // to see if user is correct
    fetch("/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        choices: choices,
        selected: selectedId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res.result);
        // console.log("Verification result:", res);
      });
  };
  return (
    <div className="absolute top-0 m-0 flex h-full w-full flex-col items-center gap-4 overflow-auto bg-[#0d1636]">
      <h1 className="m-8 text-6xl font-bold text-blue-300">
        Two Truths and a Lie
      </h1>
      <p className="text-2xl text-blue-200">
        Do you know me well enough? Which one is the lie?
      </p>
      {/* choices container */}
      <div className="mt-16 flex h-auto w-full flex-col items-center gap-8">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`/* base style */ /* conditional */ mx-24 rounded-sm border-2 p-8 text-2xl transition duration-300 hover:scale-110 hover:bg-blue-200 hover:text-[#0d1636] active:scale-105 active:opacity-80 ${
              selectedId === index
                ? // choice has been selected
                  "bg-blue-200 text-[#0d1636]"
                : // not selected
                  "text-blue-200"
            } `}
          >
            {choice}
          </button>
        ))}
      </div>
      <button
        className={`/* base style */ /* conditional */ mt-8 flex h-16 w-48 items-center justify-center rounded-sm border-2 border-blue-200 p-8 text-3xl transition duration-300 hover:scale-110 active:scale-105 active:opacity-80 ${
          selectedId < 0 || result !== ""
            ? // disable button
              "text-blue-200 opacity-50"
            : // enable button
              "bg-blue-200 text-[#0d1636]"
        } `}
        onClick={handleSubmit}
        disabled={selectedId < 0 || result !== ""}
      >
        SUBMIT
      </button>

      {result && (
        <div
          className={`/* base style */ /* conditional */ my-8 rounded-sm border-2 p-8 text-2xl ${
            result === "truth"
              ? "border-red-200 text-red-200"
              : "border-green-200 text-green-200"
          }`}
        >
          {result === "truth"
            ? "Sorry, that was actually true. "
            : "Congratulations, you are correct! "}
          Refresh the page to play again.
        </div>
      )}
    </div>
  );
}

export default App;
