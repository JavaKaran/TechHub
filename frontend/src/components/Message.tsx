import React, { ReactNode } from "react";
import { Alert } from "react-bootstrap";

interface Props {
  variant: string;
  children: ReactNode;
}

const Message = ({ variant, children }: Props) => {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;