document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();

    const bookForm = document.getElementById('bookForm');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const formTitle = document.getElementById('formTitle');

    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('bookId').value;
        const bookData = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            price: parseFloat(document.getElementById('price').value),
            genre: document.getElementById('genre').value
        };

        try {
            let response;
            if (id) {
                // Update book
                response = await fetch(`/api/books/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                });
            } else {
                // Add new book
                response = await fetch('/api/books', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                });
            }

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                resetForm();
                fetchBooks();
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred');
        }
    });

    cancelBtn.addEventListener('click', () => {
        resetForm();
    });

    async function fetchBooks() {
        try {
            const response = await fetch('/api/books');
            const books = await response.json();
            const tbody = document.getElementById('bookTableBody');
            tbody.innerHTML = '';

            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.price.toFixed(2)}</td>
                    <td>${book.genre}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="editBook('${book._id}', '${book.title}', '${book.author}', ${book.price}, '${book.genre}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to fetch books');
        }
    }

    window.editBook = (id, title, author, price, genre) => {
        document.getElementById('bookId').value = id;
        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('price').value = price;
        document.getElementById('genre').value = genre;
        formTitle.textContent = 'Update Book';
        submitBtn.textContent = 'Update Book';
        cancelBtn.style.display = 'inline-block';
    };

    window.deleteBook = async (id) => {
        if (confirm('Are you sure you want to delete this book?')) {
            try {
                const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    fetchBooks();
                } else {
                    alert(data.error);
                }
            } catch (err) {
                console.error('Error:', err);
                alert('An error occurred');
            }
        }
    };

    window.initBooks = async () => {
        try {
            const response = await fetch('/api/init-books');
            const data = await response.json();
            alert(data.message);
            fetchBooks();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to initialize books');
        }
    };

    function resetForm() {
        document.getElementById('bookForm').reset();
        document.getElementById('bookId').value = '';
        formTitle.textContent = 'Add New Book';
        submitBtn.textContent = 'Add Book';
        cancelBtn.style.display = 'none';
    }
});