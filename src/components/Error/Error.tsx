import { FunctionComponent } from 'react';

import { ErrorProps } from './Error.types';

const Error: FunctionComponent<ErrorProps> = ({ title, message }) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
