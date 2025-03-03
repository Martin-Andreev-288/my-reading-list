import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

function BookForm() {
  const [newBook, setNewBook] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, "books"), {
      title: newBook,
    });

    setNewBook("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block my-1.5">
        <span className="block my-1.5">Add a new book title:</span>
        <input
          className="p-1.5 mb-3"
          required
          type="text"
          onChange={(e) => setNewBook(e.target.value)}
          value={newBook}
        />
      </label>
      <button className="text-white px-2 py-1.5 bg-purple-800">Add</button>
    </form>
  );
}

export default BookForm;
