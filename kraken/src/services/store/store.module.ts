import { Module } from '@nestjs/common';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports:[],
  providers: [
    StoreService,
    makeCounterProvider({
      name: "entries_in_db",
      help: "Number of entries added in db",
    })
  ],
  controllers:[StoreController],
})
export class StoreModule {}
