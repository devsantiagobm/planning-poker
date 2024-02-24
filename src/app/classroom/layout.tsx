"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify'
import awsExports from "src/aws-exports";
import {ReactNode} from "react";
Amplify.configure(awsExports);


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Authenticator>
            {
                children
            }
        </Authenticator>
    )
}