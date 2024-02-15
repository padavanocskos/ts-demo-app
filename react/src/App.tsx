import type { FC } from 'react'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import RollListPage from './pages/RollList';
import ErrorPage from './pages/Error';

const App: FC = () => {
  const router = createBrowserRouter([
    { 
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <HomePage />},
        { path: '/mill-rolls', element: <RollListPage />}
      ]
    }
  ])
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Counter initialValue={4}/>} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      {/* <div className="App" data-testid="App">
        <Counter initialValue={4} />
      </div> */}
      <RouterProvider router={router} />
        {/* <Counter initialValue={4} */}
    </>
  )
}

export default App
