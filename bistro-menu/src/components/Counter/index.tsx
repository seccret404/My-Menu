/* eslint-disable react/prop-types */
import { useState } from "react";
import './counter.css';

interface CounterProps {
  defaultValue: number; // Nilai default untuk counter
  onValueChange?: (value: number) => void; // Fungsi opsional untuk menangani perubahan nilai
}

export const Counter: React.FC<CounterProps> = ({ defaultValue, onValueChange }) => {
  const [count, setCount] = useState<number>(defaultValue);

  const handleCount = (type?: 'increment' | 'decrement') => {
    let value = count;
    if (type === 'increment') {
      value = count + 1;
    } else if (type === 'decrement' && count > 0) {
      value = count - 1;
    }

    if (onValueChange) onValueChange(value);
    setCount(value);
  };

  return (
    <div className="action-product">
      <button className="btn-counter" onClick={() => handleCount('decrement')}>-</button>
      <p className="count-product">{count}</p>
      <button className="btn-counter" onClick={() => handleCount('increment')}>+</button>
    </div>
  );
};
