import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  Open: boolean;
  onClose?: () => void;
}

export default function Model({ children, Open, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modalElement = dialog.current;

    if (Open) {
      if (!modalElement?.open) {
        modalElement?.showModal();
      }
    } else {
      modalElement?.close();
    }

    // Close when clicking outside
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalElement && event.target === modalElement) {
        onClose?.();
      }
    };

    modalElement?.addEventListener("click", handleOutsideClick);

    return () => {
      modalElement?.removeEventListener("click", handleOutsideClick);
    };
  }, [Open, onClose]);

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null; // Prevent app crash if modal container is missing

  return createPortal(
    <dialog ref={dialog} className="rounded-3xl border-none shadow-lg p-4 w-4/5 max-w-2xl animate-fade-slide-up bg-gradient-to-br from-[#A7D7C5] to-[#6AA889]">
      <button className="absolute top-3 right-3 text-gray-700" onClick={onClose}>
        ✖
      </button>
      {children}
    </dialog>,
    modalRoot
  );
}
