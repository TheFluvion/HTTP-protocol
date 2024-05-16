import HTTPSteps from '@/components/HTTPSteps';
import styles from '../styles/Home.module.css';
import cn from '../utils/classNames';

export default function Home() {
  return (
    <div className={cn(styles.container, styles.main)}>
      <HTTPSteps />
    </div>
  );
}
