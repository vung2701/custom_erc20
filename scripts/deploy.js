const { ethers } = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(ethers.parseEther("1000"));
  await token.waitForDeployment();

  console.log(`Token đã được deploy tại địa chỉ: ${token.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
