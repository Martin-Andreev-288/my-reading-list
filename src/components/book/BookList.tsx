import { type Book } from "../../utils/types";
import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

type BookListProps = {
  books: Book[];
};

function BookList({ books }: BookListProps) {
  const handleClick = async (id: string) => {
    const ref = doc(db, "books", id);

    await deleteDoc(ref);
  };

  return (
    <div className="">
      <ul>
        {books.map((book) => (
          <li
            className="bg-white list-none cursor-pointer my-2.5 p-2.5"
            key={book.id}
            onClick={() => handleClick(book.id)}
          >
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
