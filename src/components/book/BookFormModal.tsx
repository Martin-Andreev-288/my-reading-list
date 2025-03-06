import { ModalWrapper } from "@/components";
import { BookForm } from "@/components";
import { MdClose } from "react-icons/md";

type BookFormModalProps = {
  onClose: () => void;
};

function BookFormModal({ onClose }: BookFormModalProps) {
  return (
    <ModalWrapper>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <MdClose className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
          Add New Book 📖
        </h2>

        <BookForm onSuccess={onClose} />
      </div>
    </ModalWrapper>
  );
}

export default BookFormModal;
