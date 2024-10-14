import { FunctionComponent } from 'react';
import { ButtonProps } from './Button.props.ts';

const Button: FunctionComponent<ButtonProps> = ({
  children,
  textOnly,
  className = '',
  ...props
}) => {
  let cssClasses = textOnly ? 'text-button' : 'button';
  cssClasses += ' ' + className;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
