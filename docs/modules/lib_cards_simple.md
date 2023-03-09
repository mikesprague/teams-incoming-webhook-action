[teams-incoming-webhook-action](../README.md) / lib/cards/simple

# Module: lib/cards/simple

## Table of contents

### Interfaces

- [SimpleCardParams](../interfaces/lib_cards_simple.SimpleCardParams.md)

### Functions

- [populateCard](lib_cards_simple.md#populatecard)

## Functions

### populateCard

▸ **populateCard**(`«destructured»`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`SimpleCardParams`](../interfaces/lib_cards_simple.SimpleCardParams.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `attachments` | { `content`: { `$schema`: `string` = 'http://adaptivecards.io/schemas/adaptive-card.json'; `body`: ({ `bleed`: `boolean` = true; `height`: `undefined` = 'stretch'; `items`: { `size`: `string` = 'Large'; `text`: `string` = title; `type`: `string` = 'TextBlock'; `weight`: `string` = 'Bolder'; `wrap`: `boolean` = true }[] ; `style`: `string` = color; `text`: `undefined` ; `type`: `string` = 'Container'; `wrap`: `undefined` = true } \| { `bleed`: `undefined` = true; `height`: `string` = 'stretch'; `items`: `undefined` ; `style`: `undefined` = color; `text`: `string` = text; `type`: `string` = 'TextBlock'; `wrap`: `boolean` = true })[] ; `msteams`: { `width`: `string` = 'Full' } ; `type`: `string` = 'AdaptiveCard'; `version`: `string` = '1.3' } ; `contentType`: `string` = 'application/vnd.microsoft.card.adaptive' }[] |
| `type` | `string` |

#### Defined in

[lib/cards/simple.ts:7](https://github.com/mikesprague/teams-incoming-webhook-action/blob/c9992c9/src/lib/cards/simple.ts#L7)
