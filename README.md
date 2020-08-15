<h1>College Rank Dapp</h1>
<p align="left">
  <img src="/src/images/BRank Logo.PNG" alt="Logo"/>
</p>

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
  <img src="/src/images/HighLevelArchitecture.PNG" alt="High Level Architecture"/>
</p>

<h2>Class Diagram:</h2>
<p align="center">
  <img src="/src/images/CollegeRank_class_diagram.png" alt="Class Diagram"/>
</p>
<h2>How to Run this Project</h2>

Follow the steps below to download, install, and run this project.<br>

Dependencies<br>
Install these prerequisites.<br>

NPM: https://nodejs.org<br>
Truffle: https://github.com/trufflesuite/truffle<br>
Ganache: http://truffleframework.com/ganache/<br>
Metamask: https://metamask.io/<br>

Step 1. Clone the project<br>
git clone https://github.com/AditiSharma85/DAPP2-CollegeRank<br>

Step 2. Install dependencies<br>
$ cd DAPP2-CollegeRank<br>
$ npm install<br>

Step 3. Start Ganache<br>
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance. <br>

Step 4. Compile & Deploy CollegeRank Smart Contract<br>
$ truffle migrate --reset <br>
You must migrate the CollegeRank smart contract each time your restart ganache.<br>

Step 5. Configure Metamask<br>

Unlock Metamask<br>
Connect metamask to your local Etherum blockchain provided by Ganache.<br>
Import an account provided by ganache.<br>

Step 6. Run the Front End Application<br>
$ npm run dev <br>
Visit this URL in your browser: http://localhost:3000<br>

<h2>Testing:</h2>

After Step 4. 
$ truffle test
<p align="center">
  <img src="/src/images/testcases.PNG" alt="Class Diagram"/>
</p>


<h2>References:</h2>
Tutorials from Dapp University By Gregory : https://www.dappuniversity.com/
