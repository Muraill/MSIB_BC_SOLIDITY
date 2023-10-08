import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async ({
    deployments,
    ethers,
  }: HardhatRuntimeEnvironment) => {
    const {deploy} = deployments;
    const accounts = await ethers.getSigners();

    const deployer = accounts[0];
    // console.log("deployer =", deployer.address);
  
    // deploy Perpustakaan
     const perpustakaan = await deploy('PerpustakaanDeploy', {
        contract: "Perpustakaan",
        from: deployer.address,
        args: [],
        gasLimit: 2000000,
    });
    console.log("Perpustakaan deploy at ", perpustakaan.address);
  };

  func.tags = ['Perpustakaan'];
  export default func;