const {
  models: { UserChallenge, User, Challenge },
} = require("../../server/db");

const Sequelize = require("sequelize");

const { dataChallenges } = require("./challenge");
const { users } = require("./user");
const { ConstructionSharp } = require("@mui/icons-material");


const getChallengeLength = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
function formatDate(date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join('/');
}

let today = new Date();

const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


async function userChallengeSeed() {
  // Creating userChallenge

  // Selecting all users
  const users = await User.findAll();


  const challenges = await Challenge.findAll();

  const userAmountOfChellenges = {};
  const challengeLength = {};
  const usersIdWithChallengeId = {};
  //creating object with {userId: "amount of chellenges"} pair
  users.forEach(
    (user) => (userAmountOfChellenges[user.id] = getRandomInt(5, 10))
  );
  //creating object with {chellengeId: "length of the chellenge"} pair
  challenges.forEach(
    (challenge) =>
      (challengeLength[challenge.id] = getChallengeLength(
        challenge.startDateTime,
        challenge.endDateTime
      ))
  );
  //creating nested object {userId: { challengeId: "current progress", status: "In Progress" or "Completed"}}
  for (const userId in userAmountOfChellenges) {
    let amountOfChallenges = userAmountOfChellenges[userId];
    usersIdWithChallengeId[userId] = [];
    let storage = [];
    while (amountOfChallenges > 0) {
      challengeId = getRandomInt(1, challenges.length);
      if (!storage.includes(challengeId)) {
        storage.push(challengeId);
        let obj = {};
        let challenge = await Challenge.findByPk(challengeId)
        //checking if the challenge is still going
        if(formatDate(challenge.endDateTime) > today){
          obj[challengeId] = getRandomInt(1, challengeLength[challengeId]);
          usersIdWithChallengeId[userId].push(obj);
          amountOfChallenges--;
        }
        //if the challenge ended
        else{
          let coin = getRandomInt(0, 1)
          //set progress on 100%
          if(coin === 0){
            obj[challengeId] = challengeLength[challengeId];
            usersIdWithChallengeId[userId].push(obj);
            amountOfChallenges--;
          }
          //set progress on less then 100%
          else{
            obj[challengeId] = getRandomInt(1, challengeLength[challengeId]);
            usersIdWithChallengeId[userId].push(obj);
            amountOfChallenges--;
          }
        }
        if(obj[challengeId] === challenge.targetNumber){
          obj.status = "Completed"
        }else{
          obj.status = "In Progress"
        }
      }
    }
  }
  const userChallenges = [];

  
  //seeding data userChallenges
  for (userId in usersIdWithChallengeId) {
    usersIdWithChallengeId[userId].map((user) => {
      userChallenges.push(
        new Promise((resolve) => {
          resolve(
            UserChallenge.create({
              currentProgress: Object.entries(user)[0][1],
              userId: userId,
              challengeId: Object.entries(user)[0][0],
              status: Object.entries(user)[1][1],
            })
          );
        })
      );
    });
  }

  await Promise.all([...userChallenges]);

  console.log(`seeded ${userChallenges.length} users challenges`);

  return userChallenges;
}

module.exports = userChallengeSeed;
