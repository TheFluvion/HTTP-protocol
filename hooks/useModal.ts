import useConditionalModal from './useConditionalModal';
import Modal from '@/components/Modal';
import { Props as ModalProp } from '@/components/Modal/Modal'
import { Props as ModalPullModalProp } from '@/components/PullUpModal/PullUpModal'

//Add Props Modal if you add a new modal
export interface ModalProps extends ModalProp, ModalPullModalProp {
}

type CustomModal = (props: ModalProps) => JSX.Element

/**
 * Returns a stateful Modal component and functions to update it.
 * @param {boolean} initialState init component on a visible state.
 * @returns Modal Component and methods to show and hide it.
 */

const useModal = (initialState: boolean = false, CustomModal: CustomModal = Modal) => {
  const { StatefulComponent, hideComponent, showComponent } = useConditionalModal(
    initialState,
    CustomModal
  );

  return {
    Modal: StatefulComponent,
    showModal: showComponent,
    hideModal: hideComponent,
  };
};

export default useModal;
