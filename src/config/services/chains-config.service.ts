import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupportedChain, ChainConfig } from '../../common';

@Injectable()
export class ChainsConfigService {
  private readonly chainsConfig: Record<SupportedChain, ChainConfig>;

  constructor(private readonly configService: ConfigService) {
    this.chainsConfig = {
      [SupportedChain.POLYGON_AMOY]: {
        chainId: 80002,
        rpcUrl: this.configService.get<string>('POLYGON_AMOY_RPC', ''),
        registryContractAddress: this.configService.get<string>(
          'POLYGON_AMOY_REGISTRY_ADDRESS',
          '',
        ),
      },
      [SupportedChain.ETHEREUM_SEPOLIA]: {
        chainId: 11155111,
        rpcUrl: this.configService.get<string>('SEPOLIA_RPC', ''),
        registryContractAddress: this.configService.get<string>(
          'SEPOLIA_REGISTRY_ADDRESS',
          '',
        ),
      },
    };
  }

  getChainConfig(chain: SupportedChain): ChainConfig {
    const config = this.chainsConfig[chain];
    if (!config) {
      throw new Error(`Unsupported chain: ${chain}`);
    }
    if (!config.rpcUrl) {
      throw new Error(`RPC URL not configured for chain: ${chain}`);
    }
    if (!config.registryContractAddress) {
      throw new Error(
        `Registry contract address not configured for chain: ${chain}`,
      );
    }
    return config;
  }
}
