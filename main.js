document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    const searchForm = document.getElementById("searchBook");
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");
    
    const STORAGE_KEY = "bookshelfAppBooks";
  
    // Load books from localStorage
    const loadBooks = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
    // Save books to localStorage
    const saveBooks = (books) => localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  
    // Render books
    const renderBooks = (books) => {
      incompleteBookList.innerHTML = "";
      completeBookList.innerHTML = "";
  
      books.forEach((book) => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
          completeBookList.appendChild(bookElement);
        } else {
          incompleteBookList.appendChild(bookElement);
        }
      });
    };
  
    // Create book element
    const createBookElement = (book) => {
      const bookItem = document.createElement("div");
      bookItem.dataset.bookid = book.id;
      bookItem.dataset.testid = "bookItem";
      bookItem.classList.add("book");
  
      const title = document.createElement("h3");
      title.dataset.testid = "bookItemTitle";
      title.textContent = book.title;
  
      const author = document.createElement("p");
      author.dataset.testid = "bookItemAuthor";
      author.textContent = `Penulis: ${book.author}`;
  
      const year = document.createElement("p");
      year.dataset.testid = "bookItemYear";
      year.textContent = `Tahun: ${book.year}`;
  
      const buttons = document.createElement("div");
  
      const toggleButton = document.createElement("button");
      toggleButton.dataset.testid = "bookItemIsCompleteButton";
      toggleButton.textContent = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
      toggleButton.addEventListener("click", () => toggleBookCompletion(book.id));
  
      const deleteButton = document.createElement("button");
      deleteButton.dataset.testid = "bookItemDeleteButton";
      deleteButton.textContent = "Hapus Buku";
      deleteButton.addEventListener("click", () => deleteBook(book.id));
  
      const editButton = document.createElement("button");
      editButton.dataset.testid = "bookItemEditButton";
      editButton.textContent = "Edit Buku";
      editButton.addEventListener("click", () => editBook(book.id));
  
      buttons.appendChild(toggleButton);
      buttons.appendChild(deleteButton);
      buttons.appendChild(editButton);
  
      bookItem.appendChild(title);
      bookItem.appendChild(author);
      bookItem.appendChild(year);
      bookItem.appendChild(buttons);
  
      return bookItem;
    };
  
    // Add new book
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const books = loadBooks();
  
      const newBook = {
        id: Date.now(),
        title: bookForm.bookFormTitle.value,
        author: bookForm.bookFormAuthor.value,
        year: bookForm.bookFormYear.value,
        isComplete: bookForm.bookFormIsComplete.checked,
      };
  
      books.push(newBook);
      saveBooks(books);
      renderBooks(books);
      bookForm.reset();
    });
  
    // Toggle book completion
    const toggleBookCompletion = (id) => {
      const books = loadBooks();
      const book = books.find((book) => book.id === id);
      book.isComplete = !book.isComplete;
      saveBooks(books);
      renderBooks(books);
    };
  
    // Delete book
    const deleteBook = (id) => {
      const books = loadBooks().filter((book) => book.id !== id);
      saveBooks(books);
      renderBooks(books);
    };
  
    // Edit book
    const editBook = (id) => {
      const books = loadBooks();
      const book = books.find((book) => book.id === id);
  
      bookForm.bookFormTitle.value = book.title;
      bookForm.bookFormAuthor.value = book.author;
      bookForm.bookFormYear.value = book.year;
      bookForm.bookFormIsComplete.checked = book.isComplete;
  
      deleteBook(id);
    };
  
    // Search books
    // Search books and display results in the 'result' section
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchForm.searchBookTitle.value.toLowerCase();
    const books = loadBooks().filter((book) => book.title.toLowerCase().includes(query));
    displaySearchResults(books);
  });
  
  // Function to display search results
  const displaySearchResults = (books) => {
    const resultContainer = document.querySelector(".result");
    resultContainer.innerHTML = "<h2>Hasil pencarian:</h2>"; // Clear previous results
  
    if (books.length === 0) {
      resultContainer.innerHTML += "<p>Tidak ada hasil yang ditemukan.</p>";
      return;
    }
  
    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("searchResult");
  
      const title = document.createElement("h3");
      title.textContent = `Judul: ${book.title}`;
  
      const author = document.createElement("p");
      author.textContent = `Penulis: ${book.author}`;
  
      const year = document.createElement("p");
      year.textContent = `Tahun: ${book.year}`;
  
      const status = document.createElement("p");
      status.textContent = `Status: ${book.isComplete ? "Selesai dibaca" : "Belum selesai dibaca"}`;
  
      bookElement.appendChild(title);
      bookElement.appendChild(author);
      bookElement.appendChild(year);
      bookElement.appendChild(status);
  
      resultContainer.appendChild(bookElement);
    });
  };
  
  
    // Initial render
    renderBooks(loadBooks());
  });
  
// Update button text
function updateButtonText() {
    const isChecked = document.getElementById("bookFormIsComplete").checked;
    const buttonText = document.getElementById("buttonText");
    buttonText.textContent = isChecked ? "Selesai dibaca" : "Belum selesai dibaca";
  }
  