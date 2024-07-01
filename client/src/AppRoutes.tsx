import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoutes from './auth/ProtectedRoutes';
import ManageRestaurantPage from './pages/ManageRestaurantPage';
import SearchPage from './pages/SearchPage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import OrderStatusPage from './pages/OrderStatusPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route  
                path='/' 
                element={
                    <Layout showHero>
                         <HomePage /> 
                    </Layout> } 
            />
            <Route path='/auth-callback' element={ <AuthCallbackPage /> } />
            <Route 
                path='/search/:city'
                element={
                    <Layout showHero={false}>
                        <SearchPage />
                    </Layout>
                }
            />
            <Route 
                path='/details/:restaurantId'
                element={
                    <Layout showHero={false}>
                        <RestaurantDetailsPage />
                    </Layout>
                }
            />
            <Route element={<ProtectedRoutes />}>
                <Route  
                    path='/user-profile' 
                    element={ 
                        <Layout>
                            <UserProfilePage />
                        </Layout>
                    } 
                />
            </Route>
            <Route element={<ProtectedRoutes />}>
                <Route  
                    path='/manage-restaurant' 
                    element={ 
                        <Layout>
                            <ManageRestaurantPage />
                        </Layout>
                    } 
                />
            </Route>
            <Route element={<ProtectedRoutes />}>
                <Route  
                    path='/order-status' 
                    element={ 
                        <Layout>
                            <OrderStatusPage />
                        </Layout>
                    } 
                />
            </Route>
            <Route  path='*' element={ <Navigate to='/' /> } />
        </Routes>
    );
}

export default AppRoutes;