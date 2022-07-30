import { Book } from "../model/book";
import { ISBN } from "../model/isbn";
import { BookRepository } from "../ports/persistence.port";
import * as mongoDB from "mongodb";

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

export class MongoDBAdapter implements BookRepository {
  private collection: mongoDB.Collection<BookPersistenceEntity>;

  constructor(readonly db: mongoDB.Db) {
    this.collection = db.collection("books");
  }

  public async getBookByIsbn(isbn: ISBN): Promise<Book | undefined> {
    const book = await this.collection.findOne({ isbn });
    return !book ? undefined : deserialize(book);
  }

  public async getBooks() {
    return (await this.collection.find({}).toArray()).map(deserialize);
  }

  public async addBook(book: Book) {
    this.collection.findOneAndUpdate({ isbn: book.isbn }, serialize(book));
  }

  public async removeBookByIsbn(isbn: ISBN) {
    this.collection.findOneAndDelete({ isbn });
  }
}
