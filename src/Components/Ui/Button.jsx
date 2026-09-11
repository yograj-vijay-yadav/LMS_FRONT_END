import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

/**
 * Polymorphic button: renders a <button> by default, or a react-router <Link>
 * when `to` is provided (useful for CTAs that should navigate with prefetch).
 * Supports a built-in loading state that disables interaction.
 */
const Button = forwardRef(function Button(
  {
    as: As = "button",
    to,
    variant = "primary",
    size,
    loading = false,
    disabled = false,
    className = "",
    children,
    ...rest
  },
  ref
) {
  const classes = [
    "btn",
    variantClasses[variant] ?? variantClasses.primary,
    size === "sm" ? "btn-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} ref={ref} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <As
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          {children}
        </>
      ) : (
        children
      )}
    </As>
  );
});

export default Button;
