export const metadata = {
  title: "مؤشر الفيدرالي",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Markazi+Text:wght@500;700&family=Tajawal:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0B1220",
          color: "#F2EFE9",
          fontFamily: "'Tajawal', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
