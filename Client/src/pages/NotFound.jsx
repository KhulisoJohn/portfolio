import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page not found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page youre looking for doesnt exist or may have been moved.
      </p>
      <Link to="/" className="cosmic-button flex items-center gap-2">
        <Home size={16} />
        Back to Home
      </Link>
    </div>
  );
};