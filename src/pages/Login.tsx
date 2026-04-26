import { motion } from 'motion/react';
import { GraduationCap, ArrowLeft, Mail, Lock, Eye, EyeOff, User, BookOpen, Users } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signInWithGoogle, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'TEACHER' | 'PARENT'>('STUDENT');

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-6 py-12">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-brand-blue transition-colors font-bold uppercase tracking-wider text-xs">
        <ArrowLeft size={16} />
        Voltar ao Site
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="bg-brand-blue p-4 rounded-3xl shadow-xl">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-display font-black text-brand-blue-dark dark:text-white tracking-tighter">Portal IPAG</h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Acesso ao Ambiente Académico</p>
          </div>
        </div>

        <div className="glass p-8 rounded-[40px] border border-white shadow-2xl space-y-8">
          <div className="space-y-4">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Identifique-se como:</p>
            <div className="grid grid-cols-3 gap-3">
              <RoleButton 
                active={selectedRole === 'STUDENT'} 
                onClick={() => setSelectedRole('STUDENT')}
                icon={<User size={18} />}
                label="Aluno"
              />
              <RoleButton 
                active={selectedRole === 'TEACHER'} 
                onClick={() => setSelectedRole('TEACHER')}
                icon={<BookOpen size={18} />}
                label="Prof"
              />
              <RoleButton 
                active={selectedRole === 'PARENT'} 
                onClick={() => setSelectedRole('PARENT')}
                icon={<Users size={18} />}
                label="Pai"
              />
            </div>
          </div>

          <div className="relative py-2 flex items-center">
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <div className="space-y-4">
             <button 
                onClick={handleGoogleSignIn}
                className="w-full py-4 bg-white border border-slate-200 text-brand-blue-dark rounded-2xl font-black text-sm flex items-center justify-center gap-4 hover:shadow-xl hover:border-brand-blue/20 transition-all active:scale-[0.98]"
             >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Continuar como {selectedRole === 'STUDENT' ? 'Aluno' : selectedRole === 'TEACHER' ? 'Professor' : 'Encarregado'}
             </button>
             <p className="text-[10px] text-center text-slate-400 font-medium px-4">
               Ao continuar, você aceita os termos de uso e a política de privacidade da instituição.
             </p>
          </div>
        </div>

        <p className="text-center text-sm font-medium text-slate-500">
          Problemas no acesso? <button className="text-brand-gold font-bold hover:underline">Falar com o Suporte</button>
        </p>
      </motion.div>
    </div>
  );
}

function RoleButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all",
        active 
          ? "bg-brand-blue-dark border-brand-blue-dark text-white shadow-lg" 
          : "bg-slate-50 border-slate-100 text-slate-400 hover:border-brand-blue/30 hover:text-brand-blue"
      )}
    >
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
