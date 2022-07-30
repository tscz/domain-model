import { ISBN } from "./isbn";

export class Book {
  private readonly _title: string;
  private readonly _isbn: ISBN;

  private constructor({ title, isbn }: { title: string; isbn: ISBN }) {
    if (!title || title.length === 0 || title.includes("§"))
      throw new Error(`book title is invalid: ${title}`);

    this._title = title;
    this._isbn = isbn;
  }

  public static from({ title, isbn }: { title: string; isbn: ISBN }) {
    return new Book({ title, isbn });
  }

  public static withRandomIsbn(title: string) {
    return new Book({
      title,
      isbn: `${
        Math.floor(Math.random() * 8999999999999) + 1000000000000
      }` as ISBN,
    });
  }

  public get title() {
    return this._title;
  }
  public get isbn() {
    return this._isbn;
  }

  public toString(): string {
    return `a book with title: ${this.title}`;
  }

  public withIsbn(isbn: string): Book {
    return new Book({ ...this, isbn });
  }
}
