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

interface TransferLinkEmailProps {
    senderName: string;
    transferUrl: string;
    fileName: string;
    fileSize?: string;
    expiryDate?: string;
}

export const TransferLinkEmail = ({
    senderName,
    transferUrl,
    fileName,
    fileSize,
    expiryDate,
}: TransferLinkEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>{senderName} shared a file with you: {fileName}</Preview>
            <Tailwind>
                <Body className="bg-gray-50 font-sans">
                    <Container className="mx-auto px-6 py-8">
                        <Section className="rounded-xl bg-white p-8 shadow-lg">
                            <Heading className="text-2xl font-bold text-gray-900 mb-4">
                                File Share Notification
                            </Heading>
                            <Text className="text-gray-700 mb-4">
                                {senderName} has shared a file with you:
                            </Text>
                            <Section className="bg-gray-50 rounded-lg p-4 mb-6">
                                <Text className="text-gray-700 font-medium mb-2">
                                    {fileName}
                                </Text>
                                {fileSize && (
                                    <Text className="text-gray-600 text-sm mb-2">
                                        Size: {fileSize}
                                    </Text>
                                )}
                                {expiryDate && (
                                    <Text className="text-gray-600 text-sm">
                                        Available until: {expiryDate}
                                    </Text>
                                )}
                            </Section>
                            <Text className="text-gray-700 mb-6">
                                Click the button below to download your file:
                            </Text>
                            <Button
                                className="bg-blue-600 rounded-lg text-white px-6 py-3 font-medium hover:bg-blue-700 text-center"
                                href={transferUrl}
                            >
                                Download File
                            </Button>
                            <Text className="text-gray-700 mt-6 text-sm">
                                If you weren't expecting this file or don't recognize the sender, please don't click the download link.
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