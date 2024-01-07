import React, { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Loader from './shared/components/loader';

const AppRoutes = () => {
  const WeatherView = React.lazy(() => import("./views/weatherView"))
  const FavoritesView = React.lazy(() => import("./views/favoritesView"))
  const Layout = React.lazy(() => import("./layout/layout"))

  return (
    // must add suspense while using lazy loading 
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<WeatherView />} />
            <Route path='/favoritesView' element={<FavoritesView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default AppRoutes