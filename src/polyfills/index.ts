global.Buffer = require("buffer").Buffer;
global.crypto = require("./Crypto");

if (typeof BigInt === "undefined") global.BigInt = require("big-integer");
