import Img from '../Img';
import styles from './Modal.module.css';
import close from 'public/assets/icon-close.svg';

export interface Props {
  children: string | JSX.Element | JSX.Element[]
  hide: () => any
  hideCloseButton?: boolean
}

const Modal = ({ children, hide, hideCloseButton }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.children}>
        <div className={styles.headerClose}>
          {!hideCloseButton && (
            <Img
              src={close}
              width={30}
              height={30}
              alt="Cerrar"
              onClick={hide}
            />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
