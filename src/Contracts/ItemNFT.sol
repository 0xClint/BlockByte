// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlockByteItems is ERC1155, Ownable {
    using Counters for Counters.Counter;

    string private _baseTokenURI;
    uint256 public baseFee;

    uint256 public constant MAX_LEVEL = 50;
    Counters.Counter private _nextTokenId;
    uint256 public immutable maxSupply;

    struct Item {
        uint256 tokenId;
        address owner;
        string uri;
        uint256 level;
        string username;
        string description;
    }

    mapping(uint256 => Item) private items;
    mapping(uint256 => bool) public tokenExists;
    mapping(uint256 => address) public tokenOwners;

    event ItemCreated(uint256 indexed tokenId, address indexed owner, string uri, uint256 level, string username, string description);
    event ItemLevelUp(uint256 indexed tokenId, uint256 newLevel);
    event BaseFeeChanged(uint256 newBaseFee);
    event TokenURIUpdated(uint256 indexed tokenId, string newURI);

    modifier onlyOwnerOrAuthorized(uint256 _tokenId) {
        require(msg.sender == owner() || msg.sender == creatorOf(_tokenId), "Not authorized");
        _;
    }

    constructor(uint256 _maxSupply, string memory baseTokenURI, uint256 _baseFee) 
        ERC1155(baseTokenURI) 
        Ownable(msg.sender) 
    {
        require(_maxSupply > 0, "Max supply must be greater than zero");
        maxSupply = _maxSupply;
        _baseTokenURI = baseTokenURI;
        baseFee = _baseFee;
        _transferOwnership(msg.sender); 
    }

    function createItem(address _owner, string memory _uri, uint256 _quantity, uint256 _initialLevel, string memory _username, string memory _description)
        external
        payable
        returns (uint256)
    {
        require(_quantity > 0, "Quantity must be greater than zero");
        require(_initialLevel > 0 && _initialLevel <= MAX_LEVEL, "Invalid initial level");
        uint256 totalFee = baseFee * _quantity;
        require(msg.value >= totalFee, "Insufficient fee");
        require(_nextTokenId.current() + _quantity <= maxSupply, "Max supply reached");

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 tokenId = _nextTokenId.current();
            _mint(_owner, tokenId, 1, "");
            items[tokenId] = Item({
                tokenId: tokenId,
                owner: _owner,
                uri: _uri,
                level: _initialLevel,
                username: _username,
                description: _description
            });
            tokenExists[tokenId] = true;
            tokenOwners[tokenId] = _owner;
            emit ItemCreated(tokenId, _owner, _uri, _initialLevel, _username, _description);
            _nextTokenId.increment();
        }

        return _nextTokenId.current() - 1;
    }

    function levelUp(uint256 _tokenId) external onlyOwnerOrAuthorized(_tokenId) {
        require(tokenExists[_tokenId], "Token does not exist");
        Item storage item = items[_tokenId];
        require(item.level < MAX_LEVEL, "Item is already at max level");

        item.level++;
        emit ItemLevelUp(_tokenId, item.level);
    }

    function updateURI(uint256 _tokenId, string memory _newURI) external onlyOwnerOrAuthorized(_tokenId) {
        require(tokenExists[_tokenId], "Token does not exist");
        Item storage item = items[_tokenId];
        require(msg.sender == item.owner, "Only the owner of the token can update its URI");

        item.uri = _newURI;
        emit TokenURIUpdated(_tokenId, _newURI);
    }

    function setBaseFee(uint256 _newBaseFee) external onlyOwner {
        baseFee = _newBaseFee;
        emit BaseFeeChanged(_newBaseFee);
    }

    function uri(uint256 _tokenId) public view override returns (string memory) {
        require(tokenExists[_tokenId], "Token does not exist");
        return string(abi.encodePacked(_baseURI(), items[_tokenId].uri));
    }

    function creatorOf(uint256 _tokenId) public view returns (address) {
        require(tokenExists[_tokenId], "Token does not exist");
        return items[_tokenId].owner;
    }

    function getItem(uint256 _tokenId) external view returns (Item memory) {
        require(tokenExists[_tokenId], "Token does not exist");
        return items[_tokenId];
    }

    function getAllItems() external view returns (Item[] memory) {
        uint256 totalItems = _nextTokenId.current();
        Item[] memory allItems = new Item[](totalItems);

        for (uint256 i = 0; i < totalItems; i++) {
            allItems[i] = items[i];
        }

        return allItems;
    }

    function getItemsByOwner(address _owner) external view returns (Item[] memory) {
        uint256 count = 0;
        uint256 totalItems = _nextTokenId.current();

        for (uint256 i = 0; i < totalItems; i++) {
            if (items[i].owner == _owner) {
                count++;
            }
        }

        Item[] memory ownerItems = new Item[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < totalItems; i++) {
            if (items[i].owner == _owner) {
                ownerItems[index] = items[i];
                index++;
            }
        }

        return ownerItems;
    }

    function _baseURI() internal view returns (string memory) {
        return _baseTokenURI;
    }

    receive() external payable {
        revert("Direct payments not allowed");
    }

    fallback() external payable {
        revert("Fallback function called");
    }
}
\