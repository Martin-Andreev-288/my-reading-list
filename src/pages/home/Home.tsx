import { useState, useRef } from "react";
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
import {
  bgImage,
  bgImage1,
  bgImage2,
  bgImage3,
  bgImage4,
  bgImage5,
} from "@/assets";

const BACKGROUND_IMAGES = [
  bgImage,
  bgImage1,
  bgImage2,
  bgImage3,
  bgImage4,
  bgImage5,
];

function Home() {
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgImage = useRef(
    BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)]
  ).current;
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
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
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
