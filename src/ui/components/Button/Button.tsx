import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";

import $ from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

export const VARIANT: Record<ButtonVariant, string> = {
  primary: $.primary,
  secondary: $.secondary,
} as const;

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      className={`${$.button} ${VARIANT[variant]}`}
      type={type}
      onClick={onClick}
    >
      {loading && (
        <span data-testid="loading-spinner">
          <svg
            width="16"
            height="16"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="90 150"
              strokeDashoffset="0"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                values="0; -220"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;