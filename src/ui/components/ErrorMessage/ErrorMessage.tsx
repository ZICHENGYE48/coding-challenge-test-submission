import React, { FunctionComponent } from "react";

import $ from "./ErrorMessage.module.css";

interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  children,
  ...props
}) => {
  return (
    <p role="alert" aria-live="polite" className={$.error} {...props}>
      {children}
    </p>
  );
};

export default ErrorMessage;
