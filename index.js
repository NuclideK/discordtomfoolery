var http = require('http');
var url = require('url');
var port = 3000; // You can use "process.env.PORT" for heroku apps.
// Discord clients owo?
var discord_ua = ['DiscordBot', '+https://discordapp.com', 'electron', 'discord', 'firefox/38','Gecko/20100101']

function isDiscord(user_agent) {
		for (i in discord_ua) {
			if (user_agent.includes(discord_ua[i])) { 
				return true;
			}
		}
		return false;
}

function serveContent(requested_url) {
	// By default returns "Please dont open me in discord.png"

	if (requested_url == '/isthisforme.png') {return 'https://i.kym-cdn.com/entries/icons/original/000/035/182/cover1.jpg';}
	if (requested_url == '/cat.png') {return 'https://media.discordapp.net/attachments/966068504820351028/966394612736483418/smol_cat.png';}
	return 'https://media.discordapp.net/attachments/966068504820351028/966394370666405948/unknown.png';
}

console.log("Listening on: " + port)
http.createServer(function (req, res) {
var user_agent = req.headers['user-agent']
var request = url.parse(req.url,true);
if (isDiscord(user_agent)) {
	// Funny image showing "Please do not open me in browser" xd ;>
	res.writeHead(302, { Location: serveContent(request.path) }).end();
} else {
	// Ayo not discord? Time to redirect to 4k rickroll :D
	res.writeHead(302, { Location: 'https://youtu.be/o-YBDTqX_ZU' }).end()
		// console.log(user_agent); // If you wish to log users uncomment this (mainly for finding if discord is using a new useragent
}
	res.end();
}).listen(port);