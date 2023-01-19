console.log("PROJECT:\n==========\n");
class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.bookCount = 1;
    this.books = [];
  }

  markRead(checkbox) {
    // Loop through the books array to find the correct book to mark as read
    for(let i=0; i < this.books.length; i++){
      if(this.books[i].id == checkbox.id) {
        this.books[i].read = true;
        // Update the checkbox so it is marked as read
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    }
  }

  addBook() {
    // Grab elements that we'll be manipulating
    let title = document.getElementById("titleInput").value;
    let author = document.getElementById("authorInput").value;
    let read = document.getElementById("readCheckbox").checked;

    // Grab the library list
    const libraryList = document.getElementById("libraryList");

    // Create a new book and add it to the library
    let newBook = new Book(this.bookCount, title, author, read);
    this.books.push(newBook);

    // Create new table row
    const newRow = document.createElement("tr");
    newRow.id = `newRow${this.bookCount}`;

    // Create new table data and assign it the title
    const td1 = document.createElement("td");
    td1.textContent = newBook.title;

    // Create new table data and assign it the author
    const td2 = document.createElement("td");
    td2.textContent = newBook.author;

    // Create new table data - will contain the checkbox 
    // indicating whether book has been read or not
    const td3 = document.createElement("td");
    // Create read checkbox for new book
    const checkBox = document.createElement("input");
    checkBox.id = this.bookCount;
    checkBox.type = "checkbox";
    checkBox.name = "read";
    checkBox.checked = newBook.read;
    checkBox.disabled = newBook.read;
    // Attach click event to update unread books as read
    checkBox.addEventListener("click", () => library.markRead(checkBox));
    // Append checkbox to table data cell
    td3.appendChild(checkBox);

    // Create new table data for remove button
    const td4 = document.createElement("td");
    // Create remove book button
    const removeBtn = document.createElement("button");
    // Assign it the class to look like a remove button
    removeBtn.id = this.bookCount;
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "X";
    // Attach click event to remove a book
    removeBtn.addEventListener("click", () => library.removeBook(removeBtn.id, newRow.id));
    // Append remove button to table data cell
    td4.appendChild(removeBtn);


    // Append all the table data to table row
    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);
    newRow.appendChild(td4);
    // Append the new row to the library
    libraryList.appendChild(newRow);

    // Increment the book count
    this.bookCount++;
  }

  removeBook(bookId, rowId) {
    // Remove the book from array
    this.books = this.books.filter(book => book.id != bookId);
    // Update the DOM
    document.getElementById(rowId).remove();
  }
}

let library = new Library();

const addBookBtn = document.getElementById("addBook");
addBookBtn.addEventListener("click", () => {
  library.addBook(library.books, library.bookCount)
});