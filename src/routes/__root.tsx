import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "../ThemeContext";
import NotFoundPage from "./404";

export const Route = createRootRoute({
  component: () => {
    return (
      <ThemeProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </ThemeProvider>
    );
  },
  notFoundComponent: NotFoundPage,
});

export const rootRoute = Route;
