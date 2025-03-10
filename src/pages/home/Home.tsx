import { useState } from "react";
import {
  Navbar,
  Footer,
  BookList,
  AddBookFormModal,
  EmptyLibraryState,
  BookStatistics,
} from "@/components";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useCollection } from "@/serviceHooks/useCollection";
import { useAuthContext } from "@/serviceHooks/useAuthContext";

function Home() {
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { documents: books } = useCollection("books", [
    "uid",
    "==",
    user?.uid as string,
  ]);

  if (books?.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="max-w-5xl mx-auto my-0">
            <EmptyLibraryState onAddBook={() => setIsModalOpen(true)} />
          </div>
          {isModalOpen && (
            <AddBookFormModal onClose={() => setIsModalOpen(false)} />
          )}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="mt-10"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
            Add new book 📖
          </Button>
        </div>
        <div className="max-w-5xl mx-auto my-0">
          {books && (
            <>
              <BookStatistics books={books} />
              <BookList books={books} />
            </>
          )}
        </div>

        {isModalOpen && (
          <AddBookFormModal onClose={() => setIsModalOpen(false)} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
