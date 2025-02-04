import { useNavigate, createFileRoute } from "@tanstack/react-router";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Keep this named export for route tree
export const Route = createFileRoute("/404")({
  component: NotFoundPage,
});

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[#F9EFE6] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        {/* Main Content */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo instead of Ghost */}
          <div className="mb-8">
            <img
              src="data:image/svg+xml;charset=utf8,%3Csvg width='217' height='198' viewBox='0 0 217 198' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='217' height='198' rx='39.2558' fill='black'/%3E%3Cpath d='M158.895 24H58.4737C39.9867 24 25 38.9867 25 57.4737V141.158C25 159.645 39.9867 174.632 58.4737 174.632H158.895C177.382 174.632 192.368 159.645 192.368 141.158V57.4737C192.368 38.9867 177.382 24 158.895 24Z' stroke='white' stroke-width='16.7368' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M66.8418 74.2109L83.5786 90.9478L66.8418 107.685' stroke='white' stroke-width='16.7368' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M108.684 107.684H125.42' stroke='white' stroke-width='16.7368' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
              alt="PromptStack Logo"
              width={96}
              height={96}
              className="mx-auto animate-float"
            />
          </div>

          {/* Error Message */}
          <h1 className="text-7xl font-bold text-[#2a2a2a] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#2a2a2a] mb-4">
            Looks like you've found a page that doesn't exist
          </h2>
          <p className="text-gray-400 mb-8">
            Don't worry, even the best explorers sometimes wander into uncharted
            territory.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate({ to: "/" })}
              className="px-6 py-3 bg-[#2a2a2a] text-white rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors duration-200"
            >
              Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
