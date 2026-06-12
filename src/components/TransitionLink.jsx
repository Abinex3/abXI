// src/transition/TransitionLink.jsx
import { useTransition } from "./TransitionProvider";

export default function TransitionLink({ to, children, style, className, onClick, ...rest }) {
  const { navigateWithTransition } = useTransition();

  const handleClick = (e) => {
    e.preventDefault();      // stop the instant navigation
    onClick?.(e);            // let callers still close menus, etc.
    navigateWithTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} style={style} className={className} {...rest}>
      {children}
    </a>
  );
}