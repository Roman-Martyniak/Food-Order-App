import { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  open: boolean;
  className?: string;
  onClose?: () => void;
}
