const { ethers } = require("hardhat");

async function main() {
  console.log("Bắt đầu triển khai lên Sepolia...");

  // Lấy tài khoản deployer
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log("Địa chỉ deployer:", deployer.address);
  console.log("Số dư deployer:", ethers.formatEther(balance), "ETH");

  // Kiểm tra số dư (dự trù ETH cần thiết)
  const requiredBalance = ethers.parseUnits("0.1", "ether");
  if (balance < requiredBalance) {
    throw new Error("Thiếu ETH: cần ít nhất 0.1 ETH để triển khai.");
  }

  // Lấy contract factory của CustomToken
  const Token = await ethers.getContractFactory("CustomToken");

  let myTokenAddress = null;
  let newTokenAddress = null;

  // Điều chỉnh gas price cao hơn
  const gasLimit = 3000000;
  const gasPrice = ethers.parseUnits("50", "gwei"); // Tăng lên 50 Gwei

  // Triển khai MyToken
  try {
    console.log("\nTriển khai MyToken (MTK)...");
    const myToken = await Token.deploy(
      "MyToken",
      "MTK",
      ethers.parseUnits("1000", 18), // tổng cung 1000 token
      { gasLimit, gasPrice }
    );
    const tx = myToken.deploymentTransaction();
    console.log("Hash giao dịch MyToken:", tx.hash);
    await myToken.waitForDeployment();
    myTokenAddress = await myToken.getAddress();
    console.log("MyToken đã triển khai tại:", myTokenAddress);
  } catch (error) {
    console.error("Triển khai MyToken thất bại:", error);
    process.exit(1);
  }

  // Triển khai NewToken
  try {
    console.log("\nTriển khai NewToken (NTK)...");
    const newToken = await Token.deploy(
      "NewToken",
      "NTK",
      ethers.parseUnits("1000", 18), // tổng cung 1000 token
      { gasLimit, gasPrice }
    );
    // Sửa lỗi: Gọi deploymentTransaction như một hàm
    const tx2 = newToken.deploymentTransaction();
    console.log("Hash giao dịch NewToken:", tx2.hash);
    await newToken.waitForDeployment();
    newTokenAddress = await newToken.getAddress();
    console.log("NewToken đã triển khai tại:", newTokenAddress);
  } catch (error) {
    console.error("Triển khai NewToken thất bại:", error);
  }

  // Kết quả triển khai
  console.log("\n--- Kết quả triển khai ---");
  if (myTokenAddress) {
    console.log(`MyToken Address: ${myTokenAddress}`);
  }
  if (newTokenAddress) {
    console.log(`NewToken Address: ${newTokenAddress}`);
  } else {
    console.log("NewToken Address: Chưa được triển khai");
  }
}

main()
  .then(() => {
    console.log("\n Kịch bản hoàn tất.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Lỗi không mong muốn trong quá trình triển khai:", error);
    process.exit(1);
  });
