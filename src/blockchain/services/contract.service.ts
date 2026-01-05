import { Injectable } from '@nestjs/common';
import { Contract } from 'ethers';
import { SupportedChain } from '../../common';
import { ChainsConfigService } from '../../config';
import { ProviderService } from './provider.service';
import { SignerService } from './signer.service';
import { UNIVERSAL_REGISTRY_ABI } from '../constants';

@Injectable()
export class ContractService {
  constructor(
    private readonly chainsConfigService: ChainsConfigService,
    private readonly providerService: ProviderService,
    private readonly signerService: SignerService,
  ) { }

  getReadContract(chain: SupportedChain): Contract {
    const config = this.chainsConfigService.getChainConfig(chain);
    const provider = this.providerService.getProvider(chain);
    return new Contract(
      config.registryContractAddress,
      UNIVERSAL_REGISTRY_ABI,
      provider,
    );
  }

  getWriteContract(chain: SupportedChain): Contract {
    const config = this.chainsConfigService.getChainConfig(chain);
    const signer = this.signerService.getSigner(chain);
    return new Contract(
      config.registryContractAddress,
      UNIVERSAL_REGISTRY_ABI,
      signer,
    );
  }
}
