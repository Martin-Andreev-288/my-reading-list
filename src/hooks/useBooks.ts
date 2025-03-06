import { useAuthContext } from "@/hooks/useAuthContext";
import { db } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Book } from "@/utils/types";

export const useBooks = () => {
    const { user } = useAuthContext();

    const addBook = async (formData: { title: string; author: string; genre: string; totalPages: string }) => {
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
            });
            toast.success("Book added successfully!");
            return true;
        } catch (error) {
            toast.error("Failed to add book");
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

    return { addBook, deleteBook, updateProgress, markStatus };
};