import { Module } from '@nestjs/common';
import { StoreModule } from './services/store/store.module';
import prodConf from './config/prod';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [StoreModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [prodConf],
  }), RedisModule.forRootAsync({
    useFactory: (configService: ConfigService) =>  ({"config" : configService.get('redis')})  ,
    inject:[ConfigService]
})],
  controllers: [],
  providers: [],
})
export class AppModule {}
