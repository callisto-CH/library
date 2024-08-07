// Credit for below code to Pro Q on stackoverflow: https://stackoverflow.com/questions/6320113/how-to-prevent-form-resubmission-when-page-is-refreshed-f5-ctrlr
// Code used under the Creative Commons Attribution-Share Alike 4.0 International (CC BY-SA 4.0) license https://creativecommons.org/licenses/by-sa/4.0/
// Whitespaces and script tags were removed from original code
if (window.history.replaceState) {
	window.history.replaceState(null, null, window.location.href);
};
// Copied code ends here

class Book {

	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	};

	readToggle() {
		this.read = this.read == "Read" ? "Not read" : "Read";
	};

};

class Library {

	constructor() {
		this.contents = [];
	};

	addBook(book) {
		this.contents.push(book);
		this.render(this.contents.length-1);
	};

	render(startIndex) {
		const bookGrid = document.querySelector(".book-grid");
		for (let i = startIndex; i < this.contents.length; i++) {
			const book = this.contents[i];
	
			const bookFrag = document.createDocumentFragment();
		
			const bookDiv = document.createElement(`div`);
			bookDiv.classList.add(`book`);
			bookDiv.setAttribute("id", `${this.contents.length}`);

			const infoArray = [["Title: ", "title"], 
					   ["Author: ", "author"], 
					   ["Pages: ", "pages"], 
					   [``, "read"]];
			infoArray.forEach((info) => {
				const bookInfo = document.createElement("div");
				if (info[0] == "Title: ") {
					const span = document.createElement("span");
					bookInfo.textContent = info[0];
					span.textContent = `${book[info[1]]}`;
					bookInfo.appendChild(span);
				}
				else {
					bookInfo.textContent = info[0] + `${book[info[1]]}`;
				}
				bookInfo.classList.add(info[1]);
				bookDiv.appendChild(bookInfo);
			});
		
			const deleteButton = document.createElement(`button`);
			deleteButton.textContent = "Delete";
			deleteButton.classList.add("deleteButton");
			deleteButton.addEventListener("click", () => {
				const deleteId = deleteButton.parentNode.getAttribute("id");
				this.contents.splice(deleteId-1,1);
				deleteButton.parentNode.remove();
				document.querySelectorAll(".book").forEach((entry) => {
					const entryId = +entry.getAttribute("id");
					if (entryId > deleteId) {
						entry.setAttribute("id", entryId-1);
					};
				});
			});
		
			const readButton = document.createElement(`button`);
			readButton.textContent = "Toggle read";
			readButton.classList.add(`readButton`);
			readButton.addEventListener("click", () => {
				const entryId = +readButton.parentNode.getAttribute("id");
				this.contents[entryId-1].readToggle();
				let text = readButton.parentNode.querySelector(".read").textContent;
				text = text == "Read" ? "Not Read" : "Read";
				readButton.parentNode.querySelector(".read").textContent = text;
			});
		
			bookDiv.appendChild(readButton);
			bookDiv.appendChild(deleteButton);
		
			bookFrag.appendChild(bookDiv);
			bookGrid.appendChild(bookFrag);
		};
	};

};

const library = new Library();

class Form {

	constructor() {
		this.modal = document.querySelector("dialog");
		this.addBookBtn = document.querySelector(".add-book");
		this.closeFormBtn = document.querySelector(".close-form");
		this.title = document.getElementById("title");
		this.author = document.getElementById("author");
		this.pages = document.getElementById("pages");
		this.read = document.getElementById("read")
	};

	initialize() {
		this.addBookBtn.addEventListener("click", () => {
			this.modal.showModal();
		});
		this.closeFormBtn.addEventListener("click", () => {
			this.modal.close();
		});
		this.modal.addEventListener("submit", (event) => {
			event.preventDefault();
			library.addBook(new Book(form.title.value, form.author.value, form.pages.value, form.read.checked ? "Read" : "Not read"));
			form.title.value = "";
			form.pages.value = "";
			form.author.value = "";
			form.pages.value = "";
			form.read.checked = false;
			form.modal.close();
		});
	};

};

const form = new Form();
form.initialize();

library.addBook(new Book("Of Mice and Men", "John Steinbeck", 107, "Read"));

library.addBook(new Book("The Stranger", "Albert Camus", 159, "Read"));

library.addBook(new Book("Mistborn: The Final Empire", "Brandon Sanderson", 647, "Not read"));