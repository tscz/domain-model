export default class Book {

    private readonly _title : string;
    private readonly _isbn: string;

    private constructor({title,isbn}: {title: string, isbn: string}) {
        if (!title || title.length === 0 || title.includes("§"))
            throw new Error(`book title is invalid: ${title}`);

        if (!isbn || !/^\d+$/.test(isbn))
            throw new Error(`isbn is invalid: ${isbn}`)

        this._title = title;
        this._isbn = isbn;
    }

    public static from({title,isbn}: {title: string, isbn: string}) {
        return new Book({title,isbn});
    }

    public static withRandomIsbn(title:string) {
        return new Book({title,isbn: `${Math.floor(Math.random() * 8999999999999) + 1000000000000}`})
    }

    public get title() {return this._title;}
    public get isbn() {return this._isbn;}


    public toString() : string {
        return `a book with title: ${this.title}`;
    }

    public withIsbn(isbn : string) : Book {
        return new Book({...this ,isbn});
    }
}