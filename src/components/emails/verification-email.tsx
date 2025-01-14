import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Tailwind,
    Text
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
    userFirstName: string;
    verificationUrl: string;
}

export const VerificationEmail = ({
    userFirstName,
    verificationUrl,
}:VerificationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Verify your email address</Preview>
            <Tailwind>
                <Body className="bg-gray-50 font-sans">
                    <Container className="mx-auto px-6 py-8">
                        <Section className="rounded-xl bg-white p-8 shadow-lg">
                            <Heading className="text-2xl font-bold text-gray-900 mb-4">
                                Verify Your Email
                            </Heading>
                            <Text className="text-gray-700 mb-4">
                                Hi {userFirstName},
                            </Text>
                            <Text className="text-gray-700 mb-6">
                                Thanks for signing up! Please verify your email address by clicking the button below:
                            </Text>
                            <Button
                                className="bg-blue-600 rounded-lg text-white px-6 py-3 font-medium hover:bg-blue-700 text-center"
                                href={verificationUrl}
                            >
                                Verify Email
                            </Button>
                            <Text className="text-gray-700 mt-6">
                                If you didn't create an account, you can safely ignore this email.
                            </Text>
                            <Section className="border-t border-gray-200 mt-8 pt-4">
                                <Text className="text-gray-600 text-sm">
                                    Best regards,<br />
                                    Your App Team
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};