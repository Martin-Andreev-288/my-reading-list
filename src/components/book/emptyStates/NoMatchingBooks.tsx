function NoMatchingBooks() {
  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
      <p className="text-gray-500 text-lg mb-2">🔍 No matching books found</p>
      <p className="text-sm text-gray-400">
        Try adjusting your search, filters, or sorting criteria to find books in
        your library.
      </p>
    </div>
  );
}

export default NoMatchingBooks;
