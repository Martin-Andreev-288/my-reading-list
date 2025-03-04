import { Navbar, BookList, BookForm } from "@/components";
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
      <div className="max-w-5xl mx-auto my-0">
        {books && <BookList books={books} />}
        <BookForm />
      </div>
    </>
  );
}
