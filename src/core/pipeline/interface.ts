export interface Pipeline<E> {
    hookUser (userId: string, elementId: string): void;
    write (element: E): string;
    remove (elementId: string): void;
}

