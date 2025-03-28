import { useAuthContext } from "@/serviceHooks/useAuthContext";
import { db } from "@/firebase/config";
import { addDoc, getDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Book } from "@/utils/types";

export const useBooks = () => {
    const { user } = useAuthContext();

    const addBook = async (formData: { title: string; author: string; genre: string; totalPages: string, imageURL: string }) => {
        try {
            await addDoc(collection(db, "books"), {
                title: formData.title.trim(),
                author: formData.author.trim() || "Unknown author",
                genre: formData.genre.trim() || "Unknown genre",
                totalPages: parseInt(formData.totalPages),
                currentPage: 0,
                status: "Not Started",
                uid: user?.uid,
                createdAt: serverTimestamp(),
                imageURL: formData.imageURL || null,
            });
            toast.success("Book added successfully!");
            return true;
        } catch (error) {
            toast.error("Failed to add book");
            console.error(error);
            return false;
        }
    };

    const updateBook = async (bookId: string, updates: Partial<Book>) => {
        try {
            const bookRef = doc(db, "books", bookId);
            const updateData: Partial<Book> = {};

            if (updates.title) updateData.title = updates.title.trim();
            if (updates.author) updateData.author = updates.author.trim() || "Unknown author";
            if (updates.genre) updateData.genre = updates.genre.trim() || "Unknown genre";
            if (updates.totalPages) {
                updateData.totalPages = updates.totalPages;
                // Handle current page adjustment if total pages change
                const currentPage = (await getDoc(bookRef)).data()?.currentPage || 0;
                updateData.currentPage = Math.min(currentPage, updates.totalPages);
                // Update status if needed
                if (updateData.currentPage >= updates.totalPages) {
                    updateData.status = "Finished";
                } else if (updateData.currentPage > 0) {
                    updateData.status = "Reading";
                }
            }

            await updateDoc(bookRef, updateData);
            toast.success("Book updated successfully!");
            return true;
        } catch (error) {
            toast.error("Failed to update book");
            console.error(error);
            return false;
        }
    };

    const deleteBook = async (id: string) => {
        try {
            const ref = doc(db, "books", id);
            await deleteDoc(ref);
            toast.success("Book deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete book");
            console.error(error);
        }
    };

    const updateProgress = async (id: string, newPage: number, totalPages: number) => {
        try {
            const bookRef = doc(db, "books", id);
            let newStatus: Book["status"] = "Reading";
            if (newPage === 0) newStatus = "Not Started";
            if (newPage >= totalPages) newStatus = "Finished";

            await updateDoc(bookRef, { currentPage: newPage, status: newStatus });
            toast.success("Progress updated successfully!");
        } catch (error) {
            toast.error("Failed to update progress");
            console.error(error);
        }
    };

    const markStatus = async (id: string, currentStatus: Book["status"], totalPages: number) => {
        try {
            const bookRef = doc(db, "books", id);
            let newStatus: Book["status"];
            let newPage: number;

            switch (currentStatus) {
                case "Not Started":
                    newStatus = "Reading";
                    newPage = 1;
                    break;
                case "Reading":
                    newStatus = "Finished";
                    newPage = totalPages;
                    break;
                case "Finished":
                    newStatus = "Not Started";
                    newPage = 0;
                    break;
                default:
                    newStatus = "Not Started";
                    newPage = 0;
            }

            await updateDoc(bookRef, { status: newStatus, currentPage: newPage });
            toast.success("Status updated successfully!");
        } catch (error) {
            toast.error("Failed to update status");
            console.error(error);
        }
    };

    return { addBook, updateBook, deleteBook, updateProgress, markStatus };
};