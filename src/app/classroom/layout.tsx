"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify'
import awsExports from "../../aws-exports";
import React from "react";
Amplify.configure(awsExports);


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Authenticator>
            {
                children
            }
        </Authenticator>
    )
}