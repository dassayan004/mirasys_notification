import { LoggerService, Logger } from '@nestjs/common';


export class GraphQLLogger implements LoggerService {
  private readonly logger = new Logger('GraphQL');

  log(message: string) {
    this.logger.log(message);
  }

  info(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose?(message: string) {
    this.logger.verbose(message);
  }
}
