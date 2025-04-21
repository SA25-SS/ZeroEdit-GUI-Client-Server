// src/components/MainScreen/CodeEditor.jsx

import React from 'react';

const OutputArea = ({ error, value="" }) => {
  return (
    <div className='p-2 text-start' style={{ maxHeight:"28vh"}}>
      <h6>Output</h6>
      <textarea
        className={`h-100 w-100 border-0 bg-black ${!error?'text-light':'text-danger'} p-2`} 
        placeholder='The output will be shown here'
        value={value}
        style={{fontFamily : "monospace"}}
        readOnly
      />
    </div>
  );
};

export default OutputArea;
