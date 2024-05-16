import styles from './LettersLoading.module.css';

interface Props {
  text: string
}

const LettersLoading = ({ text }: Props) => {
  const letters = text.split('');

  return (
    <main className={styles.container}>
      {letters.map((letter, index) => (
        <span key={index} className={styles.letter} style={{ animationDelay: `${index * 0.1}s` }}>
          {letter}
        </span>
      ))}
    </main>
  );
};

export default LettersLoading;
