import { Book } from "../model/book";
import { ISBN } from "../model/isbn";
import { BookRepository } from "../ports/persistence.port";

type BookPersistenceEntity = {
  _id: string;
  title: string;
  isbn: string;
};

const deserialize = (book: BookPersistenceEntity): Book => {
  return Book.from({ title: book.title, isbn: ISBN.of(book.isbn) });
};

const inMemoryDatabase: BookPersistenceEntity[] = [
  { _id: "0", title: "This is a title", isbn: ISBN.of("9999999999999") },
];

export class InMemoryPersistenceAdapter implements BookRepository {
  public getBookByIsbn(isbn: ISBN): Book | undefined {
    const book = inMemoryDatabase.find((book) => book.isbn === isbn);
    return !book ? undefined : deserialize(book);
  }
  public getBooks() {
    return [...inMemoryDatabase].map(deserialize);
  }
}
