import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Test, TestingModule } from '@nestjs/testing';
import { FindKey_FindType, Item } from './../../pb/store';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ciConf from '../../config/ci';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [ciConf],
      }), RedisModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({ "config": configService.get('redis') }),
        inject: [ConfigService]
      })],
      providers: [StoreService],
      controllers: [StoreController],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let items: Item[] = [{ key: "abc-1", value: "k1" }, { key: "abc-2", value: "k2" }, { key: "xyz-1", value: "k3" }, { key: "xyz-2", value: "k4" }]

  it('should set and confirm value', async () => {
    items.forEach(async (item) => {
      await service.setKey(item);
      let res = await service.getValue({ key: item.key });
      expect(res.key).toEqual(item.key)
      expect(res.value).toMatch(item.value)
    })
  });

  it('should get all keys with the prefix', async () => {
    let res = await service.searchKey({ type: FindKey_FindType.PREFIX, value: "abc" });
    expect(res.sort()).toEqual(["abc-1", "abc-2"]);
  });

  it('should get all keys with the suffix', async () => {
    let res = await service.searchKey({ type: FindKey_FindType.SUFFIX, value: "-1" });
    expect(res.sort()).toEqual(["abc-1", "xyz-1"]);
  });
});
