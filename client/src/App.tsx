import {
    RouteObject,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import PracticePage from "./pages/practice/PracticePage";
import AuthPage from "./pages/auth/AuthPage";
import useIsAuth from "./hooks/auth/useIsAuth";
import NotFoundPage from "./pages/notFound/NotFound";
import ForgotPasswordPage from "./pages/forgotPassword/ForgotPasswordPage";
import VerifyPage from "./pages/verify/VerifyPage";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";
import StatisticsPage from "./pages/statistics/StatisticsPage";

export default function App() {
    const appRouter: RouteObject[] = [
        { path: "/", element: <PracticePage /> },
        { path: "/auth", element: <AuthPage /> },
        {
            path: "/verify/:token",
            element: <VerifyPage />,
        },
        { path: "/forgot-password", element: <ForgotPasswordPage /> },
        { path: "/reset-password/:token", element: <ResetPasswordPage /> },
        { path: "/statistics", element: <StatisticsPage /> },
        {
            path: "/*",
            element: <NotFoundPage />,
        },
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
