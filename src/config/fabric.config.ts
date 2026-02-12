import { registerAs } from '@nestjs/config';

export default registerAs('fabric', () => ({
  mspId: process.env.FABRIC_MSP_ID || 'Org1MSP',
  channelName: process.env.FABRIC_CHANNEL_NAME || 'mychannel',
  chaincodeName: process.env.FABRIC_CHAINCODE_NAME || 'Registry',
  peerEndpoint: process.env.FABRIC_PEER_ENDPOINT || 'localhost:7051',
  peerHostAlias: process.env.FABRIC_PEER_HOST_ALIAS || 'peer0.org1.example.com',
  tlsCert: process.env.FABRIC_TLS_CERT,
  cert: process.env.FABRIC_CERT,
  key: process.env.FABRIC_KEY,
}));
