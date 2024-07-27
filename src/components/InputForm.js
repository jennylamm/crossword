// src/components/CrosswordForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './InputForm.css';


const InputForm = () => {
  const [formData, setFormData] = useState([
    { word: '', clue: '' },
    { word: '', clue: '' },
    { word: '', clue: '' },
    { word: '', clue: '' },
    { word: '', clue: '' }
  ]);

  const handleChange = (index, field, value) => {
    // Regular expression to check if value contains only letters
    const lettersOnly = /^[a-zA-Z]*$/;

    if (field === 'word' && !lettersOnly.test(value)) {
      return; 
    }

    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const handleAddClick = () => {
    const newFormData = [...formData, { word: '', clue: '' }];
    setFormData(newFormData);
  };

  const handleDeleteClick = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
                  onChange={(e) => handleChange(index, 'word', e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.clue}
                  onChange={(e) => handleChange(index, 'clue', e.target.value)}
                  required
                />
              </td>
              <td>
                <button type="button" onClick={() => handleDeleteClick(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddClick}>Add</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
