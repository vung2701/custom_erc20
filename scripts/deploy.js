const { ethers } = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory("CustomToken");

  // Deploy MyToken
  const myToken = await Token.deploy(
    "MyToken",
    "MTK",
    ethers.parseUnits("1000000", 18)
  );
  await myToken.waitForDeployment();
  console.log("MyToken deployed to:", await myToken.getAddress());

  // Deploy NewToken
  const newToken = await Token.deploy(
    "NewToken",
    "NTK",
    ethers.parseUnits("1000000", 18)
  );
  await newToken.waitForDeployment();
  console.log("NewToken deployed to:", await newToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
