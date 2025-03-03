import { useEffect, useState } from "react";
import { Navbar, BookList, BookForm } from "../../components";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { type Book } from "../../utils/types";

export default function Home() {
  const [books, setBooks] = useState<Book[] | null>(null);

  useEffect(() => {
    const ref = collection(db, "books");

    getDocs(ref).then((snapshot) => {
      const results: Book[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...(doc.data() as Omit<Book, "id">) });
      });

      setBooks(results);
    });
  }, []);

  return (
    <div className="max-w-screen-sm mx-auto my-0">
      <Navbar />
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
