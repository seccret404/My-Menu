import './button.css';

interface ButtonProps {
  children: React.ReactNode;  
  onClick?: () => void;       
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};
