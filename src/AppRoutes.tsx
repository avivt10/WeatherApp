import React, { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

const AppRoutes = () => {
    const WeatherView = React.lazy(() => import("./views/weatherView"))
    const FavoritesView = React.lazy(() => import("./views/favoritesView"))
    
  return (
    // must add suspense while using lazy loading 
    <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
        <Routes>
					<Route path='/' element={<WeatherView />} />
					<Route path='/map' element={<FavoritesView />} />
        </Routes>
    </BrowserRouter>
    </Suspense>
  )
}

export default AppRoutes