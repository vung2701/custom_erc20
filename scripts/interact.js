const { ethers } = require("hardhat");

async function main() {
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const Token = await ethers.getContractFactory("MyToken");
  const token = Token.attach(address); // Gắn địa chỉ đã deploy

  console.log("Contract attached at:", token.target);

  const name = await token.name();
  console.log("Token Name:", name);

  const symbol = await token.symbol();
  console.log("Token Symbol:", symbol);

  const totalSupply = await token.totalSupply();
  console.log("Tổng cung:", ethers.formatEther(totalSupply));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
