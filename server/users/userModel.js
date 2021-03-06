var mongoose = require('mongoose');
var crypto = require('crypto');

//helper, gets array of artists from the playlist object
function createArtistObj(savedSongs){
	artistObj = {};
	var artistName;
	for(var i = 0; i < savedSongs.length; i++){
		artistID = "" + savedSongs[i].track.artists[0].id;
		artistObj[artistID] = savedSongs[i].track.artists[0].name;
	}

	return artistObj;
 };

var UserSchema = new mongoose.Schema({
 name: String,
 spotifyID: String,
 artistObj: {},
 savedSongs: [],
 stranger:{},
 receivedSongs: []
});


UserSchema.pre('save', function (next) {
  var artistObj = createArtistObj(this.savedSongs);
  this.artistObj = artistObj;
  next();
});


module.exports = mongoose.model('User', UserSchema);
