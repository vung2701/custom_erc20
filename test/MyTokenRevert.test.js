const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers"); // 💥 Import cần thiết để dùng reverted

describe("MyToken - Các test nâng cao", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    token = await Token.deploy(ethers.parseEther("1000"));
    await token.waitForDeployment();
  });

  it("Không chuyển token nếu không đủ balance", async () => {
    await expect(
      token.connect(addr1).transfer(addr2.address, ethers.parseEther("1"))
    ).to.be.reverted;
  });

  it("Emit sự kiện Transfer đúng", async () => {
    await expect(token.transfer(addr1.address, ethers.parseEther("100")))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, ethers.parseEther("100"));
  });

  it("Không thể transferFrom nếu chưa approve", async () => {
    await expect(
      token
        .connect(addr1)
        .transferFrom(owner.address, addr2.address, ethers.parseEther("100"))
    ).to.be.reverted;
  });

  // Bỏ qua test mint nếu contract chưa có hàm mint
  // Nếu bạn có hàm mint thì mở comment ra
  //   it("Chỉ owner mới có thể mint (nếu có)", async () => {
  //     await expect(
  //       token.connect(addr1).mint(addr1.address, ethers.parseEther("100"))
  //     ).to.be.reverted;
  //   });
});
