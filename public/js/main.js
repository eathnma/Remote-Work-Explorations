import{ Hands } from './hands.js'; 
import{ HandDetect } from './hand-detect.js';
import{ SocketClient } from './socket-client.js';

var hands = new Hands();
var handDetect = new HandDetect(hands);
var socketClient = new SocketClient(hands);
