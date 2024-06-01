import {
    RouteObject,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import PracticePage from "./pages/practice/PracticePage";

export default function App() {
    const appRouter: RouteObject[] = [
        { path: "/", element: <PracticePage></PracticePage> },
    ];
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
