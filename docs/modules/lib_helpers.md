[teams-incoming-webhook-action](../README.md) / lib/helpers

# Module: lib/helpers

## Table of contents

### Interfaces

- [ColorStrings](../interfaces/lib_helpers.ColorStrings.md)
- [EmojiStrings](../interfaces/lib_helpers.EmojiStrings.md)
- [ObjectMap](../interfaces/lib_helpers.ObjectMap.md)

### Functions

- [getAdaptiveCardColorString](lib_helpers.md#getadaptivecardcolorstring)
- [getEmoji](lib_helpers.md#getemoji)
- [getHexForColorString](lib_helpers.md#gethexforcolorstring)
- [validateColorString](lib_helpers.md#validatecolorstring)

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

[lib/helpers.ts:35](https://github.com/mikesprague/teams-incoming-webhook-action/blob/c9992c9/src/lib/helpers.ts#L35)

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

[lib/helpers.ts:54](https://github.com/mikesprague/teams-incoming-webhook-action/blob/c9992c9/src/lib/helpers.ts#L54)

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

[lib/helpers.ts:21](https://github.com/mikesprague/teams-incoming-webhook-action/blob/c9992c9/src/lib/helpers.ts#L21)

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

[lib/helpers.ts:3](https://github.com/mikesprague/teams-incoming-webhook-action/blob/c9992c9/src/lib/helpers.ts#L3)
