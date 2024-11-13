// src/components/CrosswordForm.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCrossWordData } from "../context/Context";
import deleteIcon from "../assests/images/bin.svg";
import styled from "styled-components";

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding-left: 2px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const PositionButtons = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 5px;
`;


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
                  style={{
                    width: "250px",
                  }}
                  type="text"
                  value={item.clue}
                  onChange={(e) => handleChange(index, "clue", e.target.value)}
                  required
                />
              </td>
              <td>
                <DeleteButton
                  type="button"
                  onClick={() => handleDeleteClick(index)}
                >
                  <img src={deleteIcon} alt="Delete" />
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PositionButtons>
        <button type="button" onClick={handleAddClick}>
          Add
        </button>
        <button type="submit">Submit</button>
      </PositionButtons>
    </form>
  );
};

export default InputForm;
