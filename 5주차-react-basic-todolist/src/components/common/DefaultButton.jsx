import { useState } from 'react';

function DefaultButton({ buttonProps, children }) {
  const { buttonColor, width, height, backgroundColor, onClickFunction, type="button" } = buttonProps;
  const [active, setActive] = useState(false);

  const defaultButtonStyle = {
    backgroundColor: backgroundColor,
    color: 'black',
    border: `1px solid ${buttonColor}`,
    width: width,
    height: height,
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 0 auto',
    boxShadow: active ? `0 0 5px ${buttonColor}` : 'none',
  };

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <button type={type} style={defaultButtonStyle} onMouseDown={handleClick} onMouseUp={handleClick} onClick={onClickFunction}>
      {children}
    </button>
  );
}

export default DefaultButton;
