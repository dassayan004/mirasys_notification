import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { APP_FILTER } from '@nestjs/core';
import { GrapghQLExceptionFilter } from '@/common/filters/exception.filter';
import { HealthModule } from '@/health/health.module';
import { ConfigModule } from '@/common/config/config.module';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from '@/common/config/schema';
import { NotificationModule } from '@/notification/notification.module';
import { DatabaseModule } from '@/common/database/database.module';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigSchema, true>) => ({
        introspection: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: false,
        includeStacktraceInErrorResponses: false,
        plugins: [
          configService.getOrThrow('NODE_ENV') === 'production'
            ? ApolloServerPluginLandingPageProductionDefault()
            : ApolloServerPluginLandingPageLocalDefault(),
        ],
        // csrfPrevention: false,
      }),
    }),

    HealthModule,
    ConfigModule,
    NotificationModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GrapghQLExceptionFilter,
    },
  ],
})
export class AppModule {}
