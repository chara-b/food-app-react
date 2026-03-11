function Button({ type, name, styles, onClick, disabled, children }) {
  return (
    <button
      name={name}
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
