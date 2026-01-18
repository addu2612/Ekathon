import "./globals.css";

export const metadata = {
  title: "Vani-Health",
  description: "Voice-first healthcare access guidance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
