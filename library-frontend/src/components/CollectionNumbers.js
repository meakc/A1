// CollectionNumbers.js
import React from 'react';
import AnimatedNumber from './AnimatedNumber';
import './CollectionNumbers.css';

const stats = [
  { id: 1, label: 'Publications', value: 120 },
  { id: 2, label: 'Books', value: 800 },
  { id: 3, label: 'Awards Won', value: 15 },
  { id: 4, label: 'Years of Experience', value: 10 },
];

const CollectionNumbers = () => {
  return (
    <div className="collection-numbers">
      {stats.map((stat) => (
        <AnimatedNumber key={stat.id} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};

export default CollectionNumbers;