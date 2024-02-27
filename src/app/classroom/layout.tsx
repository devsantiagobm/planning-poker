"use client";

import { Authenticator, Button, Heading, Image, Text, View, useAuthenticator, useTheme, } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify'
import awsExports from "src/aws-exports";
import { ReactNode } from "react";
import { DefaultComponents } from "node_modules/@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";
Amplify.configure(awsExports);


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Authenticator className="auth-layout">
            {
                children
            }
        </Authenticator>
    )
}

