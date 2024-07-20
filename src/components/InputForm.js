import React, { useState } from "react";
import './InputForm.css'

const InputForm = () => {
  const [formData, setFormData] = useState([
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
  ]);
  const handleSubmit = () => console.log("handleSumbit");
  const handleChange = () => console.log("handleChange");
  return (
    <form className="crossword-form" onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Clue</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.word}
                  onChange={(e) => handleChange(index, "word", e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.clue}
                  onChange={(e) => handleChange(index, "clue", e.target.value)}
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
