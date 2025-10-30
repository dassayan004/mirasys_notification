import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSchema } from '../config/schema';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (_configService: ConfigService<ConfigSchema, true>) => ({
        type: 'sqlite',
        database: 'db.sqlite',
        entities,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
