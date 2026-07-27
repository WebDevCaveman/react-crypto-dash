import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-8 py-16 font-sans text-body text-text">
      <div className="w-full max-w-130 rounded-[18px] border border-border bg-surface px-8 py-12 text-center shadow-lg">
        <p className="inline-flex items-center rounded-full bg-brand-subtle px-3 py-1 text-caption-1 font-semibold tracking-wide text-brand">
          ERROR
        </p>

        <p className="mt-6 font-display text-d2 font-bold text-brand">404</p>

        <div className="mx-auto mt-6 h-px w-16 bg-border" />

        <h1 className="mt-6 font-display text-h5 font-semibold">
          Page Not Found
        </h1>
        <p className="mt-2 text-body text-text-secondary">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex h-14 items-center rounded-2xl bg-brand px-6 text-button font-bold text-on-brand transition-shadow duration-200 ease-out hover:bg-brand-hover hover:shadow-md focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
