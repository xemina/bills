export const metadata = {
  title: 'Grocery Bills',
  description: 'Grocery bill tracker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
