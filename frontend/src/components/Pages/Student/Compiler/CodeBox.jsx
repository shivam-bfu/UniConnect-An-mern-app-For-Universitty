import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Output from "../Compiler/Output";

const Codebox = () => {
  const codeFocus = useRef(null);

  const onMount = (editor) => {
    codeFocus.current = editor;
    editor.focus();
  };

  return (
    <>
    <div className="mybox">
      <div className="flex m-10 border rounded-lg p-5">
        {/* Code Editor Section */}
        <div className="h-screen flex-1 p-5 codebox">
          <Editor
            onMount={onMount}
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// Write your code here"
          />
        </div>

        {/* Output Section */}
        <Output codeFocus={codeFocus} />
      </div>
      </div>
    </>
  );
};

export default Codebox;