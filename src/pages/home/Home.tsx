import { useState } from "react";
import { Navbar, BookList, BookFormModal } from "@/components";
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

  return (
    <>
      <Navbar />
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
        {books && <BookList books={books} />}
      </div>

      {isModalOpen && <BookFormModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Home;
