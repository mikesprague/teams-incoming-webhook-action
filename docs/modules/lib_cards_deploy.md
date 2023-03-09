[teams-incoming-webhook-action](../README.md) / lib/cards/deploy

# Module: lib/cards/deploy

## Table of contents

### Interfaces

- [DeployCardParams](../interfaces/lib_cards_deploy.DeployCardParams.md)

### Functions

- [populateCard](lib_cards_deploy.md#populatecard)

## Functions

### populateCard

▸ **populateCard**(`«destructured»`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`DeployCardParams`](../interfaces/lib_cards_deploy.DeployCardParams.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `attachments` | { `content`: { `$schema`: `string` = 'http://adaptivecards.io/schemas/adaptive-card.json'; `body`: ({ `actions`: `undefined` ; `bleed`: `boolean` = true; `facts`: `undefined` ; `items`: { `size`: `string` = 'Large'; `text`: `string` ; `type`: `string` = 'TextBlock'; `weight`: `string` = 'Bolder'; `wrap`: `boolean` = true }[] ; `size`: `undefined` = 'Small'; `spacing`: `undefined` = 'None'; `style`: `string` = color; `text`: `undefined` ; `type`: `string` = 'Container'; `wrap`: `undefined` = true } \| { `actions`: `undefined` ; `bleed`: `undefined` = true; `facts`: `undefined` ; `items`: `undefined` ; `size`: `undefined` = 'Small'; `spacing`: `undefined` = 'None'; `style`: `undefined` = color; `text`: `string` ; `type`: `string` = 'TextBlock'; `wrap`: `boolean` = true } \| { `actions`: `undefined` ; `bleed`: `undefined` = true; `facts`: `undefined` ; `items`: `undefined` ; `size`: `string` = 'Small'; `spacing`: `string` = 'None'; `style`: `undefined` = color; `text`: `string` ; `type`: `string` = 'TextBlock'; `wrap`: `boolean` = true } \| { `actions`: `undefined` ; `bleed`: `undefined` = true; `facts`: { `title`: `string` = 'Branch'; `value`: `undefined` \| `string` = branch }[] ; `items`: `undefined` ; `size`: `undefined` = 'Small'; `spacing`: `undefined` = 'None'; `style`: `undefined` = color; `text`: `undefined` ; `type`: `string` = 'FactSet'; `wrap`: `undefined` = true } \| { `actions`: { `style`: `string` = 'default'; `title`: `string` = 'View Commit Changes'; `type`: `string` = 'Action.OpenUrl'; `url`: `any` = commit.data.html\_url }[] ; `bleed`: `undefined` = true; `facts`: `undefined` ; `items`: `undefined` ; `size`: `undefined` = 'Small'; `spacing`: `undefined` = 'None'; `style`: `undefined` = color; `text`: `undefined` ; `type`: `string` = 'ActionSet'; `wrap`: `undefined` = true })[] ; `msteams`: { `width`: `string` = 'Full' } ; `type`: `string` = 'AdaptiveCard'; `version`: `string` = '1.3' } ; `contentType`: `string` = 'application/vnd.microsoft.card.adaptive' }[] |
| `type` | `string` |

#### Defined in

[lib/cards/deploy.ts:17](https://github.com/mikesprague/teams-incoming-webhook-action/blob/c9992c9/src/lib/cards/deploy.ts#L17)
