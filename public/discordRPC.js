const { Client } = require('discord-rpc');
const log = require('electron-log');

let client;
let activity;

exports.initRPC = () => {
  client = new Client({ transport: 'ipc' });

  activity = {
    details: 'Playing FelNullGDLauncher',
    state: 'Idle',
    startTimestamp: Math.floor(Date.now() / 1000),
    largeImageKey: 'default_big',
    largeImageText: 'FelNullGDLauncher - TeamFelNull Minecraft Launcher',
    instance: false
  };

  client.on('ready', () => {
    log.log('602032140078809119');
    client.setActivity(activity);
  });

  client.login({ clientId: '709790494020075551' }).catch(error => {
    if (error.message.includes('ENOENT')) {
      log.error('Unable to initialize Discord RPC, no client detected.');
    } else {
      log.error('Unable to initialize Discord RPC:', error);
    }
  });
};

exports.updateDetails = details => {
  activity.details = details;
  client.setActivity(activity);
};

exports.shutdownRPC = () => {
  if (!client) return;
  client.clearActivity();
  client.destroy();
  client = null;
  activity = null;
};
