import { Routes, Route, Navigate } from 'react-router-dom';
import { SearchPage } from '@/pages/SearchPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { Layout } from '@/components/feature/Layout';
import { FavoritesProvider } from '@/context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
