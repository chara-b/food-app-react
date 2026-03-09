function Button({ type, styles, onClick, disabled, children }) {
  return (
    <button
      type={type}
      className={!disabled ? styles : `${styles} opacity-50 cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
