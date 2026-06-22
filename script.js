let myLibrary =[];

function Book(title,author,pages,read,id){
    if(!new.target){
        throw Error('what maa!!');
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id=id;
}

function addBook(title,author,pages,read){
    const id = crypto.randomUUID();
    let newBook = new Book(title,author,pages,read,id);
    myLibrary.push(newBook);
}
addBook('book1','author1','100',true);
addBook('book2','author2','200',true);
addBook('book3','author3','300',false);

function displayBooks(){
    let tableBody = document.querySelector('.displayTable tbody');
    tableBody.replaceChildren();
    for(const book of myLibrary){
        let newRow = tableBody.insertRow(-1);
        let titleCell = newRow.insertCell(0);
        let authorCell = newRow.insertCell(1);
        let pagesCell = newRow.insertCell(2);
        let readCell = newRow.insertCell(3);
        titleCell.textContent = book.title;
        authorCell.textContent=book.author;
        pagesCell.textContent = book.pages;
        readCell.textContent = `${book.read?'read':'not read'}`;
    }
}
displayBooks();