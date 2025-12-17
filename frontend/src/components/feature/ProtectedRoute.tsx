import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Skeleton } from '@/components/ui/skeleton';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center p-8">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-[300px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
