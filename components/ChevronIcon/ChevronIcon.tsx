import classNames from '../../utils/classNames';
import styles from './ChevronIcon.module.css';

type Direction = 'up' | 'down' | 'left' | 'right'

interface Props {
  color?: string
  type: Direction
  className?: string
  handleClick?: () => any
  width: number
  height: number
}

const ChevronIcon = ({
  color = 'var(--font-color)',
  type,
  className = '',
  handleClick,
  width,
  height,
}: Props) => {
  return (
    <i className={classNames(styles.container, className)} onClick={handleClick}>
      <svg
        className={styles[type]}
        width={width}
        height={height}
        viewBox="0 0 12 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 17L3 9.5L10 2"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </i>
  );
};

export default ChevronIcon;
