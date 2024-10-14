import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.props';

export const Modal: React.FC<ModalProps> = ({ children, open, onClose, className = '' }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open && modal) {
      modal.showModal();
    }
    return () => {
      if (modal) {
        modal.close();
      }
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose || (() => {})}>
      {children}
    </dialog>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
