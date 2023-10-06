// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Perpustakaan {
    
    uint256 private nonce;
    struct Book {
        uint256 isbn;
        uint256 tahunBuat;
        string judul;
        string penulis;
    }

    mapping(uint256 => Book) public books;
    uint256[] public bookISBNs; // Daftar ISBN buku

    address public admin;

    modifier onlyAdmin {
        require(msg.sender == admin, "Hanya admin yang dapat melakukan ini");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function generateRandomIsbn() public returns (uint256) {
        nonce++;
        bytes32 combineData = keccak256(abi.encodePacked('', nonce));
        uint256 randomIsbn = uint256(combineData) % 10**13;
        return randomIsbn;
    }

    function addBook(uint256 _tahunBuat, string calldata _judul, string calldata _penulis) external onlyAdmin {
        uint256 isbn = generateRandomIsbn();
        books[isbn] = Book(isbn, _tahunBuat, _judul, _penulis);
        bookISBNs.push(isbn);
    }

    function updateBook(uint256 _isbn, uint256 _tahunBuat, string calldata _judul, string calldata _penulis) external onlyAdmin {
        require(books[_isbn].isbn == _isbn, "Buku tidak ditemukan");
        books[_isbn] = Book(_isbn, _tahunBuat, _judul, _penulis);
    }

    function deleteBook(uint256 _isbn) external onlyAdmin {
        require(books[_isbn].isbn == _isbn, "Buku tidak ditemukan");

        // Hapus buku dari mapping
        delete books[_isbn];

        // Cari indeks buku dalam daftar ISBN dan hapusnya dari daftar
        uint256 indexToDelete;
        for (uint256 i = 0; i < bookISBNs.length; i++) {
            if (bookISBNs[i] == _isbn) {
                indexToDelete = i;
                break;
            }
        }
        require(indexToDelete < bookISBNs.length, "Indeks buku tidak ditemukan");

        // Pindahkan elemen terakhir ke indeks yang akan dihapus, lalu potong elemen terakhir
        uint256 lastIndex = bookISBNs.length - 1;
        bookISBNs[indexToDelete] = bookISBNs[lastIndex];
        bookISBNs.pop();
    }

    function getBook(uint256 _isbn) public view returns (bool){
        if(books[_isbn].isbn == 0) return false;
        return true;
    }
}
