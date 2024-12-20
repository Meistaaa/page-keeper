import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-col">
        {/* Navbar */}
        <NavBar />

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 mt-16">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </SidebarProvider>
  );
}
