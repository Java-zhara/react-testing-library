import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

export const Portal = ({ onClose, children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => modalRoot.removeChild(el);
  });

  return createPortal(
    <>
      <div onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    el
  );
};
