import { Navbar, BookList, BookForm } from "@/components";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

import { useCollection } from "@/hooks/useCollection";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Home() {
  const { user } = useAuthContext();

  const { documents: books } = useCollection("books", [
    "uid",
    "==",
    user?.uid as string,
  ]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Button variant="outline" className="mt-10">
          <FaPlus />
          Add new book 📖
        </Button>
      </div>
      <div className="max-w-5xl mx-auto my-0">
        {books && <BookList books={books} />}
        <BookForm />
      </div>
    </>
  );
}
