import {useState} from 'react'
import {Amplify} from 'aws-amplify';
import {fetchAuthSession} from 'aws-amplify/auth';
import {Authenticator, Button, Heading, Flex, View} from '@aws-amplify/ui-react';
import {createAmplifyAuthAdapter, createStorageBrowser,createManagedAuthAdapter, } from '@aws-amplify/ui-react-storage/browser';
import "@aws-amplify/ui-react-storage/styles.css";
import '@aws-amplify/ui-react/styles.css';
import './App.css'
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);


export const {StorageBrowser} = createStorageBrowser({
    config: createManagedAuthAdapter({
        credentialsProvider: async () => {
            const session = await fetchAuthSession();
            return {
                credentials: {
                    accessKeyId: session.credentials.accessKeyId,
                    secretAccessKey: session.credentials.secretAccessKey,
                    sessionToken: session.credentials.sessionToken,
                    expiration: session.credentials.expiration,
                },
            }
        },
        // AWS `region` and `accountId` of the S3 Access Grants Instance.
        region: 'us-east-1',
        accountId: '109881088269',
        // call `onAuthStateChange` when end user auth state changes
        // to clear sensitive data from the `StorageBrowser` state
        registerAuthListener: (onAuthStateChange) => {
        },

    })
})

function App() {
    return (
        <Authenticator>
            {({signOut, user}) => (
                <Flex direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      alignContent="flex-start"
                      wrap="nowrap"
                      gap="1rem">
                    <View as="div" width="100%">
                        <Heading level={1}>Hello {user.username}</Heading>
                        <Button onClick={signOut}>Sign out</Button>
                    </View>
                    <View as="div" width="100%">
                        <StorageBrowser/>
                    </View>
                </Flex>
            )}
        </Authenticator>
    )
}

export default App;
