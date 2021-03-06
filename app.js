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
        const books = Store.getBooks();

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

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Make alert vanish after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class (Manages Storage)
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book,index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

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

    //Validating input fields
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill in all fields.", "danger");
    } else {
        if (isbn.length != 13 || !isNumeric(isbn)) {
            UI.showAlert("The ISBN number is invalid. Make sure it is a 13-digit number.", "danger");
        } else {
            // Instantiating Book
            const book = new Book(title, author, isbn);

            //Add book to UI
            UI.addBookToList(book);

            //Add book to local storage
            Store.addBook(book);

            //Success alert for adding
            UI.showAlert("Book added successfully.", "success");

            // Clear input fields
            UI.clearFields();
        }
        
    }
});

function isNumeric(string) {
    if (typeof string != "string") {
        return false;
    } 
    return !isNaN(string) && !isNaN(parseFloat(string));
}

// Event: Remove a book
document.querySelector("#book-list").addEventListener('click', (e) => {
    //Remove book from UI
    UI.deleteBook(e.target);

    //Remove book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Success alert for deleting
    UI.showAlert("Book removed successfully.", "success");
})