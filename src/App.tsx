import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Layout
const Layout = lazy(() => import('./components/Layout'));

// Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Courses = lazy(() => import('./pages/Courses'));
const Contact = lazy(() => import('./pages/Contact'));
const Enrollment = lazy(() => import('./pages/Enrollment'));
const Login = lazy(() => import('./pages/Login'));

// Dashboard (Lazy loaded per role)
const Dashboard = lazy(() => import('./dashboards/DashboardSelector'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<About />} />
            <Route path="cursos" element={<Courses />} />
            <Route path="contato" element={<Contact />} />
            <Route path="matricula" element={<Enrollment />} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes would go here */}
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="flex flex-col items-center"
      >
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-zinc-500 font-medium tracking-tight">IPAG HUAMBO</p>
      </motion.div>
    </div>
  );
}
