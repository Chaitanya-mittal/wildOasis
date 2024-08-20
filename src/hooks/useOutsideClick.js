import { useRef, useEffect } from "react";
function useOutsideClick(handler, capturingPhase = true) {
  const myref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (myref.current && !myref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, capturingPhase);

    return () => {
      document.removeEventListener("click", handleClick, capturingPhase); // changing the default behaviour to capturing phase
    };
  }, [handler]);
  return { myref };
}

export default useOutsideClick;
