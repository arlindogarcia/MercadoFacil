import { useEffect, useRef } from "react";

type InputDivProps = React.DOMAttributes<HTMLDivElement> & {
  onlyNumbers?: boolean;
  value: any;
  inputMode?: "text" | "decimal";
  externalClassName?: string;
};

export const InputDiv = ({
  onlyNumbers = false,
  value,
  onInput,
  inputMode = "text",
  externalClassName,
}: InputDivProps) => {
  const inputRef = useRef(null);

  const handleKeyPress = (event: any) => {
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
      inputMode={inputMode}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onKeyDown={(event) => handleKeyPress(event)}
      className={`${externalClassName} editable-input pl-2`}
      onInput={onInput}
      onFocus={(event) => setCursorPositionToEnd(event.target)}
    >
      {value}
    </div>
  );
};
