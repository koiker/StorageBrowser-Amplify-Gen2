import {useState} from 'react'
import {Amplify} from 'aws-amplify';
import {signUp} from 'aws-amplify/auth';
import {Authenticator, Button, Heading, Flex, View} from '@aws-amplify/ui-react';
import {createAmplifyAuthAdapter, createStorageBrowser,} from '@aws-amplify/ui-react-storage/browser';
import "@aws-amplify/ui-react-storage/styles.css";
import '@aws-amplify/ui-react/styles.css';
import './App.css'
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);


export const {StorageBrowser} = createStorageBrowser({
    config: createAmplifyAuthAdapter(),
});


function App() {
    const services = {
        async handleSignUp(input) {
            console.log(input)
            const {username, password, options} = input;
            return signUp({
                username: username,
                password,
                options: {
                    ...input.options,
                    userAttributes: {
                        ...input.options?.userAttributes,
                        email: username,
                    },
                },
            });
        },
    };
    return (
        <Authenticator services={services}>
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
