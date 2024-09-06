import { useState } from "react";

export function Validation() {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  return {
    errors,
    isValid,
    setIsValid,
    setErrors,
  };
}
