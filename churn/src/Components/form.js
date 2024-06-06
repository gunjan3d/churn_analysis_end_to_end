import React, { useState } from 'react';

const fieldNames = [
  'CreditScore', 'Geography', 'Gender', 'Age', 'Tenure', 'Balance',
  'NumOfProducts', 'HasCrCard', 'IsActiveMember', 'EstimatedSalary', 'Complain', 'Satisfaction Score', 'Point Earned',
  'Card Type_DIAMOND', 'Card Type_GOLD', 'Card Type_PLATINUM',
  'Card Type_SILVER'
];


const Form = () => {
  let [answer, setAnswer] = useState("");
  const [formData, setFormData] = useState(Array(fieldNames.length).fill(''));

  const handleChange = (index) => (e) => {
    const newFormData = [...formData];
    newFormData[index] = e.target.value;
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = {};
    fieldNames.forEach((fieldName, index) => {
      formDataObject[fieldName] = Number(formData[index]);
    });
  
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
    });
  
    if (response.ok) {
      const result = await response.json();
      console.log('Prediction result:', result.data);
      setAnswer(result);
    } else {
      console.error('Error:', response.statusText);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      {fieldNames.map((fieldName, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {fieldName}
          </label>
          <input
            type="number"
            value={formData[index]}
            onChange={handleChange(index)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Submit
      </button>
      <p>{answer.prediction}</p>
    </form>
  );
};

export default Form;
