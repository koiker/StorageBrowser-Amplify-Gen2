import { defineStorage } from '@aws-amplify/backend';

export const firstStorage = defineStorage({
    name: 'myStorage',
    isDefault: true,
    access: (allow) => ({
        'private/{entity_id}/*': [
            allow.entity('identity').to(['read', 'write', 'delete'])
        ]
    })
});

export const secondStorage = defineStorage({
    name: 'myStorage2',
    access: (allow) => ({
        'shared/*': [
            allow.authenticated.to(['read', 'write', 'delete'])
        ]
    })
});
