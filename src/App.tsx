import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./motion/ScrollProgress";
import RouteSuspense from "./components/RouteSuspense";
// Eager import — the fallback must be available even if a route chunk fails.
import ErrorBoundary from "./components/ErrorBoundary";

// Code-split every route. Each page ships its own chunk, loaded on navigation.
const Home = lazy(() => import("./pages/Home"));
const Platform = lazy(() => import("./pages/Platform"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <ErrorBoundary>
          <Suspense fallback={<RouteSuspense />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/platform" element={<Platform />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
