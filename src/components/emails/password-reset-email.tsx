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
  
  interface PasswordResetEmailProps {
    userFirstName: string;
    resetPasswordUrl: string;
  }
  
  export const PasswordResetEmail = ({
    userFirstName,
    resetPasswordUrl,
  }:PasswordResetEmailProps) => {
    return (
      <Html>
        <Head />
        <Preview>Reset your password for your account</Preview>
        <Tailwind>
          <Body className="bg-gray-50 font-sans">
            <Container className="mx-auto px-6 py-8">
              <Section className="rounded-xl bg-white p-8 shadow-lg">
                <Heading className="text-2xl font-bold text-gray-900 mb-4">
                  Password Reset Request
                </Heading>
                <Text className="text-gray-700 mb-4">
                  Hi {userFirstName},
                </Text>
                <Text className="text-gray-700 mb-6">
                  We received a request to reset your password. Click the button below to choose a new password:
                </Text>
                <Button
                  className="bg-blue-600 rounded-lg text-white px-6 py-3 font-medium hover:bg-blue-700 text-center"
                  href={resetPasswordUrl}
                >
                  Reset Password
                </Button>
                <Text className="text-gray-700 mt-6">
                  If you didn't request this password reset, you can safely ignore this email.
                </Text>
                <Text className="text-gray-600 text-sm mt-4">
                  For security, this link expires in 24 hours. After that, you'll need to request a new password reset.
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