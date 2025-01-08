import {useState} from 'react'
import { defineBackend, defineStorage } from '@aws-amplify/backend';
import {withAuthenticator, Button, Heading} from '@aws-amplify/ui-react';
import {
    createAmplifyAuthAdapter,
    createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';
import "@aws-amplify/ui-react-storage/styles.css";
import '@aws-amplify/ui-react/styles.css';
import './App.css'


export const storage = defineStorage({
    name: 'myStorage',
    access: (allow) => ({
        'public/*': [
            allow.authenticated.to(['read', 'write'])
        ]
    })
})
defineBackend({
    storage
})
export const { StorageBrowser } = createStorageBrowser({
    config: createAmplifyAuthAdapter(),
});

function App({signOut, user}) {
    const [count, setCount] = useState(0)


    return (
        <>
            <div>
                <Heading level={1}>Hello {user.username}</Heading>
                <Button onClick={signOut}>Sign out</Button>
            </div>
            <div>
                <StorageBrowser
                    accessLevel="public"
                    provider="S3"
                    path="public/"
                    maxFileCount={10}
                    acceptedFileTypes={['image/*']}
                />
            </div>
        </>
    )
}

export default withAuthenticator(App);
