import React from "react";
import "./Configure.css";
import { useCrossWordData } from "../context/Context";



const Configure = () => {
  const {formData} = useCrossWordData()
  console.log(formData)
  return (
    <>
      <div className="configure-container">
        <h1>Configure Page</h1>
      </div>
    </>
  );
};

export default Configure;
