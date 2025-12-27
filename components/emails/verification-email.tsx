// import * as React from 'react';
// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Link,
//   Preview,
//   Section,
//   Text,
//   Tailwind,
// } from '@react-email/components';
// import { verification } from '@/auth-schema';


// interface VerificationEmailProps {
//   userName: string;
//   verificationUrl: string;
// }






// const VerificationEmail = ({
//   userName,
//   verificationUrl,
// }: VerificationEmailProps) => {
// // const VerificationEmail = (props: VerificationEmailProps) => {
//   return (
//     <Html lang="en" dir="ltr">
//       <Tailwind>
//         <Head />
//         <Preview>Verify your email address to complete your account setup</Preview>
//         <Body className="bg-gray-100 font-sans py-[40px]">
//           <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
//             {/* Header */}
//             <Section className="text-center mb-[32px]">
//               <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
//                 Verify Your Email Address
//               </Heading>
//               <Text className="text-[16px] text-gray-600 m-0">
//                 Welcome to our platform! Please verify your email to get started.
//               </Text>
//             </Section>

//             {/* Main Content */}
//             <Section className="mb-[32px]">
//               <Text className="text-[16px] text-gray-800 mb-[16px] m-0">
//                 Hi {userName},
//               </Text>
//               <Text className="text-[16px] text-gray-800 mb-[16px] m-0">
//                 Thanks for signing up! To complete your account setup and ensure the security of your account, please verify your email address by clicking the button below.
//               </Text>
//               <Text className="text-[16px] text-gray-800 mb-[24px] m-0">
//                 This verification link will expire in 24 hours for security purposes.
//               </Text>
//             </Section>

//             {/* Verification Button */}
//             <Section className="text-center mb-[32px]">
//               <Button
//                 href={verificationUrl}
//                 className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
//               >
//                 Verify Email Address
//               </Button>
//             </Section>

//             {/* Alternative Link */}
//             <Section className="mb-[32px]">
//               <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
//                 If the button above doesnt work, you can also verify your email by copying and pasting this link into your browser:
//               </Text>
//               <Text className="text-[14px] text-blue-600 break-all m-0">
//                 <Link href={verificationUrl} className="text-blue-600 underline">
//                   {verificationUrl}
//                 </Link>
//               </Text>
//             </Section>

//             {/* Security Notice */}
//             <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[32px]">
//               <Text className="text-[14px] text-gray-700 m-0 mb-[8px] font-semibold">
//                 Security Notice:
//               </Text>
//               <Text className="text-[14px] text-gray-600 m-0">
//                 If you didn t create an account with us, please ignore this email. Your email address will not be added to our system.
//               </Text>
//             </Section>

//             {/* Footer */}
//             <Section className="border-t border-gray-200 pt-[24px]">
//               <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
//                 This email was sent to {userEmail}
//               </Text>
//               <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
//                 © 2025 Your Company Name. All rights reserved.
//               </Text>
//               <Text className="text-[12px] text-gray-500 m-0">
//                 123 Business Street, Suite 100, City, State 12345
//               </Text>
//               <Text className="text-[12px] text-gray-500 m-0 mt-[8px]">
//                 <Link href="#" className="text-gray-500 underline">Unsubscribe</Link>
//               </Text>
//             </Section>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// };


// export default VerificationEmail;










import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  userName: string;
  verificationUrl: string;
}

const VerificationEmail = ({
  userName,
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Verify Your Email Address
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hi {userName},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Thank you for signing up! To complete your account setup and
                start using our services, please verify your email address by
                clicking the button below.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                This verification link will expire in 24 hours for security
                purposes.
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={verificationUrl}
                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border hover:bg-blue-700"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all">
                {verificationUrl}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Security Notice */}
            <Section className="mb-[24px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                <strong>Security Notice:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px]">
                If you didn &apos;t create an account with us, please ignore
                this email. Your email address will not be added to our system
                without verification.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                This email was sent by Your Company Name
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                123 Business Street, Suite 100, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;