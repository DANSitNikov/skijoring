import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function MainContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen relative pb-[58px]">
      <Header />
      <div className="p-4">{children}</div>
      <Footer />
    </div>
  );
}
