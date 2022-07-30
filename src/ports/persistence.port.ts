import { Book } from "../model/book";
import { ISBN } from "../model/isbn";

export interface BookRepository {
  /** Retrieve a Book by given ISBN. Returns undefined if no book is found. */
  getBookByIsbn: (isbn: ISBN) => Promise<Book | undefined>;

  /** Retrieve all books. */
  getBooks: () => Promise<Book[]>;

  /** Add a new Book. */
  addBook: (book: Book) => Promise<void>;

  /** Delete a Book by given ISBN. */
  removeBookByIsbn: (isbn: ISBN) => Promise<void>;
}
