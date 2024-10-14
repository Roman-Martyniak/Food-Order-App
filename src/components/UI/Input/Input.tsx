import { InputProps } from './Input.props';

const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
};

export default Input;
