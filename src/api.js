import request from 'request';
import key from './secret';

const root = 'https://www.bungie.net/Platform/';

const urls = {
    destinyUser: 'User/SearchUsers/?q={userName}',
    destinyMembershipData: 'User/GetMembershipsById/{membershipId}/{membershipType}',
    destinyProfile: 'Destiny2/{membershipType}/Profile/{destinyMembershipId}/?components=100,200',
    destinyCharacter: 'Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/?components=200',
    

    destinyPlayer: 'Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/'
}




export const getDestinyUser = (userName, callback) => {
    let url = root + urls.destinyUser;
    url = url.replace('{userName}', userName);
    console.log("Destiny user url: " + url);
    _bungieApiGet(url, callback);
};

export const getDestinyMembershipData = (membershipId, membershipType, callback) => {
    let url = root + urls.destinyMembershipData;
    url = url.replace('{membershipId}', membershipId);
    url = url.replace('{membershipType}', membershipType);
    console.log('MembershipData url: ' + url);
    _bungieApiGet(url, callback);
};

export const getDestinyProfile = (membershipType, membershipId, callback) => {
    let url = root + urls.destinyProfile;
    url = url.replace('{membershipType}', membershipType);
    url = url.replace('{destinyMembershipId}', membershipId);
    console.log("profile Url : " + url);
    _bungieApiGet(url, callback);
};





//Unused! -------------------------------------------------------------------------------------------
export const getDestinyPlayer = (membershipType, name, callback) => {
    let url = root + urls.destinyPlayer;
    url = url.replace('{membershipType}', membershipType);
    url = url.replace('{displayName}', name);
    console.log("Player URL: " + url)
    _bungieApiGet(url, callback);
};

export const getDestinyCharacter = (membershipType, destinyMembershipId, characterId, callback) => {
    let url = root + urls.destinyCharacter;
    url = url.replace('{membershipType}', membershipType);
    url = url.replace('{destinyMembershipId}', destinyMembershipId);
    url = url.replace('{characterId}', characterId);
    console.log('Character URL: ' + url)

    _bungieApiGet(url, callback);
};


function _bungieApiGet(url, callback){
    let options = {
        url: url,
        headers: {
            'X-API-Key': key
        }
    }
    request(options, callback);
}