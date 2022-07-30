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

export class InMemoryPersistenceAdapter implements BookRepository {
  private inMemoryDatabase: BookPersistenceEntity[] = [
    { title: "This is a title", isbn: ISBN.of("9999999999999") },
  ];

  public async getBookByIsbn(isbn: ISBN): Promise<Book | undefined> {
    const book = this.inMemoryDatabase.find((book) => book.isbn === isbn);
    return !book ? undefined : deserialize(book);
  }

  public async getBooks() {
    return [...this.inMemoryDatabase].map(deserialize);
  }

  public async addBook(book: Book) {
    this.removeBookByIsbn(book.isbn);
    this.inMemoryDatabase.push(serialize(book));
  }

  public async removeBookByIsbn(isbn: ISBN) {
    this.inMemoryDatabase = this.inMemoryDatabase.filter(
      (book) => book.isbn !== isbn
    );
  }
}
