interface ButtonProps {
  label: string;
  color: string;
  onClick: () => void;
}

const Button = ({ label, color, onClick }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 text-white rounded ${color}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
