import { ModalWrapper, EditBookForm } from "@/components";
import { Book } from "@/utils/types";
import { MdClose } from "react-icons/md";

type EditBookFormModalProps = {
  book: Book;
  onClose: () => void;
};

function EditBookFormModal({ book, onClose }: EditBookFormModalProps) {
  return (
    <ModalWrapper>
      <div className="edit-modal relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <button
          onClick={onClose}
          className="text-white hover:text-blue-200 absolute top-4 right-4 transition-colors"
        >
          <MdClose className="w-6 h-6" />
        </button>

        <div className="bg-blue-600 text-white rounded-t-lg -m-8 mb-6 p-8">
          <h2 className="text-xl font-semibold border-b border-blue-200 pb-2 text-center">
            Edit Book Details
          </h2>
        </div>

        <EditBookForm book={book} onSuccess={onClose} />
      </div>
    </ModalWrapper>
  );
}

export default EditBookFormModal;
