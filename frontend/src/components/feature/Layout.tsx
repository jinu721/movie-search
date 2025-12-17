import {  Heart, Search } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export function Layout() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-background font-sans anti-aliased">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between mx-auto px-4 md:px-8">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="font-bold hidden md:inline-block">MovieSearch</span>
                    </Link>

                    <nav className="flex items-center space-x-4 md:space-x-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                            <span className="flex items-center gap-1"><Search className="h-4 w-4" /> Search</span>
                        </Link>
                        <Link
                            to="/favorites"
                            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/favorites') ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                            <span className="flex items-center gap-1"><Heart className="h-4 w-4" /> Favorites</span>
                        </Link>
                    </nav>

                </div>
            </header>

            <main className="container mx-auto px-4 md:px-8 py-6">
                <Outlet />
            </main>
        </div>
    );
}
