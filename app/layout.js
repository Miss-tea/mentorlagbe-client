import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap"
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap"
});
export const metadata = {
  title: {
    default: "MentorLagbe | Find Tutors & Mentors",
    template: "%s | MentorLagbe"
  },
  description: "Find verified tutors and mentorship batches by subject, class level and budget."
};
export default function RootLayout({
  children
}) {
  return <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-canvas font-sans text-fg antialiased">
        {}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>;
}
