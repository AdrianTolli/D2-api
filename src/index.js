import {getDestinyUser,getDestinyMembershipData, getDestinyProfile} from './api';
import express from 'express';

var app = express();

const races={
  0: 'Titan',
  1: 'Hunter',
  2: 'Warlock',
  3: 'Unknown'
};

const classes= {
  0: 'Human',
  1: 'Awoken',
  2: 'Exo',
  3: 'Unknown'
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const blizzArray = [];

app.get('/searchUser/:userName', (req, res) => {
  getDestinyUser(req.params.userName, (error, response, body) => {
    let user = JSON.parse(body);

    var blizzNr = 0;
    for(var i=0; i<user.Response.length; i++){
      if(user.Response[i].blizzardDisplayName){
        blizzArray[blizzNr] = user.Response[i];
        blizzNr++;
      }
    }

    getDestinyMembershipData(blizzArray[0].membershipId, -1, (error, response, body) => {
      let membershipData = JSON.parse(body);

      let bigMembershipId = membershipData.Response.destinyMemberships.find(a => a.membershipType === 4).membershipId;

      getDestinyProfile(4, bigMembershipId, (error, response, body) => {
        let profile = JSON.parse(body);
        console.log(profile.Response.profile.data.characterIds);
        res.json(profile);
      });
    });

   
  });
});


app.listen(5050, function(){
  console.log('Server is listening to 5050!')
});