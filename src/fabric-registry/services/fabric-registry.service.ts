import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { FabricGatewayService } from '../../fabric/services/fabric-gateway.service';
import {
  FabricSetRecordDto,
  FabricGetRecordDto,
} from '../dto/fabric-registry.dto';
import { TextDecoder } from 'util';

@Injectable()
export class FabricRegistryService {
  private readonly logger = new Logger(FabricRegistryService.name);
  private readonly utf8Decoder = new TextDecoder();

  constructor(private readonly fabricGatewayService: FabricGatewayService) {}

  async setRecord(dto: FabricSetRecordDto) {
    try {
      this.logger.log(`Submitting set transaction for key: ${dto.key}`);
      const contract = await this.fabricGatewayService.getContract();

      const commit = await contract.submitAsync('set', {
        arguments: [dto.key, dto.value],
      });

      this.logger.log(
        `Successfully submitted set transaction for key: ${dto.key}`,
      );

      return {
        success: true,
        transactionId: commit.getTransactionId(),
        key: dto.key,
      };
    } catch (error) {
      this.logger.error(
        `Error submitting set transaction: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        `Failed to set record: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRecord(dto: FabricGetRecordDto) {
    try {
      this.logger.log(`Evaluating get transaction for key: ${dto.key}`);
      const contract = await this.fabricGatewayService.getContract();

      const resultBytes = await contract.evaluateTransaction('get', dto.key);
      const resultString = this.utf8Decoder.decode(resultBytes);

      this.logger.log(
        `Successfully evaluated get transaction for key: ${dto.key}`,
      );
      return {
        key: dto.key,
        value: resultString,
      };
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new HttpException(
          `Record not found for key: ${dto.key}`,
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.error(
        `Error evaluating get transaction: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        `Failed to get record: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
