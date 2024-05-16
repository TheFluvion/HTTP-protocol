import Button from '@/components/Button';
import styles from './Option.module.css';
import close from '@/public/assets/icon-close-gray.svg';
import Img from '@/components/Img';
import { FormEvent } from 'react';
import cn from '@/utils/classNames';

interface Props {
  text: string;
  handleClick?: (_e: FormEvent<HTMLButtonElement>) => void;
  showButton?: boolean;
  size?: Size;
}

type Size = 'small' | 'medium';

const Option = ({ text, handleClick, showButton, size = 'medium' }: Props) => {
  return (
    <main className={cn(styles.container, styles[size])}>
      {text}
      {showButton && (
        <Button
          handleClick={handleClick ?? (() => {})}
          sizeComponent="small"
          className={styles.button}
        >
          <Img src={close} alt="Cerrar" height={20} width={20} />
        </Button>
      )}
    </main>
  );
};

export default Option;
