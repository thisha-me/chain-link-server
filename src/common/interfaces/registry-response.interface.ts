import { SupportedChain } from '../enums';

export interface SetRecordResponse {
  success: boolean;
  transactionHash: string;
  chain: SupportedChain;
  chainId: number;
  namespace: string;
  key: string;
}

export interface GetRecordResponse {
  chain: SupportedChain;
  chainId: number;
  namespace: string;
  key: string;
  value: string;
  valueHex: string;
}

export interface RecordExistsResponse {
  chain: SupportedChain;
  chainId: number;
  namespace: string;
  key: string;
  exists: boolean;
}
