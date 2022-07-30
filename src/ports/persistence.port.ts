import { Book } from "../model/book";
import { ISBN } from "../model/isbn";

export interface BookRepository {
  /** Retrieve a Book by given ISBN. Returns undefined if no book is found. */
  getBookByIsbn: (isbn: ISBN) => Book | undefined;
  /** Retrieve all books. */
  getBooks: () => Book[];
}
