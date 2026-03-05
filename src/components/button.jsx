function Button({ type, styles, onClick, disabled, children }) {
  return (
    <button
      type={type}
      className={
        !disabled
          ? styles
          : "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
