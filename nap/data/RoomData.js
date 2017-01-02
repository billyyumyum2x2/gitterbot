"use strict";

// This file needs to be edited to comment out
// rooms you want to join

// TODO - move to lib/ dir?

var AppConfig = require('../config/AppConfig');

// var Bonfires = require('../lib/app/Bonfires');

// from the webapp
// users enter the rooms with a topic=XXX url
// we find a matching room here with that topic
// and redirect them

/*
 * Returns a prefixed room(s) with a common channel name.
 * e.g. <code>prefixChannelName("FreeCodeCamp", ["Help", "Bonfire"]);</code>
 * would output <code>["FreeCodeCamp/Help", "FreeCodeCamp/Bonfire"]</code>
 * and <code>prefixChannelName("FreeCodeCamp", "DataScience"]);</code>
 * would output <code>"FreeCodeCamp/DataScience"</code>
 *
 * @param {string} name Channel name in Gitter
 * @param {string|Array<string>} roomNames List of room names or a single room name
 * @return {string|Array<string>} The prefixed string or array of string
 */
function prefixChannelName(name, roomNames) {
    if (roomNames instanceof Array) {
        return roomNames.map(function (room) {
            return name + '/' + room;
        });
    }
    return name + '/' + roomNames;
}

var RoomData;

// TODO - read this from the JSON file
var bonfireTopics = [

];

var bonfireDashedNames = [

];

var fccOfficialChatRoomNames = [
    "40PlusDevs",
    "Beta",
    "BookClub",
];

var fccCasualChatRoomNames = [

];

var fccMiscChatRoomNames = [

];

var fccCityChatRoomNames = [
    "Aarhus",
    "AbuDhabi",
    "Accra"
];

var fccChatRooms = {
    officialChatRooms: prefixChannelName("FreeCodeCamp",
        fccOfficialChatRoomNames),
    casualChatRooms: prefixChannelName("FreeCodeCamp",
        fccCasualChatRoomNames),
    cityChatRooms: prefixChannelName("FreeCodeCamp", fccCityChatRoomNames),
};

var camperBotChatRoomNames = [
    "HelpZiplines",
    "devteam",
    "testing"
];

var otherChatRooms = [
    "dcsan/botzy",
    "dcsan/gitterbot"
];

var camperBotChatRooms = prefixChannelName("camperbot", camperBotChatRoomNames);

// @TODO Refactor into a room generator function
var camperBotRooms = [
    camperBotChatRooms,
    fccChatRooms.officialChatRooms,
    fccChatRooms.cityChatRooms,
    fccChatRooms.casualChatRooms,
    otherChatRooms
].reduce(function (rooms, currRooms) {
    return rooms.concat(currRooms);
}).map(function (room) {
    return {
        name: room
    };
});

var BotRoomData = {

    // this controls which rooms you can access
    YOUR_GITHUB_ID: [
        // change this to be a room your user is already in
        {
            title: "bothelp",
            name: "brianamarie-test-bot/Lobby",
            icon: "question",
            topics: ["chitchat", "bots", "bot-development", "camperbot"]
        },

        {
            title: "bothelp",
            name: "brianamarie-test-bot/Lobby",
            icon: "question",
            topics: ["chitchat", "bots", "bot-development", "camperbot"]
        }
    ],

    // this is the demobot that ships with the app
    demobot: [{
        title: "demobot",
        name: "brianamarie-test-bot/Lobby",
        icon: "star",
        topics: ["getting started"]
    }],

    // developer bot
    bothelp: [

        {
            title: "bothelp",
            name: "bothelp/testing",
            icon: "question",
            topics: ["chitchat", "bots", "bot-development", "camperbot"]
        },

        {
            title: "HelpBonfires",
            icon: "fire",
            name: "bothelp/HelpBonfires",
            topics: bonfireTopics
        },

        {
            title: "camperbot/localdev",
            name: "camperbot/localdev"
        },

        {
            title: "bothelpDM",
            name: "bothelp",
        },

        {
            title: "GeneralChat",
            name: "bothelp/GeneralChat",
        },

        // {
        //     title: "DataScience",
        //     name: "FreeCodeCamp/DataScience",
        //     topics: ["general", "DataScience"]
        // },

        {
            title: "PrivateRoomTest",
            name: "bothelp/PrivateRoomTest",
            topics: ["general", "intros"]
        },

        {
            title: "EdaanDemo",
            name: "egetzel/demo",
            topics: ['egdemo']
        },

        // Bonfire single rooms

        {
            name: "bothelp/bonfire-factorialize-a-number",
            topics: ['bonfire factorialize a number'],
            isBonfire: true,
        },

    ],

    camperbot: camperBotRooms

};

var botname = null;

bonfireDashedNames.map(function (bfName) {
    var room = {
        name: "camperbot/" + bfName,
        isBonfire: true
    };
    BotRoomData.camperbot.push(room);
});

BotRoomData.camperbot.map(function (room) {
    room.title = room.title || room.name.split("/")[1];
    if (room.isBonfire) {
        //room.entry = "FreeCodeCamp/HelpBonfires",
        room.entry = "camperbot/testing";
        room.topic = room.title;
    }
});

RoomData = {
    rooms: function (botname) {
        botname = botname || AppConfig.getBotName();
        return BotRoomData[botname];
    },

    defaultRoom: function () {
        return RoomData.rooms().rooms[0];
    }

};

module.exports = RoomData;
