const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;

describe("MyToken", function () {
  let Token, token, owner, addr1, addr2;

  // Chạy trước mỗi test
  beforeEach(async function () {
    Token = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    token = await Token.deploy(ethers.parseEther("1000"));
    await token.waitForDeployment();
  });

  it("Token có tên đúng", async function () {
    expect(await token.name()).to.equal("MyToken");
  });

  it("Token có symbol đúng", async function () {
    expect(await token.symbol()).to.equal("MTK");
  });

  it("Owner nhận đúng số token ban đầu", async function () {
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(ethers.parseEther("1000"));
  });

  it("Chuyển token cho addr1", async function () {
    await token.transfer(addr1.address, ethers.parseEther("100"));
    const balance1 = await token.balanceOf(addr1.address);
    expect(balance1).to.equal(ethers.parseEther("100"));
  });

  it("Approve hoạt động đúng", async function () {
    // Chuyển token cho addr1 trước khi approve
    await token.transfer(addr1.address, ethers.parseEther("100"));

    // Sau khi chuyển, addr1 sẽ có allowance
    await token.connect(addr1).approve(owner.address, ethers.parseEther("50"));
    const allowance = await token.allowance(addr1.address, owner.address);

    expect(allowance).to.equal(ethers.parseEther("50"));
  });

  it("TransferFrom bởi người được approve", async function () {
    await token.approve(addr1.address, ethers.parseEther("200"));
    await token
      .connect(addr1)
      .transferFrom(owner.address, addr2.address, ethers.parseEther("100"));

    const balance2 = await token.balanceOf(addr2.address);
    expect(balance2).to.equal(ethers.parseEther("100"));
  });

  it("Chuyển token từ addr1 sang addr2", async function () {
    await token.transfer(addr1.address, ethers.parseEther("100"));
    await token.connect(addr1).approve(owner.address, ethers.parseEther("50"));
    await token
      .connect(owner)
      .transferFrom(addr1.address, addr2.address, ethers.parseEther("50"));

    const balance2 = await token.balanceOf(addr2.address);
    expect(balance2).to.equal(ethers.parseEther("50"));
  });

  it("Owner can mint tokens", async function () {
    await token.mint(addr1.address, ethers.parseEther("500"));
    const balance = await token.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseEther("500"));
  });
});
