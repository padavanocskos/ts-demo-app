import type { FC } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import RollListPage from "./pages/RollList";
import ErrorPage from "./pages/Error";
import Storages from "./components/Storages/Storages";
import Partners from "./components/Partners/Partners";
import Cores from "./components/Production/Cores/Cores";
import GeneralDetailView from "./components/shared/grid/views/GeneralDetailView";
import Contacts from "./components/Partners/Contacts/Contacts";
import path from "path";

const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/mill-rolls", element: <RollListPage /> },
        { path: "/storages", element: <Storages /> },
        {
          path: "/partners",
          element: <Partners />,
          children: [
            {
              path: "contacts",
              element: <Contacts />,
            },
            {
              path: `contact/:id`,
              element: <GeneralDetailView />,
            },
          ],
        },
        ,
        // { path: "/partners/contact/:id", element: <GeneralDetailView /> },
        { path: "/production/cores", element: <Cores /> },
        // { path: "/counter", element: <Counter initialValue={4} /> },
      ],
    },
  ]);
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
  );
};

export default App;
