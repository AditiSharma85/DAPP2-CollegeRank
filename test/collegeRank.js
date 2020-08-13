var CollegeRank = artifacts.require("./CollegeRank.sol");

contract("CollegeRank", function(accounts) {
    var collegeRankInstance;
  
    it("initializes with five MBA colleges", function() {
      return CollegeRank.deployed().then(function(instance) {
        return instance.collegesCount();
      }).then(function(count) {
        assert.equal(count, 5);
      });
    });
  
    it("it initializes the colleges with the correct values", function() {
      return CollegeRank.deployed().then(function(instance) {
        collegeRankInstance = instance;
        return collegeRankInstance.colleges(1);
      }).then(function(college) {
        assert.equal(college[0], 1, "contains the correct id");
        assert.equal(college[1], "Concordia University: John Molson", "contains the correct name");
        assert.equal(college[2], 0, "contains the correct votes count");
        return collegeRankInstance.colleges(2);
      }).then(function(college) {
        assert.equal(college[0], 2, "contains the correct id");
        assert.equal(college[1], "McGill University: Desautels", "contains the correct name");
        assert.equal(college[2], 0, "contains the correct votes count");
        return collegeRankInstance.colleges(3);
    }).then(function(college) {
        assert.equal(college[0], 3, "contains the correct id");
        assert.equal(college[1], "Queen's University: Smith", "contains the correct name");
        assert.equal(college[2], 0, "contains the correct votes count");
        return collegeRankInstance.colleges(4);
    }).then(function(college) {
        assert.equal(college[0], 4, "contains the correct id");
        assert.equal(college[1], "Western University: Ivey", "contains the correct name");
        assert.equal(college[2], 0, "contains the correct votes count");
        return collegeRankInstance.colleges(5);
      }).then(function(college) {
        assert.equal(college[0], 5, "contains the correct id");
        assert.equal(college[1], "York University: Schulich", "contains the correct name");
        assert.equal(college[2], 0, "contains the correct votes count");
      });
    });

    it("allows a voter to cast a vote", function() {
        return CollegeRank.deployed().then(function(instance) {
          collegeRankInstance = instance;
          collegeId = 1;
          return collegeRankInstance.vote(collegeId, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "voted", "the event type is correct");
            assert.equal(receipt.logs[0].args._collegeId.toNumber(), collegeId, "the college id is correct");
            return collegeRankInstance.voters(accounts[0]);
        }).then(function(voted) {
          assert(voted, "the voter was marked as voted");
          return collegeRankInstance.colleges(collegeId);
        }).then(function(college) {
          var voteCount = college[2];
          assert.equal(voteCount, 1, "increments the college's vote count");
        })
      });

      it("throws an exception for invalid college", function() {
        return CollegeRank.deployed().then(function(instance) {
          collegeRankInstance = instance;
          return collegeRankInstance.vote(99, { from: accounts[1] })
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return collegeRankInstance.colleges(1);
        }).then(function(college1) {
          var voteCount = college1[2];
          assert.equal(voteCount, 1, "college 1 did not receive any votes");
          return collegeRankInstance.colleges(2);
        }).then(function(college2) {
          var voteCount = college2[2];
          assert.equal(voteCount, 0, "college 2 did not receive any votes");
          return collegeRankInstance.colleges(3);
        }).then(function(college3) {
          var voteCount = college3[2];
          assert.equal(voteCount, 0, "college 3 did not receive any votes");
          return collegeRankInstance.colleges(4);
        }).then(function(college4) {
          var voteCount = college4[2];
          assert.equal(voteCount, 0, "college 4 did not receive any votes");
          return collegeRankInstance.colleges(5);
        }).then(function(college5) {
          var voteCount = college5[2];
          assert.equal(voteCount, 0, "college 5 did not receive any votes");
        });
      });
    
      it("throws an exception for double voting", function() {
        return CollegeRank.deployed().then(function(instance) {
          collegeRankInstance = instance;
          collegeId = 2;
          collegeRankInstance.vote(collegeId, { from: accounts[1] });
          return collegeRankInstance.colleges(collegeId);
        }).then(function(college) {
          var voteCount = college[2];
          assert.equal(voteCount, 1, "accepts first vote");
          // Try to vote again
          return collegeRankInstance.vote(collegeId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return collegeRankInstance.colleges(1);
        }).then(function(college1) {
          var voteCount = college1[2];
          assert.equal(voteCount, 1, "college 1 did not receive any votes");
          return collegeRankInstance.colleges(2);
        }).then(function(college2) {
          var voteCount = college2[2];
          assert.equal(voteCount, 1, "college 2 did not receive any votes");
          return collegeRankInstance.colleges(3);
        }).then(function(college3) {
          var voteCount = college3[2];
          assert.equal(voteCount, 0, "college 3 did not receive any votes");
          return collegeRankInstance.colleges(4);
        }).then(function(college4) {
          var voteCount = college4[2];
          assert.equal(voteCount, 0, "college 4 did not receive any votes");
          return collegeRankInstance.colleges(5);
        }).then(function(college5) {
          var voteCount = college5[2];
          assert.equal(voteCount, 0, "college 5 did not receive any votes");
        });
      });
});