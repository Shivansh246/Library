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

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function displayBooks(){
    let tableBody = document.querySelector('.displayTable tbody');
    tableBody.replaceChildren();
    for(const book of myLibrary){
        let newRow = tableBody.insertRow(-1);
        let titleCell = newRow.insertCell(0);
        let authorCell = newRow.insertCell(1);
        let pagesCell = newRow.insertCell(2);
        let readCell = newRow.insertCell(3);
        let toggleCell = newRow.insertCell(4);
        let removeCell = newRow.insertCell(5);

        titleCell.textContent = book.title;
        authorCell.textContent=book.author;
        pagesCell.textContent = book.pages;
        readCell.textContent = `${book.read?'read':'not read'}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle';

        toggleBtn.addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });
        removeBtn.addEventListener('click', () => {
            removeBook(book.id);
        });
        toggleCell.appendChild(toggleBtn);
        removeCell.appendChild(removeBtn);
    }
}
function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);
    displayBooks();
}

const dialog=document.querySelector('#my-dialog');
const openBtn=document.querySelector('#dialog-open');
const formCloseBtn = document.querySelector('#formSubmitBtn');

openBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    dialog.showModal();
});
formCloseBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    addBookToLib();
    dialog.close();
})
function addBookToLib(){
    const bookTitle=document.querySelector('#bookTitle').value;
    const bookAuthor=document.querySelector('#bookAuthor').value;
    const bookPages=Number(document.querySelector('#pages').value);
    let selectedRadio = document.querySelector('input[name="read"]:checked');
    const bookRead = selectedRadio.value=="read"?true:false;
    addBook(bookTitle,bookAuthor,bookPages,bookRead);
    displayBooks();
}
displayBooks();