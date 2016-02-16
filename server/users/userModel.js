var mongoose = require('mongoose');
var crypto = require('crypto');

//helper, gets array of artists from the playlist object
function createArtistObj(savedSongs){
	artistObj = {};
	var currentPlaylist;

	for(var i = 0; i < savedSongs.length; i++){
		//FILL IN
	}

	return artistObj;
 };

var UserSchema = new mongoose.Schema({
 name: Number,
 spotifyID: Number,
 artistObj: {},
 savedSongs: {}
});


// UserSchema.pre('save', function (next) {
//  // var artistObj = createArtistObj(this.savedSongs);
//   this.artistObj = artistObj;
//   next();
// });


module.exports = mongoose.model('User', UserSchema);
