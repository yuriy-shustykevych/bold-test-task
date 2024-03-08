import './index.css'

const Button = ({title, disabled = false, textColor, backgroundColor, type = "button", isLoading = false, loadingText = "Loading...", onClick, style,}) => {

  const textStyle = {
    color: textColor || 'white',
    backgroundColor: backgroundColor || 'black',
    ...style,
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={textStyle}
      className="styledButton"
    >
      {!isLoading ? title : loadingText}
    </button>
  );
};

export default Button;
