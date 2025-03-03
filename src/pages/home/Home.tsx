import { Navbar, BookList, BookForm } from "../../components";
import { useCollection } from "../../hooks/useCollection";

export default function Home() {
  const { documents: books } = useCollection("books");

  return (
    <div className="max-w-screen-sm mx-auto my-0">
      <Navbar />
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
