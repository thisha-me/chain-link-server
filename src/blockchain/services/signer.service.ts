import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Wallet } from 'ethers';
import { SupportedChain } from '../../common';
import { ProviderService } from './provider.service';

@Injectable()
export class SignerService {
  private readonly privateKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
  ) {
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    if (!privateKey) {
      throw new Error('PRIVATE_KEY environment variable is not set');
    }
    this.privateKey = privateKey;
  }

  getSigner(chain: SupportedChain): Wallet {
    const provider = this.providerService.getProvider(chain);
    return new Wallet(this.privateKey, provider);
  }
}
