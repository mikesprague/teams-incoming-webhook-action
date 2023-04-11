[teams-incoming-webhook-action](../README.md) / lib/helpers

# Module: lib/helpers

## Table of contents

### Interfaces

- [ColorStrings](../interfaces/lib_helpers.ColorStrings.md)
- [EmojiStrings](../interfaces/lib_helpers.EmojiStrings.md)

### Type Aliases

- [ObjectMap](lib_helpers.md#objectmap)

### Functions

- [getAdaptiveCardColorString](lib_helpers.md#getadaptivecardcolorstring)
- [getEmoji](lib_helpers.md#getemoji)
- [getHexForColorString](lib_helpers.md#gethexforcolorstring)
- [validateColorString](lib_helpers.md#validatecolorstring)

## Type Aliases

### ObjectMap

Ƭ **ObjectMap**: `Record`<`string`, `string` \| `undefined`\>

#### Defined in

[lib/helpers.ts:9](https://github.com/mikesprague/teams-incoming-webhook-action/blob/27ac9e5/src/lib/helpers.ts#L9)

## Functions

### getAdaptiveCardColorString

▸ **getAdaptiveCardColorString**(`colorString`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `colorString` | `string` |

#### Returns

`string`

#### Defined in

[lib/helpers.ts:33](https://github.com/mikesprague/teams-incoming-webhook-action/blob/27ac9e5/src/lib/helpers.ts#L33)

___

### getEmoji

▸ **getEmoji**(`adaptiveCardColor?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `adaptiveCardColor` | `string` | `'emphasis'` |

#### Returns

`string`

#### Defined in

[lib/helpers.ts:52](https://github.com/mikesprague/teams-incoming-webhook-action/blob/27ac9e5/src/lib/helpers.ts#L52)

___

### getHexForColorString

▸ **getHexForColorString**(`colorString`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `colorString` | `string` |

#### Returns

`string`

#### Defined in

[lib/helpers.ts:19](https://github.com/mikesprague/teams-incoming-webhook-action/blob/27ac9e5/src/lib/helpers.ts#L19)

___

### validateColorString

▸ **validateColorString**(`colorString`): ``null`` \| `RegExpMatchArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `colorString` | `string` |

#### Returns

``null`` \| `RegExpMatchArray`

#### Defined in

[lib/helpers.ts:3](https://github.com/mikesprague/teams-incoming-webhook-action/blob/27ac9e5/src/lib/helpers.ts#L3)
