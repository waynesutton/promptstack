import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "../ThemeContext";
import NotFoundPage from "./404";

export const Route = createRootRoute({
  component: () => {
    return (
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    );
  },
  notFoundComponent: NotFoundPage,
});

export const rootRoute = Route;
