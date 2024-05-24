import { auth } from "@/auth";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

const MainContentLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <div className="w-full min-h-screen relative pb-[58px]">
      <Header session={session} />
      <div className="p-4">{children}</div>
      <Footer />
    </div>
  );
};

export default MainContentLayout;
