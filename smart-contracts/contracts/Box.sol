// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title A simple public and restricted value storage example
 * @author xtyrrell (github.com/xtyrrell)
 *
 * Stores two values: `publicValue`, which anyone can read and anyone can write,
 * and `privateValue`, which anyone can read and only this contract's owner can write.
 */
contract Box is Ownable {
    uint256 private publicValue;
    uint256 private restrictedValue;

    event PublicValueChanged(uint256 newValue);
    event RestrictedValueChanged(uint256 newValue);

    function storePublic(uint256 newValue) public {
        publicValue = newValue;
        emit PublicValueChanged(newValue);
    }

    function storeRestricted(uint256 newValue) public onlyOwner {
        restrictedValue = newValue;
        emit RestrictedValueChanged(newValue);
    }

    function retrievePublic() public view returns (uint256) {
        return publicValue;
    }

    function retrieveRestricted() public view returns (uint256) {
        return restrictedValue;
    }
}
