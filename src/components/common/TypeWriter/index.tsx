import React, { useState, useEffect } from "react";

interface TypeWriteProps {
  text: string;
  delay: number;
  infinite?: boolean;
  style?: string;
}

const Typewriter = (props: TypeWriteProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: any;
    if (currentIndex < props.text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + props.text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, props.delay);
    } else if (props.infinite) {
      setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText("");
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, props.delay, props.infinite, props.text]);

  return <span className={props?.style}>{currentText}</span>;
};

export default Typewriter;
