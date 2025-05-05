# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

PS C:\Users\Admin\Desktop\learn\projects\web3\erc20-project> npx hardhat run scripts/deploy.js --network sepolia
Bắt đầu triển khai lên Sepolia...
Địa chỉ deployer: 0x089A9Dd26d522f35AC1702B8f7a41B6Ee3D93dCc
Số dư deployer: 0.417443829707721867 ETH

Triển khai MyToken (MTK)...
Hash giao dịch MyToken: 0x4dd121319f709ba06a5fd05da809404251d466062de151a01427917c726c64f8
MyToken đã triển khai tại: 0x6046A61b5d86914Ba22B9255890c3221406b90E2

Triển khai NewToken (NTK)...
Hash giao dịch NewToken: 0x4a529ab69bd930da106820233ae4ea9bf4ebe900aea785275d6bbae7d16d1ce8
NewToken đã triển khai tại: 0x7c39BDa09892a1457C48fF7fa787Ba897a1B81E5

--- Kết quả triển khai ---
MyToken Address: 0x6046A61b5d86914Ba22B9255890c3221406b90E2
NewToken Address: 0x7c39BDa09892a1457C48fF7fa787Ba897a1B81E5

Kịch bản hoàn tất.
