import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
// import { Perpustakaan } from "../typechain";
import chai from "chai";
import { ethers } from "hardhat";
import { Perpustakaan } from "../typechain";

const { expect } = chai;

describe("Perpustakaan Contract", () => {
    let perpustakaan: Perpustakaan;
    let admin: HardhatEthersSigner;
    let notAdmin: HardhatEthersSigner;
    beforeEach(async () => {
        // get Signers
        const accounts = await ethers.getSigners();
        admin = accounts[0];
        notAdmin = accounts[1];

        // Deploy contracts
        perpustakaan = await (await ethers.getContractFactory("Perpustakaan")).connect(admin).deploy(); 

        // Tambah Buku
        await perpustakaan.connect(admin).addBook(2022, "Testing", "Raihanda");

    })

    describe("Read Function", () => {
        it("bookLength() => return 0", async () => {
            const bookLength = await perpustakaan.bookLength();
            expect(bookLength).to.equal(1);
        }),
        it("getBookByISBN(0) => Success, untuk melihat isbn", async () => {
            const getISBNs = await perpustakaan.getISBNByIndex(0)
            expect(Number(getISBNs)).to.be.all;
            // ISBN yang didapat berdasarkan index ke-0
            console.log("ISBN yang didapatkan : ", Number(getISBNs))
        }),
        // getBook berdasarkan ISBN yang telah didapatkan sebelumnya
        it("detailBook(isbn) => Success", async () => {
            let DetailsBook = await perpustakaan.getBookDetail(9459944778998)
            expect(DetailsBook).to.be.all;
            console.log("Detail buku berdasarkan ISBN : ", DetailsBook)
        })
    })
    describe("Write Function", () => {
        // Melakukan Update buku berdasarkan ISBN yang telah didapatkan sebelumnya
        it("UpdateBook() => Success"), async () => {
            const updateBook = await perpustakaan.connect(admin).updateBook(9459944778998, 2023, "Testing Succes", "Muhammad Raihanda Ilham");
            expect(updateBook).to.be.all;
        }
        //Melakukan Delete Buku berdasarkan ISBN yang telah didapatkan sebelumnya
        it("DeleteBook() => Success"), async () => {
            const deleteBook = await perpustakaan.connect(admin).deleteBook(9459944778998);
            expect(deleteBook).to.be.all;
        }
    })
})