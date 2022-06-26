import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports:[],
  providers: [StoreService],
  controllers:[StoreController],
})
export class StoreModule {}
