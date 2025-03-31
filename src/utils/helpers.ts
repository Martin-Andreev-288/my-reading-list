export const isURL = (str: string) => {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
};

export const validateOpenLibraryISBN = (url: string): boolean => {
    if (!url.startsWith('https://covers.openlibrary.org/b/isbn/')) return true;

    const isbnPart = url.split('/').pop(); // Get last segment (e.g., "ISBN-L.jpg")
    const isbn = isbnPart?.split('-')[0]; // Extract ISBN before the hyphen

    // Validate ISBN length (10 or 13 digits)
    return !!isbn && (isbn.length === 10 || isbn.length === 13);
};