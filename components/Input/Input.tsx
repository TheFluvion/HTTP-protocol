import { FormEvent, InputHTMLAttributes, useState } from 'react';
import Img from '../Img';
import cn from '../../utils/classNames';
import iconShown from '@/public/assets/icon-open-eye.svg';
import iconHidden from '@/public/assets/icon-closed-eye.svg';
import styles from './Input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (e: FormEvent<HTMLInputElement>) => any
  className?: string
  label?: string
  errorMessage?: string
  disabled?: boolean
  value: string | number
  placeholder?: string
  sizeContainer?: string
}

/** Styled reusable form's controlled Input component.
 * @warn Styles don't work properly on uncontrolled inputs.
 * You must explicitly provide value and handleChange props.
 */
const Input = ({
  handleChange,
  className = '',
  label,
  errorMessage,
  sizeContainer = '',
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    handleChange({
      ...e,
      currentTarget: {
        ...e.currentTarget,
        name,
        value
      },
    });
  }

  return (
    <div
      className={cn(
        label ? styles.labelContainer : '',
        styles[sizeContainer],
        props.disabled ? styles.disabled : ''
      )}
    >
      <label>
        <div
          className={cn(
            styles.inputContainer,
            props.disabled ? styles.disabled : ''
          )}
        >
          {label && (
            <span
              className={cn(
                styles.label,
                !props.value && !props.placeholder ? styles.fakePlaceholder : ''
              )}
            >
              {label}
            </span>
          )}
          <input
            className={cn(
              styles.input,
              className,
              errorMessage ? styles.errorBorder : ''
            )}
            onChange={inputChange}
            {...props}
            type={
              props.type === 'password' && !showPassword ? 'password' : 'text'
            }
          />
          {props.type === 'password' && (
            <div
              className={styles.showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Img
                src={showPassword ? iconShown : iconHidden}
                className={styles.faEye}
                alt='Password'
              />
            </div>
          )}
        </div>
      </label>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
