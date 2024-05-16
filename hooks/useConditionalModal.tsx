import { useCallback } from 'react';
import useToggle from './useToggle';
import { ModalProps } from './useModal';

interface ModalComponentProps extends ModalProps {
  show: boolean
  handleContinue: () => any
  handleCancel: () => any
};

type ComponentType = React.ComponentType<ModalComponentProps>;

/**
 * Returns a conditional rendered Component and functions to show and hide it.
 * It controls if the component is shown or not.
 * @param {boolean} initialState init component on a visible state.
 * @returns Conditional Component and methods to show and hide it.
 */
const useConditionalModal = (initialState: boolean = false, Component: ComponentType) => {
  const { show, showComponent, hideComponent } = useToggle(initialState);

  const StatefulComponent = useCallback((props: any) => {
    const handleCancel = () => {
      hideComponent();
    };

    const handleContinue = () => {
      hideComponent();
    };

    return show && <Component
      show={show}
      {...props}
      handleContinue={handleContinue}
      handleCancel={handleCancel}
    />
  },
    [show]
  );

  return { StatefulComponent, showComponent, hideComponent };
};

export default useConditionalModal;
