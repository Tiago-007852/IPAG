import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  Users, 
  CheckCircle2, 
  ClipboardList, 
  Plus, 
  ArrowLeft,
  ChevronRight,
  Search,
  LayoutDashboard,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeacherDashboard({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'grades' | 'attendance'>('overview');
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd fetch classes where this teacher is assigned
    // For now, let's mock the classes list and fetch all students
    const fetchTeacherContext = async () => {
      try {
        const studentsSnap = await getDocs(query(collection(db, 'users'), where('role', '==', 'STUDENT')));
        setStudents(studentsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        
        setClasses([
          { id: '10A', name: '10ª Classe - Administração A', studentCount: 32 },
          { id: '11B', name: '11ª Classe - Gestão B', studentCount: 28 },
          { id: '12A', name: '12ª Classe - Contabilidade A', studentCount: 25 },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherContext();
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-blue-dark text-white p-6 md:min-h-screen">
        <Link to="/" className="flex items-center gap-2 mb-10 group">
          <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center">
            <ArrowLeft className="text-brand-blue-dark" size={18} />
          </div>
          <span className="font-bold text-sm uppercase tracking-widest">Voltar ao Site</span>
        </Link>
        
        <nav className="space-y-4">
          <SidebarButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
            icon={<LayoutDashboard size={20} />} 
            label="Visão Geral" 
          />
          <SidebarButton 
            active={activeTab === 'grades'} 
            onClick={() => setActiveTab('grades')} 
            icon={<ClipboardList size={20} />} 
            label="Lançar Notas" 
          />
          <SidebarButton 
            active={activeTab === 'attendance'} 
            onClick={() => setActiveTab('attendance')} 
            icon={<CheckCircle2 size={20} />} 
            label="Registro de Presença" 
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto pt-24 md:pt-12">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-brand-blue-dark tracking-tighter">
              Olá, Prof. {user.displayName?.split(' ').pop()}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Portal do Docente • Gestão Académica</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue shadow-sm">
              <MessageSquare size={18} />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-40 bg-white rounded-[40px]" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 bg-white rounded-[40px]" />
              <div className="h-64 bg-white rounded-[40px]" />
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {classes.map(cls => (
                    <div key={cls.id} className="glass p-8 rounded-[40px] hover:shadow-xl transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center">
                          <Users size={24} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cls.id}</span>
                      </div>
                      <h3 className="text-xl font-display font-extrabold text-brand-blue-dark mb-2">{cls.name}</h3>
                      <p className="text-sm font-medium text-slate-500 mb-6">{cls.studentCount} Alunos Inscritos</p>
                      <button className="flex items-center gap-2 text-xs font-black text-brand-blue uppercase tracking-widest group-hover:text-brand-gold transition-colors">
                        Gerenciar Turma <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="glass p-10 rounded-[40px]">
                  <h3 className="text-xl font-display font-extrabold text-brand-blue-dark mb-8">Notificações Administrativas</h3>
                  <div className="space-y-4">
                    <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-brand-gold" />
                        <p className="text-sm font-bold text-brand-blue-dark">Reunião de Conselho de Notas - 15 de Maio</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Publicado há 2h</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'grades' && (
              <motion.div 
                key="grades"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input className="w-full pl-12 pr-6 py-4 glass rounded-2xl outline-none" placeholder="Buscar aluno por nome ou ID..." />
                  </div>
                  <button className="px-8 py-4 bg-brand-blue text-white rounded-2xl font-bold flex items-center gap-2">
                    <Plus size={18} /> Novo Lançamento
                  </button>
                </div>

                <div className="glass overflow-hidden rounded-[40px]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estudante</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disciplina</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Média Atual</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {students.map(student => (
                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-bold">
                                {student.name?.[0]}
                              </div>
                              <span className="text-sm font-bold text-brand-blue-dark">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-500 font-medium tracking-tight">Administração de Empresas</td>
                          <td className="px-8 py-6">
                            <span className="text-lg font-black text-brand-blue-dark tracking-tighter">16 <span className="text-xs text-slate-300">/ 20</span></span>
                          </td>
                          <td className="px-8 py-6">
                            <button className="text-[10px] font-black text-brand-blue uppercase tracking-widest hover:text-brand-gold">Editar Nota</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

function SidebarButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all",
        active 
          ? "bg-white text-brand-blue-dark shadow-xl shadow-black/10" 
          : "text-white/60 hover:text-white hover:bg-white/5"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
