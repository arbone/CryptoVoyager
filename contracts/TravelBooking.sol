// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TravelBooking is ReentrancyGuard, Ownable {
    // Strutture dati
    struct Travel {
        uint256 id;
        string name;
        string description;
        uint256 price;
        uint256 maxParticipants;
        uint256 currentParticipants;
        bool isActive;
    }

    // Variabili di stato
    mapping(uint256 => Travel) public travels;
    mapping(address => uint256[]) public userBookings;
    uint256 public travelCount;

    // Eventi
    event TravelCreated(uint256 indexed travelId, string name, uint256 price);
    event BookingConfirmed(uint256 indexed travelId, address indexed traveler);
    
    constructor() {}

    // Funzioni
    function createTravel(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _maxParticipants
    ) public onlyOwner {
        travelCount++;
        travels[travelCount] = Travel({
            id: travelCount,
            name: _name,
            description: _description,
            price: _price,
            maxParticipants: _maxParticipants,
            currentParticipants: 0,
            isActive: true
        });

        emit TravelCreated(travelCount, _name, _price);
    }

    function bookTravel(uint256 _travelId) public payable nonReentrant {
        Travel storage travel = travels[_travelId];
        require(travel.isActive, "Travel is not active");
        require(travel.currentParticipants < travel.maxParticipants, "Travel is full");
        require(msg.value == travel.price, "Incorrect payment amount");

        travel.currentParticipants++;
        userBookings[msg.sender].push(_travelId);

        emit BookingConfirmed(_travelId, msg.sender);
    }

    function getTravel(uint256 _travelId) public view returns (
        uint256 id,
        string memory name,
        string memory description,
        uint256 price,
        uint256 maxParticipants,
        uint256 currentParticipants,
        bool isActive
    ) {
        Travel memory travel = travels[_travelId];
        return (
            travel.id,
            travel.name,
            travel.description,
            travel.price,
            travel.maxParticipants,
            travel.currentParticipants,
            travel.isActive
        );
    }

    function getUserBookings() public view returns (uint256[] memory) {
        return userBookings[msg.sender];
    }
}
