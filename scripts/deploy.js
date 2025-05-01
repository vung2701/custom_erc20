const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with address:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(ethers.parseUnits("1000", 18));
  await myToken.waitForDeployment();
  console.log("My Token deployed to:", await myToken.getAddress());

  const NewToken = await ethers.getContractFactory("NewToken");
  const newToken = await NewToken.deploy(ethers.parseEther("1000"));
  await newToken.waitForDeployment();
  console.log("New Token deployed to:", await newToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
