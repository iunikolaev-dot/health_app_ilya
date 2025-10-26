import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WHOOP Demo App',
  description: 'WHOOP Health Data Demo Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

