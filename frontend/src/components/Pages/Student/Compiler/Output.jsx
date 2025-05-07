import React, { useState } from "react";
import { executeCode } from "../../../../../api";

const Output = ({ codeFocus }) => {
  const [output, setOutput] = useState(null);

  const runCode = async () => {
    console.log("clicked");

    const sourceCode = codeFocus.current.getValue();
    if (sourceCode) {  // ✅ Fix the incorrect condition
      try {
        const { run: result } = await executeCode(sourceCode);
        setOutput(result.output);
      } catch (err) {
        console.error("Execution Error:", err);  // ✅ Proper error logging
        setOutput("Error executing code!");
      }
    } else {
      setOutput("No code provided.");
    }
  };

  return (
    <div className="w-1/2 h-96 rounded p-4   output">
      <button 
        onClick={runCode} 
        className="bg-gray-300 rounded px-5 py-2 mb-3 hover:bg-gray-400 transition"
      >
        Run Code
      </button>
      <div className="bg-black text-white border h-96 rounded-2 p-2 overflow-auto">
        {output ? output : "Click 'Run Code' to execute."}
      </div>
    </div>
  );
};

export default Output;