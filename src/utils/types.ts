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

export type CommonBookCardProps = {
  book: Book;
  progress: number;
  currentPageInput: number;
  isUpdating: boolean;
  isMenuOpen: boolean;
  isEditModalOpen: boolean;
  nextStatusLabel: string;
  onEdit: () => void;
  onDelete: () => void;
  onMenuToggle: () => void;
  onPageChange: (value: number) => void;
  onUpdateProgress: () => void;
  onMarkStatus: () => void;
  onCloseEdit: () => void;
};