// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(
        uint256 initSupply
    ) ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, initSupply);
    }

    function mint(address to, uint256 amount) public {
        if (balanceOf(to) >= 200 * (10 ** decimals())) {
            require(
                msg.sender == owner(),
                "Only owner can mint to this address"
            );
        }
        _mint(to, amount);
    }
}
