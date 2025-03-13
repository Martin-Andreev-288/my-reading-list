import { useBooks } from "@/serviceHooks/useBooks";
import { ModalWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { Book } from "@/utils/types";
import { MdClose } from "react-icons/md";

type DeleteBookFormModalProps = {
  book: Book;
  onClose: () => void;
};

function DeleteBookFormModal({ book, onClose }: DeleteBookFormModalProps) {
  const { deleteBook } = useBooks();

  return (
    <ModalWrapper>
      <div className="relative bg-white rounded-lg p-6 mx-4 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <MdClose className="w-6 h-6 text-gray-500" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          {/* Warning Icon */}
          <div className="mx-auto mb-4 text-red-500">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-2">Delete Book</h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete book "{book.title}"? This action
            cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button onClick={onClose} variant="outline" className="px-6">
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteBook(book.id);
                onClose();
              }}
              variant="destructive"
              className="px-6"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default DeleteBookFormModal;
