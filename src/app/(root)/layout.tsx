import Footer from "@/components/ui/shared/Footer";
import Header from "@/components/ui/shared/Header";

// layout for including navbar and footer - which is not present in auth pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
