import {
    RouteObject,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import PracticePage from "./pages/practice/PracticePage";
import AuthPage from "./pages/auth/AuthPage";
import useIsAuth from "./hooks/auth/useIsAuth";

export default function App() {
    const appRouter: RouteObject[] = [
        { path: "/", element: <PracticePage /> },
        { path: "/auth", element: <AuthPage /> },
    ];

    useIsAuth();

    return (
        <div
            className="w-screen h-screen
                        flex flex-col items-center
                        text-3xl"
        >
            <RouterProvider router={createBrowserRouter(appRouter)} />
        </div>
    );
}
