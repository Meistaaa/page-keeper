import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <NavBar />

      <main className="flex-1 container  w-full mx-auto max-w-3xl md:max-w-7xl    mt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
