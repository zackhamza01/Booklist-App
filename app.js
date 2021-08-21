//Book Class (Creates a Book)
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class (Manages UI Tasks)
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: "Book 1",
                author: "John Doe",
                isbn: "123433"
            },
            {
                title: "Book 2",
                author: "Jane Doe",
                isbn: "432452"
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(book) {
        if (book.classList.contains('delete')) {
            book.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class (Manages Storage)

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit (event flashes by a second and disappears)
    e.preventDefault();

    //Getting form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Instatiating Book
    const book = new Book(title, author, isbn);

    //Add book to UI
    UI.addBookToList(book);

    // Clear search fields
    UI.clearFields();
});

// Event: Remove a book
document.querySelector("#book-list").addEventListener('click', (e) => {
    UI.deleteBook(e.target);
})