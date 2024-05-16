import { useEffect, useState } from 'react';
import styles from './ProgressSemiCircle.module.css';
import Img from '../Img';
import arrowClock from '@/public/assets/icon-arrow-clock.svg';
import cn from '@/utils/classNames';
interface Props {
  maxValue: number;
  value: number;
  text: string;
  valueSymbol: string;
}

const ProgressSemiCircle = ({ maxValue, value, text, valueSymbol }: Props) => {
  const [rotation, setRotation] = useState<number>(180);
  const percentage = (value * 100) / maxValue;

  useEffect(() => {
    setTimeout(() => {
      calculateRotation();
    }, 500);
  }, []);

  function calculateRotation() {
    // Adjust rotation maximum and minimum values according to your requirements.
    const rotationMax = 180; // now it is positive and corresponds to 100%
    const rotationMin = 0; // now it is negative and corresponds to 0%

    // Calculate rotation using the rule of three.
    const rotationRange = rotationMax - rotationMin;
    const rotation = rotationMax + (percentage / 100) * rotationRange;
    // Return/set the rotation value.
    setRotation(rotation);
  }

  return (
    <main className={styles.container}>
      <div className={styles.barOverflow}>
        <Img
          src={arrowClock}
          alt="Reloj"
          width={50}
          height={50}
          className={styles.clock}
        />
        <div
          className={cn(
            styles.bar,
            `${percentage >= 70 && styles.barRightBorder}`,
            `${percentage >= 45 && styles.barLeftBorder}`
          )}
          style={{ transform: `rotateZ(${rotation}deg)` }}
        />
      </div>
      {/* TODO: add clock arrow image */}
      <div className={styles.values}>
        <span className={styles.percentage}>
          {value}
          {valueSymbol}
        </span>
        <p className={styles.text}>{text}</p>
      </div>
    </main>
  );
};

export default ProgressSemiCircle;
