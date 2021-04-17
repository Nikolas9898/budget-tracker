import React, {useState} from 'react';
import './ExportStyle.css';

const ExportContainer = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState('');
  const options = [' ', 'salary', 'bonus', 'petty cash', 'other'];
  return (
    <div className="wrapper">
      <div>
        <select className="input" value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExportContainer;
