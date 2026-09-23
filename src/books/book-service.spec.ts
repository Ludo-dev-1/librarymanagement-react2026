import { beforeEach, describe, expect, it } from 'vitest';

import type { Book } from './book';
import {BookService} from './book-service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it('should add a book correctly', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(true);
  });

  // Test : L'ajout d'un livre sans titre ne doit pas fonctionner
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    });
    it('add a book without title shouldn\'t function ', () => {
      const book: Book = {
        id:23,
        title: '',
        author: 'Author',
        availableCopies: 1,
        totalCopies: 1,
      };
      const result = service.addBook(book);
      expect(result).toBe(false)
    })
  });



  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    })
    it ('Adding a book with totalCopies set to 0 or a negative value must not work.',()=>{
      const book: Book = {
        id:35,
        title: 'tset',
        author: 'auteur test',
        availableCopies: 8,
        totalCopies:-1,
      };
      const result = service.addBook(book);
      expect(result).toBe(false)
    })
  })

  // Test : Emprunter un livre doit décrémenter availableCopies
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    })
    it("Borrowing a book must decrement availableCopies.",()=>{
      const book: Book = {
        id:23,
        title: 'etst',
        author: 'Author',
        availableCopies: 1,
        totalCopies: 1,
      };
      service.addBook(book);
      service.borrowBook(23);
      service.getBooks()
      expect(book.availableCopies).toBe(0)
    })
  })

  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    })
    it("Do not borrow a book where availableCopies equals 0.",()=>{
      const book: Book = {
        id: 10,
        title: 'Test Book',
        author: 'Author',
        availableCopies: 0,
        totalCopies: 1,
      };
      service.addBook(book);
      service.getBooks()
      expect(service.borrowBook(10)).toBe(false)
    })
  })

  // Test : Ne pas emprunter un livre qui n'existe pas
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    })
    it("Do not borrow a book that does not exist",()=>{
    service.getBooks()
      expect(service.borrowBook(4)).toBe(false)
    })
  })

  // Test : Retourner un livre doit incrémenter availableCopies
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    })
    it("Returning a book must increment availableCopies.",()=>{
      const book: Book = {
        id:10,
        title: 'L\equipe',
        author: 'Author',
        availableCopies: 4,
        totalCopies: 1,
      };
      service.addBook(book);
      service.getBooks();
      service.returnBook(10)
      expect(book.availableCopies).toBe(5)
    })
  })
  // Test : Ne pas retourner un livre qui n'existe pas
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    })
    it("Do not return a book that does not exist",()=> {
      service.getBooks();
      expect(service.returnBook(4)).toBe(false)
    })
  })

  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    })
    it("Do not return a book for which all copies have already been returned.",()=>{
      const book: Book = {
        id:10,
        title: 'L\equipe',
        author: 'Author',
        availableCopies: 4,
        totalCopies: 0,
      };
      service.addBook(book);
      service.getBooks();
      expect(service.returnBook(10)).toBe(false)
    })
  })

  // Ajoute des tests de ton choix pour les autres méthodes
  // Test : Ne pas pouvoir emprunter un livre qui a été supprimé
  describe('BookService', () => {
    let service: BookService;
    beforeEach(() => {
      service = new BookService();
    })
    it("Unable to borrow a book that has been removed",()=>{
      service.getBooks();
      service.deleteBook(1)
      expect(service.borrowBook(1)).toBe(false)
    })
  })

});
