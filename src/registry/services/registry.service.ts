import { Injectable, BadRequestException } from '@nestjs/common';
import { keccak256, toUtf8Bytes, hexlify } from 'ethers';
import {
  SetRecordResponse,
  GetRecordResponse,
  RecordExistsResponse,
} from '../../common';
import { ChainsConfigService } from '../../config';
import { ContractService } from '../../blockchain';
import { SetRecordDto } from '../dto/set-record.dto';
import { GetRecordDto } from '../dto/get-record.dto';

@Injectable()
export class RegistryService {
  constructor(
    private readonly chainsConfigService: ChainsConfigService,
    private readonly contractService: ContractService,
  ) {}

  private hashString(value: string): string {
    return keccak256(toUtf8Bytes(value));
  }

  private encodeValue(value: string): Uint8Array {
    if (value.startsWith('0x')) {
      const hex = value.slice(2);
      if (!/^[0-9a-fA-F]*$/.test(hex)) {
        throw new BadRequestException('Invalid hex string');
      }
      const bytes = new Uint8Array(hex.length / 2);
      for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
      }
      return bytes;
    }
    return toUtf8Bytes(value);
  }

  private decodeValue(hexValue: string): string {
    try {
      const bytes = Buffer.from(hexValue.slice(2), 'hex');
      return bytes.toString('utf8');
    } catch {
      return hexValue;
    }
  }

  async setRecord(dto: SetRecordDto): Promise<SetRecordResponse> {
    const { chain, namespace, key, value, immutable } = dto;

    const config = this.chainsConfigService.getChainConfig(chain);
    const namespaceHash = this.hashString(namespace);
    const keyHash = this.hashString(key);
    const encodedValue = this.encodeValue(value);

    const contract = this.contractService.getWriteContract(chain);
    const tx = await contract.setRecord(
      namespaceHash,
      keyHash,
      encodedValue,
      immutable,
    );
    const receipt = await tx.wait();

    return {
      success: true,
      transactionHash: receipt.hash,
      chain,
      chainId: config.chainId,
      namespace,
      key,
    };
  }

  async getRecord(dto: GetRecordDto): Promise<GetRecordResponse> {
    const { chain, namespace, key } = dto;

    const config = this.chainsConfigService.getChainConfig(chain);
    const namespaceHash = this.hashString(namespace);
    const keyHash = this.hashString(key);

    const contract = this.contractService.getReadContract(chain);
    const valueBytes: string = await contract.getRecord(namespaceHash, keyHash);
    const valueHex = hexlify(valueBytes);
    const decodedValue = this.decodeValue(valueHex);

    return {
      chain,
      chainId: config.chainId,
      namespace,
      key,
      value: decodedValue,
      valueHex,
    };
  }

  async recordExists(dto: GetRecordDto): Promise<RecordExistsResponse> {
    const { chain, namespace, key } = dto;

    const config = this.chainsConfigService.getChainConfig(chain);
    const namespaceHash = this.hashString(namespace);
    const keyHash = this.hashString(key);

    const contract = this.contractService.getReadContract(chain);
    const exists: boolean = await contract.recordExists(namespaceHash, keyHash);

    return {
      chain,
      chainId: config.chainId,
      namespace,
      key,
      exists,
    };
  }
}
