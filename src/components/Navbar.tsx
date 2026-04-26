import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, GraduationCap, User } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Cursos', href: '/cursos' },
  { name: 'Matrícula', href: '/matricula' },
  { name: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 md:px-8',
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-brand-blue flex items-center justify-center w-10 h-10 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
             <div className="w-5 h-5 border-2 border-brand-gold rotate-45"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg md:text-xl text-brand-blue-dark dark:text-white uppercase leading-none tracking-tight">IPAG Huambo</span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-white/50 uppercase tracking-widest leading-none mt-0.5">Instituição de Excelência</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-semibold transition-colors hover:text-brand-blue relative py-1',
                location.pathname === link.href ? 'text-brand-blue dark:text-white' : 'text-slate-600 dark:text-zinc-400'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="px-6 py-2.5 text-sm font-bold text-white bg-brand-blue rounded-full shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Portal do Aluno
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-blue dark:text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-brand-blue dark:text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-blue text-white font-bold"
            >
              <User className="w-5 h-5" />
              Acessar Portal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
