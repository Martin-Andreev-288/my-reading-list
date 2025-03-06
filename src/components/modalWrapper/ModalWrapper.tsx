import { createPortal } from "react-dom";

type ModalWrapperProps = {
  children: React.ReactNode;
};

function ModalWrapper({ children }: ModalWrapperProps) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {children}
    </div>,
    document.getElementById("modal-root")!
  );
}

export default ModalWrapper;
