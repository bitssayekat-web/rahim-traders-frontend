/**
 * ============================================================================
 *  App — route table
 * ----------------------------------------------------------------------------
 *    /                  → Home
 *    /products          → Product listing   (?category=<id> filters)
 *    /products/:slug    → Product details
 *    *                  → 404
 * ============================================================================
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductListingPage from './pages/ProductListingPage'

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListingPage /> },
      { path: 'products/:slug', element: <ProductDetailsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
