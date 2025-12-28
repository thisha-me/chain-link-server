// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UniversalRegistry {

    mapping(bytes32 => mapping(bytes32 => bytes)) private records;

    event RecordSet(
        bytes32 indexed namespace,
        bytes32 indexed key,
        bytes value,
        address caller,
        uint256 timestamp
    );

    function setRecord(
        bytes32 namespace,
        bytes32 key,
        bytes calldata value
    ) external {
        records[namespace][key] = value;
        emit RecordSet(namespace, key, value, msg.sender, block.timestamp);
    }

    function getRecord(
        bytes32 namespace,
        bytes32 key
    ) external view returns (bytes memory) {
        return records[namespace][key];
    }
}
