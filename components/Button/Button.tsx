import { ButtonHTMLAttributes, FormEvent, useEffect, useState } from 'react';
import classNames from '@/utils/classNames';
import styles from './Button.module.css';
import SpinnerLoading from '../SpinnerLoading';
import LettersLoading from '../LettersLoading';

type Size = '' | 'tiny' | 'small' | 'medium' | 'large' | 'xLarge'

type Loading = 'span' | 'text'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: (e: FormEvent<HTMLButtonElement>) => any
  label?: string,
  sizeComponent: Size
  className?: string
  primary?: boolean
  isLoading?: boolean
  disabledLoading?: boolean
  disabled?: boolean
  children: string | JSX.Element
  typeLoading: Loading
}

const Button = ({
  children,
  handleClick,
  label,
  sizeComponent,
  primary,
  className = '',
  disabled,
  isLoading,
  disabledLoading,
  typeLoading,
  ...props
}: Props) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      setTimeout(() => {
        setShowLoading(false);
      }, 500);
    }
  }, [isLoading]);

  const handleAsyncClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledLoading) setShowLoading(true);
    await handleClick(e);
    setShowLoading(false);
  };

  const LoadingButton = () => {
    switch (typeLoading) {
      case 'span':
        return <SpinnerLoading />
      case 'text':
        return <LettersLoading text='Sending...' />
    }
  }

  return (
    <button
      className={classNames(
        styles.button,
        styles[sizeComponent],
        styles[primary ? 'primary' : 'secondary'],
        className
      )}
      onClick={handleAsyncClick}
      disabled={showLoading || disabled}
      {...props}
    >
      {showLoading ? (
        <LoadingButton />
      ) : (
        children || label
      )}
    </button>
  );
};

export default Button;
