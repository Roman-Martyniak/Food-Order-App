import { ReactNode } from 'react';

export interface ButtonProps {
  children?: ReactNode,
  textOnly?: string | boolean,
  className?: string,
  onClick?: () => void
}