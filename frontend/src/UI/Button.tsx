import { type ReactNode } from "react";
import { Link } from "react-router-dom";

type BaseButtonProps = {
  color: "magenta" | "green" | "blue";
  children: ReactNode;
};

type ButtonProps = BaseButtonProps & {
  type: "button";
};

type LinkProps = BaseButtonProps & {
  type: "link";
  to: string;
};

type ButtonComponentProps = ButtonProps | LinkProps;

export default function Button(props: ButtonComponentProps) {
  const { type, color, children } = props;

  const colorClass = `bg-${color}`;

  if (type === "button") {
    return (
      <button className={`${colorClass} text-light rounded px-8 py-4`}>
        {children}
      </button>
    );
  }

  if (type === "link") {
    const { to } = props as LinkProps;
    return (
      <Link className={`${colorClass} text-light rounded px-8 py-4`} to={to}>
        {children}
      </Link>
    );
  }
}
