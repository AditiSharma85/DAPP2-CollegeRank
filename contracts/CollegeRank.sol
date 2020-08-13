pragma solidity ^0.5.0;

contract CollegeRank{
    //Model a college
    struct College {
        uint id;
        string name;
        uint voteCount;
        }
    //Store accounts that have voted
    mapping(address => bool) public voters;
    // Store college
    // Fetch college
    mapping(uint => College) public colleges;
    // Store Colleges Count
    uint public collegesCount;
    //event for capturing vote
    event voted (
        uint indexed _collegeId
    );

     //Constructor
constructor () public {
    addCollege("Concordia University: John Molson");
    addCollege("McGill University: Desautels");
    addCollege("Queen's University: Smith");
    addCollege("Western University: Ivey");
    addCollege("York University: Schulich");
}
function addCollege (string memory _name) private{
    collegesCount ++;
    colleges[collegesCount] = College(collegesCount, _name, 0);
}
function vote(uint _collegeId) public {
    // require that they haven't voted before
    require(!voters[msg.sender], "Only one vote allowed per voter"); 
    // require a valid college
    require(_collegeId >0 && _collegeId <= collegesCount , "Invalid College");

    // record that voter has voted
    voters[msg.sender] = true;
    // update college vote count
    colleges[_collegeId].voteCount++;

    //trigger voted event
    emit voted(_collegeId);
}
}