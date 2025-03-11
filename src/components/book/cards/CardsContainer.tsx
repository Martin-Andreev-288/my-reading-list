import { GridBookCard, ListBookCard } from "@/components";
import { useState, useEffect } from "react";
import { type Book } from "@/utils/types";
import { useBooks } from "@/serviceHooks/useBooks";
import { toast } from "sonner";

type CardsContainerProps = {
  book: Book;
  variant: "grid" | "list";
};

const CardsContainer = ({ book, variant }: CardsContainerProps) => {
  const [currentPageInput, setCurrentPageInput] = useState(
    book.currentPage || 0
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteBook, updateProgress, markStatus } = useBooks();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !(e.target as Element).closest(".menu-container") &&
        !(e.target as Element).closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleUpdateProgress = async () => {
    const hasChanges = currentPageInput !== book.currentPage;
    if (!hasChanges) {
      toast.error("No changes detected");
      return;
    }

    setIsUpdating(true);
    try {
      await updateProgress(book.id, currentPageInput, book.totalPages);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkStatus = async () => {
    setIsUpdating(true);
    try {
      await markStatus(book.id, book.status, book.totalPages);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatus = (): Book["status"] => {
    switch (book.status) {
      case "Not Started":
        return "Reading";
      case "Reading":
        return "Finished";
      case "Finished":
        return "Not Started";
      default:
        return "Not Started";
    }
  };

  const nextStatusLabel = getNextStatus();

  const progress =
    book.status === "Finished"
      ? 100
      : book.currentPage
      ? Math.round((book.currentPage / book.totalPages) * 100)
      : 0;

  return variant === "grid" ? (
    <GridBookCard
      book={book}
      progress={progress}
      currentPageInput={currentPageInput}
      isUpdating={isUpdating}
      isMenuOpen={isMenuOpen}
      isEditModalOpen={isEditModalOpen}
      onEdit={() => setIsEditModalOpen(true)}
      onDelete={() => deleteBook(book.id)}
      onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      onPageChange={setCurrentPageInput}
      onUpdateProgress={handleUpdateProgress}
      onMarkStatus={handleMarkStatus}
      nextStatusLabel={nextStatusLabel}
      onCloseEdit={() => setIsEditModalOpen(false)}
    />
  ) : (
    <ListBookCard
      book={book}
      progress={progress}
      currentPageInput={currentPageInput}
      isUpdating={isUpdating}
      isMenuOpen={isMenuOpen}
      isEditModalOpen={isEditModalOpen}
      onEdit={() => setIsEditModalOpen(true)}
      onDelete={() => deleteBook(book.id)}
      onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      onPageChange={setCurrentPageInput}
      onUpdateProgress={handleUpdateProgress}
      onMarkStatus={handleMarkStatus}
      nextStatusLabel={nextStatusLabel}
      onCloseEdit={() => setIsEditModalOpen(false)}
    />
  );
};

export default CardsContainer;
