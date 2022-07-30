import { Book } from "./model/book";
import { ISBN } from "./model/isbn";
import { InMemoryPersistenceAdapter } from "./adapter/in-memory-db.adapter";
import { BookRepository } from "./ports/persistence.port";

const bookRepo: BookRepository = new InMemoryPersistenceAdapter();

console.log(bookRepo.getBooks());
console.log(bookRepo.getBookByIsbn(ISBN.of("1234567890123")));
console.log(bookRepo.getBookByIsbn(ISBN.of("9999999999999")));
