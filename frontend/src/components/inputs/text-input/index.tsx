import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./index.module.css";

type TextInputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  validation?: {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => boolean | string;
  };
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

export const TextInput = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  validation,
  error,
  disabled,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, validation)}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
