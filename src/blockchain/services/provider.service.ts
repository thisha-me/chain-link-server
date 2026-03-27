import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';
import { SupportedChain } from '../../common';
import { ChainsConfigService } from '../../config';

@Injectable()
export class ProviderService {
  private readonly providers: Map<SupportedChain, JsonRpcProvider> = new Map();

  constructor(private readonly chainsConfigService: ChainsConfigService) {}

  getProvider(chain: SupportedChain): JsonRpcProvider {
    if (this.providers.has(chain)) {
      return this.providers.get(chain)!;
    }

    const config = this.chainsConfigService.getChainConfig(chain);
    const provider = new JsonRpcProvider(config.rpcUrl, config.chainId);
    this.providers.set(chain, provider);

    return provider;
  }
}
