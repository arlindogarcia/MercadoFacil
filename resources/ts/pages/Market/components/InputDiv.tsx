import { useEffect, useRef } from "react";

type InputDivProps = React.DOMAttributes<HTMLDivElement> & {
  onlyNumbers?: boolean;
  value: any;
};

export const InputDiv = ({ onlyNumbers = false, value, onInput }: InputDivProps) => {
  const inputRef = useRef(null);

  const handleKeyPress = (event: any, onlyNumbers = true) => {
    if (
      onlyNumbers &&
      isNaN((String as any).fromCharCode(event.which)) &&
      event.key != "Backspace"
    ) {
      event.preventDefault();
    }
  };

  const setCursorPositionToEnd = (el: HTMLElement) => {
    const range = document.createRange();
    const sel: any = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  };

  useEffect(() => {
    if (inputRef.current && inputRef.current == document.activeElement) {
      setCursorPositionToEnd(inputRef.current);
    }
  }, [value]);

  return (
    <div
      ref={inputRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onKeyDown={(event) => handleKeyPress(event, false)}
      className="editable-input pl-2"
      onInput={onInput}
    >
      {value}
    </div>
  );
};
