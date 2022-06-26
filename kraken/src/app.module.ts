import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StoreModule } from './services/store/store.module';
import prodConf from './config/prod';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { makeCounterProvider, PrometheusModule, makeHistogramProvider } from "@willsoto/nestjs-prometheus";
import { LatencyMiddleware } from './latency.middleware';

@Module({
  imports: [
    StoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [prodConf],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({ "config": configService.get('redis') }),
      inject: [ConfigService]
    }),
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      },
    })
  ],
  controllers: [],
  providers: [
    makeHistogramProvider({
      name: "http_request_duration_ms",
      help: "Duration of HTTP requests in ms",
      labelNames: ['route'],
      buckets: [0.1, 5, 15, 50, 100, 500],
    }),
    makeCounterProvider({
      name: "http_response_status_code",
      help: "Status code of response",
      labelNames: ['code', 'route']
    })
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LatencyMiddleware).forRoutes('*');
  }
}
