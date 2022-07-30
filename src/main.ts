import { Book } from "./model/book";
import { ISBN } from "./model/isbn";
import { InMemoryPersistenceAdapter } from "./adapter/in-memory-db.adapter";
import { BookRepository } from "./ports/persistence.port";

const bookRepo: BookRepository = new InMemoryPersistenceAdapter();

console.log(bookRepo.getBooks());
console.log(bookRepo.getBookByIsbn(ISBN.of("1234567890123")));
console.log(bookRepo.getBookByIsbn(ISBN.of("9999999999999")));

bookRepo.addBook(
  Book.from({ title: "This one is new", isbn: ISBN.of("0123456789123") })
);
console.log(bookRepo.getBooks());

bookRepo.removeBookByIsbn(ISBN.of("9999999999999"));
console.log(bookRepo.getBooks());
