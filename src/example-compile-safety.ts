import { Book } from "./model/book";
import { ISBN } from "./model/isbn";

const book: Book = Book.from({
  title: "The constructor murderer!",
  isbn: ISBN.of("1234567890123"),
});

console.log(`${book}`);
console.log(book);
console.log(book.title);

const book2: Book = {
  title: "§1: How I tried to trick the constructor",
  isbn: ISBN.of("hacked"),
};
// ==> compile error: Type '{ title: string; isbn: string; }' is missing the following properties from type 'Book': _title, _isbn, withIsbnts(2739)
console.log(`${book2}`);
console.log(book2);

const book3: Book = {
  ...book,
  title: "§1: How I tried to tricks the constructor",
  isbn: ISBN.of("hacked"),
};
// ==> compile error: Type '{ title: string; isbn: string; }' is missing the following properties from type 'Book': _title, _isbn, withIsbnts(2739)

const book4: Book = {
  ...book,
  title: "§1: How I tried to tricks the constructor",
  isbn: ISBN.of("hacked"),
  _title: "I am evil on purpose",
  _isbn: ISBN.of("who does this?"),
  withIsbn: (isbn: string) => book,
};
// ==> Type '{ title: string; isbn: string; _title: string; _isbn: string; withIsbn: (isbn: string) => Book; }' is not assignable to type 'Book'. Property '_title' is private in type 'Book' but not in type '{ title: string; isbn: string; _title: string; _isbn: string; withIsbn: (isbn: string) => Book; }'.ts(2322)

const book5 = Book.from(book);
console.log(book5);

const book6 = Book.withRandomIsbn("Brand new book!");
console.log(book6);
