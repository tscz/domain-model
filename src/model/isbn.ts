/** An ISBN number identifying a book. */
export type ISBN = string & { _brand: "isbn" };

export namespace ISBN {
  /** Creates an ISBN. An ISBN must be 13 digits. */
  export function of(value: string): ISBN {
    if (!value || !/^\d+$/.test(value) || value.length !== 13)
      throw new Error(`isbn is invalid: ${value}`);

    return value as ISBN;
  }
}
