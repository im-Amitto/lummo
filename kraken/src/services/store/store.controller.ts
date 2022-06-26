import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiPropertyOptional,ApiProperty } from '@nestjs/swagger';
import { FindKey, FindKey_FindType, Item, ItemKey } from './../../pb/store';
import { StoreService } from './store.service';

class SearchParams {
  @ApiPropertyOptional()
  prefix: string
  @ApiPropertyOptional()
  suffix: string
}

class ItemBody {
  @ApiProperty()
  key: string
  @ApiProperty()
  value: string
}

@Controller('store')
export class StoreController {
    constructor(private storeService: StoreService) {}

  @Post('/set')
  async setKey(@Body() item: ItemBody) {
    if(item.key !== undefined && item.value !== undefined){
        await this.storeService.setKey(item);
    }else{
        throw new BadRequestException('Invalid body');
    }
  }

  @Get('/get/:key')
  async getKey(@Param('key') key:string): Promise<Item> {
    if(key === undefined || key == ""){
        throw new BadRequestException('Invalid body');
    }
    let itemKey: ItemKey = {key:key}
    return this.storeService.getValue(itemKey);
  }

  @Get('/search')
  async findOne(@Query() query:SearchParams): Promise<String[]> {
    let prefix = query.prefix;
    let suffix = query.suffix;
    if((prefix === undefined && suffix === undefined) || (prefix === "" && suffix === "")){
        throw new BadRequestException('Invalid body');
    }
    let findKey:FindKey = {type: FindKey_FindType.PREFIX, value: prefix}
    if(prefix === undefined || prefix == ""){
        findKey.type  = FindKey_FindType.SUFFIX;
        findKey.value = suffix;
    }
    return await this.storeService.searchKey(findKey);
  }
}
