import Img from '../Img';
import styles from './PullUpModal.module.css';
import close from 'public/assets/icon-close.svg';
import left from 'public/assets/icon-arrow-left.svg';
import cn from '@/utils/classNames';
import ProgressBar from '../ProgressBar';
import { useEffect } from 'react';

type Size = 'high' | 'small' | 'medium' | 'fullScreen'

export interface Props {
  children: string | JSX.Element | JSX.Element[]
  hideModal: () => any
  open: boolean
  hideCloseButton?: boolean
  hideBackButton?: boolean
  handleBack: () => any
  size?: Size
  showProgressBar?: boolean
}

const PullUpModal = ({
  children,
  hideModal,
  open,
  hideCloseButton,
  hideBackButton,
  handleBack,
  size = 'small',
  showProgressBar,
}: Props) => {
  useEffect(() => {
    if (size === 'fullScreen') {
      setTimeout(() => {
        hideModal();
      }, 30000);
    }
  }, [size]);

  return (
    <div
      className={
        open ? cn(styles.containerShow, styles[size]) : styles.containerHide
      }
    >
      <div className={styles.childrenContainer}>
        {showProgressBar && (
          <div className={styles.progressBarContainer}>
            <ProgressBar withoutStatus />
          </div>
        )}
        <div className={styles.headerClose}>
          <Img
            src={left}
            width={30}
            height={30}
            alt="Cerrar"
            onClick={handleBack}
            className={hideBackButton ? styles.arrowHide : styles.arrowShow}
          />
          {!hideCloseButton && (
            <Img
              src={close}
              width={30}
              height={30}
              alt="Cerrar"
              onClick={hideModal}
            />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PullUpModal;
