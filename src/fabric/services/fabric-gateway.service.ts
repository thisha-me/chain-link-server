import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as grpc from '@grpc/grpc-js';
import {
  connect,
  Contract,
  Identity,
  Signer,
  signers,
} from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';

@Injectable()
export class FabricGatewayService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(FabricGatewayService.name);
  private gateway: any;
  private client: grpc.Client;
  private cachedContract: Contract | null = null;
  private isConfigured: boolean = false;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.logger.log('Initializing Fabric Gateway Service');

    // Check if basic config is present
    const tlsCert = this.configService.get<string>('fabric.tlsCert');
    const cert = this.configService.get<string>('fabric.cert');
    const key = this.configService.get<string>('fabric.key');

    if (!tlsCert || !cert || !key) {
      this.logger.warn(
        'Fabric configuration is incomplete. Fabric Gateway will not initialize. Ensure FABRIC_TLS_CERT, FABRIC_CERT, and FABRIC_KEY are set.',
      );
      return; // Skip initialization if incomplete
    }

    try {
      await this.initGateway();
      this.isConfigured = true;
    } catch (error) {
      this.logger.error(
        `Failed to initialize Fabric Gateway: ${error.message}`,
      );
    }
  }

  async onModuleDestroy() {
    if (this.gateway) {
      this.gateway.close();
    }
    if (this.client) {
      this.client.close();
    }
  }

  async getContract(): Promise<Contract> {
    if (!this.isConfigured) {
      throw new Error(
        'Fabric Gateway is not configured. Please check environment variables.',
      );
    }

    if (this.cachedContract) {
      return this.cachedContract;
    }

    const channelName = this.configService.get<string>('fabric.channelName');
    const chaincodeName = this.configService.get<string>(
      'fabric.chaincodeName',
    );

    const network = this.gateway.getNetwork(channelName);
    this.cachedContract = network.getContract(chaincodeName);
    return this.cachedContract;
  }

  private async initGateway() {
    const peerEndpoint = this.configService.get<string>('fabric.peerEndpoint');

    const client = await this.newGrpcConnection();
    this.client = client;

    const gateway = connect({
      client,
      identity: await this.newIdentity(),
      signer: await this.newSigner(),
      evaluateOptions: () => {
        return { deadline: Date.now() + 5000 };
      },
      endorseOptions: () => {
        return { deadline: Date.now() + 15000 };
      },
      submitOptions: () => {
        return { deadline: Date.now() + 5000 };
      },
      commitStatusOptions: () => {
        return { deadline: Date.now() + 60000 };
      },
    });

    this.gateway = gateway;
    this.logger.log(
      `Successfully connected to Fabric Gateway at ${peerEndpoint}`,
    );
  }

  private async newGrpcConnection(): Promise<grpc.Client> {
    const peerEndpoint = this.configService.get<string>('fabric.peerEndpoint');
    const peerHostAlias = this.configService.get<string>(
      'fabric.peerHostAlias',
    );
    const tlsCert = this.configService.get<string>('fabric.tlsCert');

    let tlsRootCert: Buffer;
    if (tlsCert) {
      // Replace escaped newlines if passed via certain CI/CD environment strings
      tlsRootCert = Buffer.from(tlsCert.replace(/\\n/g, '\n'));
    } else {
      throw new Error('TLS Certificate is missing');
    }
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
      'grpc.ssl_target_name_override': peerHostAlias,
    });
  }

  private async newIdentity(): Promise<Identity> {
    const mspId = this.configService.get<string>('fabric.mspId');
    const cert = this.configService.get<string>('fabric.cert');

    let certStr: string;
    if (cert) {
      certStr = cert.replace(/\\n/g, '\n');
    } else {
      throw new Error('User Certificate is missing');
    }
    const credentials = Buffer.from(certStr);
    return { mspId, credentials };
  }

  private async newSigner(): Promise<Signer> {
    const key = this.configService.get<string>('fabric.key');
    let privateKeyStr: string;

    if (key) {
      privateKeyStr = key.replace(/\\n/g, '\n');
    } else {
      throw new Error('User Private Key is missing');
    }
    const privateKey = crypto.createPrivateKey(privateKeyStr);
    return signers.newPrivateKeySigner(privateKey);
  }
}
