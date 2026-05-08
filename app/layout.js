import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Bash Session — Question Locker",
  description: "Lock your question for the Round 1 Survival Acting challenge!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1814",
              color: "#faf7f2",
              border: "1px solid #2a2520",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#f97316", secondary: "#1a1814" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#1a1814" },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
