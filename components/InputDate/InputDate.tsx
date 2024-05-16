import styles from './InputDate.module.css';
import { FormEvent, useState } from 'react';
import dayjs, { Dayjs } from "dayjs";
import Img from '../Img';
import calendar from 'public/assets/icon-calendar.svg';
import classNames from '../../utils/classNames';
import Calendar from '../Calendar';
import { EventInput } from '@/services/Types';

interface Props extends FormEvent<HTMLInputElement> {
  label?: string
  required?: boolean
  errorMessage?: string
  errorMessageStyle?: string
  value: string | number
  handleChange: (e: EventInput) => any
  className?: string
  name: string
}

const InputDate = ({
  label,
  required,
  errorMessage,
  errorMessageStyle = '',
  value,
  handleChange,
  className = '',
  name,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false);

  const inputHandler = (e: EventInput) => {
    const { name, value } = e.target;
    handleChange({
      target: { name: name, value: dayjs(value).format('YYYY-MM-DD') },
    });
  };

  const handleOpenCalendar = (e: FormEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        {label}
        {required && <span className={styles.span}> *</span>}
      </p>
      <div
        className={classNames(styles.inputContainer, className)}
        onClick={handleOpenCalendar}
      >
        <input
          name="date"
          className={styles.input}
          value={dayjs(value).format('DD/MM/YYYY')}
          onChange={inputHandler}
          {...props}
          readOnly
        />
        <Img
          src={calendar}
          width={30}
          height={30}
          className={styles.calendarImage}
          onClick={handleOpenCalendar}
          alt="calendar"
        />
      </div>
      {errorMessage && (
        <span className={classNames(styles.error, errorMessageStyle)}>
          {errorMessage}
        </span>
      )}
      {open && (
        <Calendar
          value={value}
          inputHandler={inputHandler}
          handleClose={() => setOpen(!open)}
          name={name}
          top="5rem"
          right="1rem"
        />
      )}
    </div>
  );
};

export default InputDate;
