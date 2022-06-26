import { Injectable } from '@nestjs/common';
import { Counter } from "prom-client";
import { FindKey, Item, ItemKey, FindKey_FindType } from './../../pb/store';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class StoreService {
    private redisClient: Redis;
    constructor(
        private readonly redisService: RedisService,
        @InjectMetric("entries_in_db") public counter: Counter<string>
    ) {
        this.redisClient = redisService.getClient();
    }
    async setKey(item: Item) {
        var value: string = await this.redisClient.get(item.key);
        // Increment counter only if a new key, value is received
        if(!value){
            this.counter.inc();
        }
        await this.redisClient.set(item.key, item.value);
    }

    async getValue(itemKey: ItemKey): Promise<Item> {
        var value: string = await this.redisClient.get(itemKey.key);
        let item: Item = { key: itemKey.key, value: value };
        return item;
    }

    async searchKey(findKey: FindKey): Promise<String[]> {
        let keyList: String[] = [];
        let finderRegex: string;
        if (findKey.type == FindKey_FindType.PREFIX) {
            finderRegex = findKey.value + "*"
        } else if (findKey.type == FindKey_FindType.SUFFIX) {
            finderRegex = "*" + findKey.value
        }
        (await this.redisClient.keys(finderRegex)).forEach(key => {
            keyList.push(key)
        })
        return keyList
    }
}
