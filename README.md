<h1>College Rank Dapp</h1>

Submitted By:Aditi Sharma
StudentId : 101240263

<h2>Overview</h2>

This application uses blockchain for MBA College Ranking.It uses Ethereum blockchain to capture votes from Alumnis adding more credibility to the ranking and ensures no more than one vote per user.

<h2>Problem:</h2>
Existing MBA College Ranking systems are centralized and controlled by publishing houses.They use alumi data and synthesize into ranks.Consumers of these reports get to see the rank but not what goes in the making.

<h2>Solution:</h2>
A blockchain based decentralized college ranking system where alumis get to vote(one vote per user) and contribute to college ranking.Tamperproof votes, no double voting, no adminstration around consolidation of results and a transaprent process.


<h2>Architecture:</h2>

This shows how user interacts which Dapp and further how various layers of DAPP (Client side/Webpage,Metamask, blockchain and smart contract) interact with each other

<p align="center">
  <img src="./images/HighLevelArchitecture.PNG" alt="My cool logo"/>
</p>

<h2>How to Run this Project</h2>

Follow the steps below to download, install, and run this project.

Dependencies
Install these prerequisites.

NPM: https://nodejs.org
Truffle: https://github.com/trufflesuite/truffle
Ganache: http://truffleframework.com/ganache/
Metamask: https://metamask.io/

Step 1. Clone the project
git clone https://github.com/AditiSharma85/DAPP2-CollegeRank

Step 2. Install dependencies
$ cd DAPP2-CollegeRank
$ npm install

Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance. 

Step 4. Compile & Deploy CollegeRank Smart Contract
$ truffle migrate --reset You must migrate the CollegeRank smart contract each time your restart ganache.

Step 5. Configure Metamask

Unlock Metamask
Connect metamask to your local Etherum blockchain provided by Ganache.
Import an account provided by ganache.

Step 6. Run the Front End Application
$ npm run dev Visit this URL in your browser: http://localhost:3000

<h2>References:</h2>
Tutorials from Dapp University By Gregory : https://www.dappuniversity.com/
