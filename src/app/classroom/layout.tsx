"use client";
import { ReactNode } from "react";

import { Authenticator, Image } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify'
import awsExports from "src/aws-exports";
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';


I18n.putVocabularies(translations);
I18n.setLanguage('es');
Amplify.configure(awsExports);


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Authenticator className="auth-layout" components={components}>{children}</Authenticator>
    )
}

const components = {
    Header() {
        return (
            <div className="amplify-custom-header">
                <Image src="/images/pragma-logo-long.png" alt="Pragma logo" maxWidth={124} />
            </div>
        )
    },
};