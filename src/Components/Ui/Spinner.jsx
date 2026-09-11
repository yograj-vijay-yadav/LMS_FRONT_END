import { Loader2 } from "lucide-react";

function Spinner({ className = "size-5" }) {
  return (
    <Loader2
      className={`animate-spin ${className}`}
      aria-hidden="true"
      role="presentation"
    />
  );
}

export default Spinner;
