import React, { useState, useEffect } from 'react';

function App() {
  
  const [choices, setChoices] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [result, setResult] = useState("");

  useEffect(() => { 
    // console.log("Fetching choices...");
    fetch("/generate").then(
      // store result in json
      res => res.json()
    ).then(
      // store json result as a choice
      res => {
        setChoices(res.choices);
        // console.log("Choices fetched:", res.choices);
      }
    )
  }, []);

  const handleSelect = (index) => {
    if (result === "") setSelectedId(index);
    // console.log("Selected choice index:", index);
  }

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
        selected: selectedId
      })
    }).then(res => res.json()).then(res => {
      setResult(res.result);
      // console.log("Verification result:", res);
    });
  }
  return (
    <div className="bg-[#0d1636] w-full h-full m-0 top-0 absolute flex items-center flex-col gap-4">
      <h1 className="m-8 text-blue-300 font-bold text-6xl">Two Truths and a Lie</h1>
      <p className="text-blue-200 text-2xl">Do you know me well enough? Which one is the lie?</p>
      {/* choices container */}
      <div className="w-full h-auto mt-16 flex flex-col items-center gap-8">
        {choices.map((choice, index) => (
          <button key={index} 
                  onClick={() => handleSelect(index)} 
                  className={
                    `/* base style */
                    border-2 p-8 text-2xl mx-24 rounded-sm transition duration-300 hover:bg-blue-200 hover:text-[#0d1636] hover:scale-110 active:opacity-80 active:scale-105
                    /* conditional */
                    ${selectedId === index ? 
                      // choice has been selected
                      'text-[#0d1636] bg-blue-200' : 
                      // not selected
                      'text-blue-200'}
                    `}>
                    {choice}
          </button>
        ))}
      </div>
      <button className={`
        /* base style */
        flex items-center justify-center text-3xl  w-48 h-16 rounded-sm mt-8 hover:scale-110 transition duration-300 border-2 border-blue-200 active:opacity-80 active:scale-105
        /* conditional */
        ${selectedId < 0 || result !== ""?
          // disable button
          'text-blue-200 opacity-50' : 
          // enable button
          'text-[#0d1636] bg-blue-200'
        }
      `} 
      onClick={handleSubmit}
      disabled={selectedId < 0 || result !== ""}>
        SUBMIT
      </button>

      {result && (
        <div className={`
          /* base style */
          text-2xl mt-8 p-8 border-2 rounded-sm
          /* conditional */
          ${result === "truth" ? 
            'text-red-200 border-red-200' :
            'text-green-200 border-green-200'  
          }`}
        >
        {result === "truth" ? 
          "Sorry, that was actually true. " :
          "Congratulations, you are correct! "}
          Refresh the page to play again.
        </div>
      )}
    </div>
  );
}

export default App
