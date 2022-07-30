import { Book } from "../model/book";
import { ISBN } from "../model/isbn";
import { BookRepository } from "../ports/persistence.port";

type BookPersistenceEntity = {
  title: string;
  isbn: string;
};

const serialize = (book: Book): BookPersistenceEntity => {
  return { title: book.title, isbn: book.isbn };
};

const deserialize = (book: BookPersistenceEntity): Book => {
  return Book.from({ title: book.title, isbn: ISBN.of(book.isbn) });
};

let inMemoryDatabase: BookPersistenceEntity[] = [
  { title: "This is a title", isbn: ISBN.of("9999999999999") },
];

export class InMemoryPersistenceAdapter implements BookRepository {
  public getBookByIsbn(isbn: ISBN): Book | undefined {
    const book = inMemoryDatabase.find((book) => book.isbn === isbn);
    return !book ? undefined : deserialize(book);
  }

  public getBooks() {
    return [...inMemoryDatabase].map(deserialize);
  }

  public addBook(book: Book) {
    this.removeBookByIsbn(book.isbn);
    inMemoryDatabase.push(serialize(book));
  }

  public removeBookByIsbn(isbn: ISBN) {
    inMemoryDatabase = inMemoryDatabase.filter((book) => book.isbn !== isbn);
  }
}
