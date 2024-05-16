import { FormEvent } from 'react';
import styles from './SwitchInput.module.css';
import cn from '@/utils/classNames';

interface Props {
  value: boolean;
  name: string;
  handleToggle: (_e: FormEvent<HTMLInputElement>) => void;
}

const SwitchInput = ({ value, name, handleToggle }: Props) => {
  return (
    <label className={cn(styles.switch, value ? styles.checked : '')}>
      <input
        type="checkbox"
        checked={value}
        onChange={handleToggle}
        className={styles.input}
        name={name}
      />
      <span className={cn(styles.slider, styles.round)} />
    </label>
  );
};

export default SwitchInput;
