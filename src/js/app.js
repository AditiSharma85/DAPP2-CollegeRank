App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("CollegeRank.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.CollegeRank = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.CollegeRank.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.CollegeRank.deployed().then(function(instance) {
        instance.voted({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var collegeInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.CollegeRank.deployed().then(function(instance) {
      collegeInstance = instance;
      return collegeInstance.collegesCount();
    }).then(function(collegesCount) {
      var collegesResults = $("#collegesResults");
      collegesResults.empty();

      var collegesSelect = $('#collegesSelect');
      collegesSelect.empty();

      for (var i = 1; i <= collegesCount; i++) {
        collegeInstance.colleges(i).then(function(college) {
          var id = college[0];
          var name = college[1];
          var voteCount = college[2];

          // Render college Result
          var collegeTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          collegesResults.append(collegeTemplate);

          // Render college ballot option
          var collegeOption = "<option value='" + id + "' >" + name + "</ option>"
          collegesSelect.append(collegeOption);
        });
      }
      return collegeInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var collegeId = $('#collegesSelect').val();
    App.contracts.CollegeRank.deployed().then(function(instance) {
      return instance.vote(collegeId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});