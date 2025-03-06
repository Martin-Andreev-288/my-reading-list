import { useEffect, useState, useRef } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot, query, where, type Query, type DocumentData, type WhereFilterOp } from "firebase/firestore";
import { type Book } from "@/utils/types";

export const useCollection = (c: string, _q: [string, WhereFilterOp, string]) => {
    const [documents, setDocuments] = useState<Book[] | null>(null);

    const q = useRef(_q).current;

    useEffect(() => {
        console.log('Testing for endless loop');

        let ref: Query<DocumentData> = collection(db, c);

        if (q) {
            ref = query(ref, where(...q));
        }

        const unsub = onSnapshot(ref, (snapshot) => {
            const results: Book[] = [];
            snapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...(doc.data() as Omit<Book, "id">) });
            });

            setDocuments(results);
        });

        return () => unsub();
    }, [c, q]);

    return { documents }
};
