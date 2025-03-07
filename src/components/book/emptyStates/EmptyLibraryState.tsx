import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

type EmptyLibraryStateProps = {
  onAddBook: () => void;
};

function EmptyLibraryState({ onAddBook }: EmptyLibraryStateProps) {
  return (
    <div className="text-center p-8 mt-12">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-semibold mb-2">Your Library is Empty</h2>
        <p className="text-gray-500 mb-6">
          Start building your reading list by adding your first book!
        </p>
        <Button onClick={onAddBook}>
          <FaPlus className="mr-2" />
          Add Your First Book
        </Button>
      </div>
    </div>
  );
}

export default EmptyLibraryState;
