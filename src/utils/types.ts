export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  totalPages: number;
  currentPage?: number;
  status: "Not Started" | "Reading" | "Finished";
  userId: string;
  createdAt: Date;
};