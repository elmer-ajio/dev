
import { ThemeRepository } from "@/src/theme";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRepository>
        {children}
        </ThemeRepository>
      </body>
    </html>
  );
}
