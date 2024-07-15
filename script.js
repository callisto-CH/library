// Credit for below code to Pro Q on stackoverflow: https://stackoverflow.com/questions/6320113/how-to-prevent-form-resubmission-when-page-is-refreshed-f5-ctrlr
// Code used under the Creative Commons Attribution-Share Alike 4.0 International (CC BY-SA 4.0) license https://creativecommons.org/licenses/by-sa/4.0/
// Whitespaces and script tags were removed from original code
if (window.history.replaceState) {
	window.history.replaceState(null, null, window.location.href);
};
// Copied code ends here

let library = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
};

Book.prototype.readToggle = function() {
	if (this.read == "Read") {
		this.read = "Not read";
	}
	else {
		this.read = "Read";
	}
}

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	library.push(newBook);
	updateLibraryDisplay(library.length-1);
};

function updateLibraryDisplay(startIndex) {
	const bookGrid = document.querySelector(".book-grid");
	for (let i = startIndex; i < library.length; i++) {
		const book = library[i];

		const bookFrag = document.createDocumentFragment();
		
		const bookDiv = document.createElement(`div`);
		bookDiv.classList.add(`book`);
		bookDiv.setAttribute("id", `${library.length}`);

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
			library.splice(deleteId-1,1);
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
			library[entryId-1].readToggle();
			let text = readButton.parentNode.querySelector(".read").textContent;
			if (text == "Read") {
				text = "Not Read"
			}
			else {
				text = "Read"
			};
			readButton.parentNode.querySelector(".read").textContent = text;
			console.log(library);
		});
		
		bookDiv.appendChild(readButton);
		bookDiv.appendChild(deleteButton);
		
		bookFrag.appendChild(bookDiv);
		bookGrid.appendChild(bookFrag);
	};
};

const form = document.querySelector("dialog");

const addBook = document.querySelector(".add-book");
addBook.addEventListener("click", () => {
	form.showModal();
});

const closeForm = document.querySelector(".close-form");
closeForm.addEventListener("click", () => {
	form.close();
});

form.addEventListener("submit", submitHandler);
function submitHandler (event) {
	event.preventDefault();
	addBookToLibrary(document.getElementById("title").value,
			document.getElementById("author").value,
			document.getElementById("pages").value,
			document.getElementById("read").checked ? "Read" : "Not read");
	document.getElementById("title").value = "";
	document.getElementById("author").value = "";
	document.getElementById("pages").value = "";
	document.getElementById("read").checked = false;
	updateLibraryDisplay(library.length);
	form.close();
};

addBookToLibrary("Of Mice and Men", "John Steinbeck", 107, "Read");

addBookToLibrary("The Stranger", "Albert Camus", 159, "Read");

addBookToLibrary("Mistborn: The Final Empire", "Brandon Sanderson", 647, "Not read");