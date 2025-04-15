
import { Provider } from "@/src/state";
import { ThemeRepository } from "@/src/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ThemeRepository>
             {children}
          </ThemeRepository>
        </Provider>
      </body>
    </html>
  );
}
