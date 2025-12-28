export const UNIVERSAL_REGISTRY_ABI = [
  {
    inputs: [
      { internalType: 'bytes32', name: 'namespace', type: 'bytes32' },
      { internalType: 'bytes32', name: 'key', type: 'bytes32' },
      { internalType: 'bytes', name: 'value', type: 'bytes' },
      { internalType: 'bool', name: 'immutableFlag', type: 'bool' },
    ],
    name: 'setRecord',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'namespace', type: 'bytes32' },
      { internalType: 'bytes32', name: 'key', type: 'bytes32' },
    ],
    name: 'getRecord',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'namespace', type: 'bytes32' },
      { internalType: 'bytes32', name: 'key', type: 'bytes32' },
    ],
    name: 'recordExists',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
