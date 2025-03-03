import { type Book } from "../../utils/types";

type BookListProps = {
  books: Book[];
};

function BookList({ books }: BookListProps) {
  const handleClick = async (id: string) => {
    console.log(id);
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
