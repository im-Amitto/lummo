/* eslint-disable */
import { Empty } from './google/protobuf/empty';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'store';

export interface Item {
  key: string;
  value: string;
}

export interface ItemKey {
  key: string;
}

export interface ItemKeyList {
  keys: ItemKey[];
}

export interface FindKey {
  type: FindKey_FindType;
  value: string;
}

export enum FindKey_FindType {
  UNKNOWN = 0,
  PREFIX = 1,
  SUFFIX = 2,
  UNRECOGNIZED = -1,
}

export function findKey_FindTypeFromJSON(object: any): FindKey_FindType {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return FindKey_FindType.UNKNOWN;
    case 1:
    case 'PREFIX':
      return FindKey_FindType.PREFIX;
    case 2:
    case 'SUFFIX':
      return FindKey_FindType.SUFFIX;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return FindKey_FindType.UNRECOGNIZED;
  }
}

export function findKey_FindTypeToJSON(object: FindKey_FindType): string {
  switch (object) {
    case FindKey_FindType.UNKNOWN:
      return 'UNKNOWN';
    case FindKey_FindType.PREFIX:
      return 'PREFIX';
    case FindKey_FindType.SUFFIX:
      return 'SUFFIX';
    case FindKey_FindType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

function createBaseItem(): Item {
  return { key: '', value: '' };
}

export const Item = {
  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Item {
    return {
      key: isSet(object.key) ? String(object.key) : '',
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: Item): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseItemKey(): ItemKey {
  return { key: '' };
}

export const ItemKey = {
  encode(
    message: ItemKey,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ItemKey {
    return {
      key: isSet(object.key) ? String(object.key) : '',
    };
  },

  toJSON(message: ItemKey): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ItemKey>, I>>(object: I): ItemKey {
    const message = createBaseItemKey();
    message.key = object.key ?? '';
    return message;
  },
};

function createBaseItemKeyList(): ItemKeyList {
  return { keys: [] };
}

export const ItemKeyList = {
  encode(
    message: ItemKeyList,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.keys) {
      ItemKey.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemKeyList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemKeyList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keys.push(ItemKey.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ItemKeyList {
    return {
      keys: Array.isArray(object?.keys)
        ? object.keys.map((e: any) => ItemKey.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ItemKeyList): unknown {
    const obj: any = {};
    if (message.keys) {
      obj.keys = message.keys.map((e) => (e ? ItemKey.toJSON(e) : undefined));
    } else {
      obj.keys = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ItemKeyList>, I>>(
    object: I,
  ): ItemKeyList {
    const message = createBaseItemKeyList();
    message.keys = object.keys?.map((e) => ItemKey.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFindKey(): FindKey {
  return { type: 0, value: '' };
}

export const FindKey = {
  encode(
    message: FindKey,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FindKey {
    return {
      type: isSet(object.type) ? findKey_FindTypeFromJSON(object.type) : 0,
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: FindKey): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = findKey_FindTypeToJSON(message.type));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FindKey>, I>>(object: I): FindKey {
    const message = createBaseFindKey();
    message.type = object.type ?? 0;
    message.value = object.value ?? '';
    return message;
  },
};

export interface StoreService {
  GetItem(request: ItemKey): Promise<Item>;
  SetItem(request: Item): Promise<Empty>;
  SearchKey(request: FindKey): Promise<ItemKeyList>;
}

export class StoreServiceClientImpl implements StoreService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetItem = this.GetItem.bind(this);
    this.SetItem = this.SetItem.bind(this);
    this.SearchKey = this.SearchKey.bind(this);
  }
  GetItem(request: ItemKey): Promise<Item> {
    const data = ItemKey.encode(request).finish();
    const promise = this.rpc.request('store.StoreService', 'GetItem', data);
    return promise.then((data) => Item.decode(new _m0.Reader(data)));
  }

  SetItem(request: Item): Promise<Empty> {
    const data = Item.encode(request).finish();
    const promise = this.rpc.request('store.StoreService', 'SetItem', data);
    return promise.then((data) => Empty.decode(new _m0.Reader(data)));
  }

  SearchKey(request: FindKey): Promise<ItemKeyList> {
    const data = FindKey.encode(request).finish();
    const promise = this.rpc.request('store.StoreService', 'SearchKey', data);
    return promise.then((data) => ItemKeyList.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
