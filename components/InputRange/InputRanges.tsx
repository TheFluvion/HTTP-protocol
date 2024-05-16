import styles from './InputRanges.module.css';
import PropTypes from 'prop-types';
import { FormEvent, useEffect, useState } from 'react';

type EventInput = {
  target: {
    name: string
    value: InputValue
  }
}

interface InputValue {
  max: number
  min: number
}

interface Props {
  inputHandler: (e: EventInput) => any
  value: InputValue
  name: string
  min: number
  max: number
  step: number
  minMaxLabel?: string
  label?: string
  difference: number
  minPosValue: number
  maxPosValue: number
  placeholder?: string
}

const InputRanges = ({
  inputHandler,
  value,
  name,
  min,
  max,
  step,
  minMaxLabel,
  label,
  difference,
  minPosValue,
  maxPosValue,
  placeholder,
}: Props) => {
  //The minimum or maximum value indicated by props is established,
  //otherwise the minimum or maximum values of the provided value are established.
  const [minValue, setMinValue] = useState(min || value.min);
  const [maxValue, setMaxValue] = useState(max || value.max);

  const handleRangeChange = (newRange: InputValue) => {
    inputHandler({ target: { name, value: newRange } });
  };

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    // If the value of min is 0, it means that the value to be modified is only the max
    if (min === 0) return;
    const newMinVal = Number(e.currentTarget.value);
    if (!value) setMinValue(newMinVal);
    //The minimum difference between both values is verified so as not to exceed it
    if (maxValue - newMinVal <= difference) {
      handleRangeChange({ min: maxValue - difference, max: maxValue });
      return;
    }
    handleRangeChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newMaxVal = Number(e.currentTarget.value);
    if (!value) setMaxValue(newMaxVal);
    // The minimum difference between both values is verified so as not to exceed it
    if (newMaxVal - minValue <= difference) {
      handleRangeChange({ min: minValue, max: minValue + difference });
      return;
    }
    handleRangeChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={label ? styles.wrapperWithLabel : styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className={styles.input}
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className={styles.controlWrapper}>
        {min !== 0 && (
          <div className={styles.control} style={{ left: `${minPos}%` }} />
        )}
        {label && (
          <span
            className={styles.label}
            style={{ left: `${minPos - minPosValue}%` }}
          >
            {minValue} {minMaxLabel}
          </span>
        )}
        <div className={styles.rail}>
          <div
            className={styles.innerRail}
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className={styles.control} style={{ left: `${maxPos}%` }} />
        {label && (
          <span
            className={styles.label}
            style={{ left: `${maxPos - maxPosValue}%` }}
          >
            {maxValue} {minMaxLabel}
          </span>
        )}
      </div>
      {placeholder && (
        <p className={styles.placeholder}>
          {min !== 0 && `${minValue} a`} {maxValue} {placeholder}
        </p>
      )}
    </div>
  );
};

export default InputRanges;
