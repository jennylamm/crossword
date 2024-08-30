// src/components/CrosswordForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InputForm.css";
import { useCrossWordData } from "../context/Context";

const InputForm = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useCrossWordData();

  const handleChange = (index, field, value) => {
    const lettersOnly = /^[a-zA-Z]*$/;
    if (field === "word" && !lettersOnly.test(value)) {
      return;
    }
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const handleAddClick = () => {
    if (formData.length >= 15) {
      return alert(`Can't add field! Crossword has a maximum of 15 words.`);
    }
    const newFormData = [...formData, { word: "", clue: "" }];
    setFormData(newFormData);
  };

  const handleDeleteClick = (index) => {
    if (formData.length === 5) {
      return alert(
        `Can't delete field! Crossword must have minimum of 5 words.`
      );
    }
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/configure");
  };

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
              <td>
                <button type="button" onClick={() => handleDeleteClick(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddClick}>
        Add
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
