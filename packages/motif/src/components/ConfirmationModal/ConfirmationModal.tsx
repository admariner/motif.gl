import React, { FC, MouseEvent, ReactNode } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  CLOSE_SOURCE,
} from 'baseui/modal';

type TButtonEvent = (event: MouseEvent<HTMLButtonElement>) => any;
export type ConfirmationModalProps = {
  onClose: (args: {
    closeSource?: (typeof CLOSE_SOURCE)[keyof typeof CLOSE_SOURCE];
  }) => any;
  isOpen: boolean;
  onReject: TButtonEvent;
  onAccept: TButtonEvent;
  header: ReactNode;
  body?: ReactNode;
  rejectBtnText?: ReactNode;
  confirmBtnText?: ReactNode;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  onClose,
  isOpen,
  onReject,
  onAccept,
  header,
  body,
  rejectBtnText = 'No',
  confirmBtnText = 'Yes',
}): JSX.Element => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      closeable={false}
      overrides={{
        Root: {
          style: {
            zIndex: 3,
          },
        },
      }}
    >
      <ModalHeader>{header}</ModalHeader>
      {body && <ModalBody>{body}</ModalBody>}
      <ModalFooter>
        <ModalButton
          kind='tertiary'
          onClick={onReject}
          data-testid='confirmation-modal:reject'
        >
          {rejectBtnText}
        </ModalButton>
        <ModalButton onClick={onAccept} data-testid='confirmation-modal:accept'>
          {confirmBtnText}
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
