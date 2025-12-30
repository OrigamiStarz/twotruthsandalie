import React, { useState, useEffect } from 'react';

function App() {
  
  const [choices, setChoices] = useState([]);

  useEffect(() => { 
    console.log("Fetching choices...");
    fetch("/generate").then(
      // store result in json
      res => res.json()
    ).then(
      // store json result as a choice
      res => {
        setChoices(res.choices);
        console.log("Choices fetched:", res.choices);
      }
    )
  }, []);

  return (
    <div className="bg-black w-full h-full m-0 top-0 absolute">
      <h1 className="text-blue-500">Two Truths and a Lie</h1>
      {/* choices container */}
      <div className="">
        {choices.map((choice, index) => (
          <span key={index} className="text-blue-400">{choice}</span>
        ))}
      </div>
    </div>
  );
}

export default App
