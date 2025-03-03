import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { type Book } from "../utils/types";

export const useCollection = (c: string) => {
    const [documents, setDocuments] = useState<Book[] | null>(null);

    useEffect(() => {
        const ref = collection(db, "books");

        const unsub = onSnapshot(ref, (snapshot) => {
            const results: Book[] = [];
            snapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...(doc.data() as Omit<Book, "id">) });
            });

            setDocuments(results);
        });

        return () => unsub();
    }, [c]);

    return { documents }
};
