 /**
   * @title MuhammadRaihandaIlham
   * @dev ContractDescription
   * @custom:dev-run-script scripts/deploy_with_ethers.ts
    */
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19;

contract MuhammadRaihandaIlham {
    uint umur = 21;
    string alamat = "Bekasi";
    string private _email = "raihandailham03@gmail.com";

    struct Blockchain {
        string nama;
        uint chain_id;
    }

    Blockchain[] public blockchains;

    function getEmail() public view returns (string memory) {
        return _email;
    }

    function addBlockchain(string memory _nama, uint _chain_id) public {
        blockchains.push(Blockchain(_nama, _chain_id));
    }

    function changeEmail(string memory email) public returns (string memory) {
        _email = email;
        return email;
    }
}