import { Perpustakaan, Perpustakaan__factory } from "../typechain";
import { ethers } from "hardhat";
import { PerpustakaanInterface } from "../typechain/Perpustakaan";

async function main() {
    // contract instance 
    const perpustakaan = await ethers.getContract<Perpustakaan>('PerpustakaanDeploy');

    let bookLength = await perpustakaan.bookLength();
    console.log("bookLength :", Number(bookLength));

    // get Signers
    const [admin, notAdmin] = await ethers.getSigners();

    // Tambah Buku berdasarkan ISBN dan memasukkannya kedalam index ISBN yang dimulai dari index ke-0
    // const addBook = await perpustakaan.connect(notAdmin).addBook(2022, "Testing", "Raihanda");
    // await addBook.wait();
    // console.log("bookLength :", Number(bookLength));

    // Mengambil ISBN yang telah di generate otomatis berdasarkan index
    // const getISBNs = await perpustakaan.getISBNByIndex(0);
    // console.log("BookISBN : ", Number(getISBNs));

    // Update Buku berdasarkan ISBN
    // const updateBook = await perpustakaan.connect(admin).updateBook(9459944778998, 2023, "Testing Succes", "Muhammad Raihanda Ilham");

    // Menghapus Buku
    // const deleteBook = await perpustakaan.connect(admin).deleteBook(9459944778998)


    // // Detail Buku Berdasarkan ISBN
    const DetailsBook = await perpustakaan.getBookDetail(9459944778998)
    console.log("Detail Buku :", DetailsBook)
}

main().catch((err) => {
    console.log("Error : ", err);
    process.exitCode = 1;
})