import { useEffect, useRef } from 'react';
import useToggle from './useToggle';

/**
 * Returns a ref and functions to close component if click outside.
 * @param {boolean} initialState init component on a visible state.
 * @returns ref to know component to close, show state, hideComponent and showComponent functions.
 */

const useClickOutside = (initialState: boolean = false) => {
  const { show, hideComponent, showComponent, handleToggle } =
    useToggle(initialState);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //If the click event occurs outside the component, execute the close function
      if (
        componentRef.current &&
        !componentRef?.current?.contains(event.target as Node)
      ) {
        hideComponent();
      }
    };
    //A wait of 500ms is set because if set immediately, the function is executed
    //Use document to catch all click events
    setTimeout(() => {
      if (show) {
        document.addEventListener('click', handleClickOutside);
      }
    }, 500);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [show]);

  return {
    componentRef,
    show,
    hideComponent,
    showComponent,
    handleToggle,
  };
};

export default useClickOutside;
