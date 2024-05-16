import ChevronIcon from '../ChevronIcon';
import styles from './SelectOptions.module.css';
import useClickOutside from '@/hooks/useClickOutside';
import { InputEvent } from '@/services/Types';
import cn from '@/utils/classNames';
import Option from '../tinyComponents/Option';
import { useMemo } from 'react';
import Img from '../Img';
import checkIcon from '@/public/assets/icon-check.svg';

export type Item = {
  id: number | string | boolean;
  name: string;
};

type ChildrenPosition = 'top' | 'bottom';

type OptionFontSize = `${number}rem`;

interface Props {
  title?: string;
  options: Item[];
  handleSelect: (_e: InputEvent, _index: number) => void;
  value: number | string | boolean | number[] | string[];
  name: string;
  showOptionsSelected?: boolean;
  className?: string;
  containerClassName?: string;
  label?: string;
  childrenPosition: ChildrenPosition;
  index?: number;
  fullWidth?: boolean;
  allowMultiple?: boolean;
  optionFontSize?: OptionFontSize;
}

const SelectOptions = ({
  title,
  options,
  handleSelect,
  value,
  name,
  showOptionsSelected = false,
  className = '',
  containerClassName = '',
  label,
  childrenPosition,
  index = 0,
  fullWidth = false,
  allowMultiple = false,
  optionFontSize,
}: Props) => {
  const { show, componentRef, handleToggle } = useClickOutside(false);

  const inputHandler = (id: number | string | boolean) => {
    if (!allowMultiple) {
      handleSelect({ currentTarget: { value: id, name } }, index);
      return;
    } else {
      const newValue = value as number[];
      const index = newValue.findIndex((item) => item === id);
      if (index === -1) {
        newValue.push(id as number);
      } else {
        newValue.splice(index, 1);
      }
      handleSelect({ currentTarget: { value: newValue, name } }, index);
    }
  };

  const showOptionSelected: string = useMemo((): string => {
    let optionText: string = '';

    options.forEach((option, _i) => {
      if (option.id === value) {
        optionText = option.name;
      }
    });

    return optionText;
  }, [value, options]);

  const getValuesWithName = (value: number[]) => {
    return value
      .map((id) => {
        const option = options.find((item) => item.id === id);
        if (!option) return null;
        return <Option key={id} text={option.name} />;
      })
      .filter((item) => item);
  };

  const optionIsSelected = (id: number | string | boolean) => {
    if (value) {
      const newValue = value as number[];
      return newValue.some((item) => item === id);
    }
    return false;
  };

  return (
    <div className={styles.mainContainer}>
      {label && <div className={styles.label}>{label}</div>}
      <main
        className={cn(
          styles.container,
          showOptionsSelected ? '' : styles.containerOnly,
          label ? '' : styles.containerWithoutLabel,
          fullWidth ? styles.fullWidth : '',
          containerClassName
        )}
      >
        {showOptionsSelected && !!value && (
          <div className={styles.optionSelected}>
            {!allowMultiple ? (
              <Option text={showOptionSelected} />
            ) : (
              getValuesWithName(value as number[])
            )}
          </div>
        )}
        <div
          className={cn(
            styles.selectContainer,
            showOptionsSelected ? '' : styles.selectContainerOnly,
            className
          )}
          onClick={handleToggle}
          ref={componentRef}
        >
          <div className={styles.titleContainer}>
            <h2
              className={styles.title}
              style={{
                fontSize: optionFontSize,
              }}
            >
              {allowMultiple ? title : showOptionSelected}
            </h2>
            <ChevronIcon
              color="white"
              type={show ? 'up' : 'down'}
              width={15}
              height={15}
            />
          </div>
          <div
            className={cn(
              show ? styles.childrenOpen : styles.childrenClose,
              styles[childrenPosition]
            )}
          >
            {options.map((item: Item, i) => (
              <div
                key={i}
                className={styles.item}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!allowMultiple) handleToggle();
                  inputHandler(item.id);
                }}
                style={{
                  fontSize: optionFontSize,
                }}
              >
                {item.name}
                {allowMultiple && (
                  <div
                    className={cn(
                      styles.checkContainer,
                      optionIsSelected(item.id) ? styles.checked : ''
                    )}
                  >
                    <Img src={checkIcon} width={15} height={15} alt="check" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectOptions;
