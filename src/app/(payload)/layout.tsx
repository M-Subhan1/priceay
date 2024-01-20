export const metadata = {
  title: "Priceay - Admin",
  description: "Manage Priceay Products and Configuration",
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
