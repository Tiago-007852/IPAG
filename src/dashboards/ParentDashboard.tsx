import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  Baby, 
  TrendingUp, 
  AlertCircle, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  ArrowLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ParentDashboard({ user }: { user: any }) {
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [grades, setGrades] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParentContext = async () => {
      try {
        // Encarregados have a links to their children in 'family' collection or similar
        // For simplicity, let's fetch students who might be linked (mocking linkage for now)
        const childrenSnap = await getDocs(query(collection(db, 'users'), where('role', '==', 'STUDENT'), limit(2)));
        const childrenData = childrenSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setChildren(childrenData);
        
        if (childrenData.length > 0) {
          setSelectedChild(childrenData[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchParentContext();
  }, [user]);

  useEffect(() => {
    if (!selectedChild) return;
    
    const fetchChildData = async () => {
      setLoading(true);
      try {
        const gSnap = await getDocs(query(collection(db, 'grades'), where('studentId', '==', selectedChild.id), orderBy('date', 'desc'), limit(5)));
        setGrades(gSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const aSnap = await getDocs(query(collection(db, 'attendance'), where('studentId', '==', selectedChild.id), orderBy('date', 'desc'), limit(10)));
        setAttendance(aSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChildData();
  }, [selectedChild]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-4xl font-display font-extrabold text-brand-blue-dark dark:text-white tracking-tighter">
                Espaço do Encarregado
              </h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Acompanhamento de Educandos • {user.displayName}</p>
            </div>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-[20px] shadow-sm border border-slate-100">
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={cn(
                  "px-6 py-2.5 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all",
                  selectedChild?.id === child.id 
                    ? "bg-brand-blue-dark text-white shadow-lg" 
                    : "text-slate-400 hover:text-brand-blue"
                )}
              >
                {child.name?.split(' ')[0]}
              </button>
            ))}
          </div>
        </header>

        {loading && !selectedChild ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : selectedChild ? (
          <AnimatePresence mode="wait">
            <motion.div 
               key={selectedChild.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="grid grid-cols-1 md:grid-cols-12 gap-10"
            >
              {/* Left Column: Summary & Grades */}
              <div className="md:col-span-8 space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <SummaryCard 
                    icon={<TrendingUp className="text-emerald-500" />} 
                    title="Desempenho Geral" 
                    value="15.8" 
                    subtitle="Média ponderada" 
                  />
                  <SummaryCard 
                    icon={<AlertCircle className="text-rose-500" />} 
                    title="Assiduidade" 
                    value="92%" 
                    subtitle="Faltas justificadas: 2" 
                  />
                </div>

                <div className="glass p-10 rounded-[40px]">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-display font-extrabold text-brand-blue-dark tracking-tight">Avaliações Recentes</h3>
                    <BookOpen className="text-slate-200" size={32} />
                  </div>
                  <div className="space-y-4">
                    {grades.map(grade => (
                      <div key={grade.id} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-50 shadow-sm">
                        <div className="space-y-1">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{grade.subject}</p>
                          <p className="text-sm font-bold text-brand-blue-dark">Exame de Fim de Período</p>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "text-3xl font-black tracking-tighter",
                            grade.value >= 14 ? "text-emerald-500" : grade.value >= 10 ? "text-amber-500" : "text-rose-500"
                          )}>
                            {grade.value} <span className="text-sm text-slate-300">/ 20</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Attendance & Contact */}
              <div className="md:col-span-4 space-y-10">
                <div className="glass p-10 rounded-[40px] bg-brand-blue-dark text-white">
                  <h3 className="text-xl font-display font-extrabold mb-8 tracking-tight">Registro de Presença</h3>
                  <div className="space-y-6">
                    {attendance.map(record => (
                      <div key={record.id} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className={cn(
                               "w-2 h-2 rounded-full",
                               record.status === 'PRESENT' ? "bg-emerald-400Shadow" : record.status === 'ABSENT' ? "bg-rose-400" : "bg-brand-gold"
                            )} />
                            <span className="text-xs font-bold text-white/70">{record.subject}</span>
                         </div>
                         <span className="text-[10px] font-black text-white/30">{new Date(record.date?.toDate()).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-10 card-sleek bg-brand-gold/5 border-brand-gold/20">
                  <MessageSquare className="text-brand-gold mb-6" size={32} />
                  <h3 className="text-xl font-display font-extrabold text-brand-blue-dark mb-4">Contactar Director de Turma</h3>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                    Dúvidas sobre o aproveitamento escolar do seu educando? Fale directamente com o responsável pedagógico.
                  </p>
                  <button className="w-full py-4 bg-brand-blue-dark text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest shadow-xl">
                    Enviar Mensagem
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-20 glass rounded-[40px]">
            <Baby className="mx-auto mb-6 opacity-20" size={64} />
            <h3 className="text-xl font-bold text-slate-400">Nenhum educando vinculado</h3>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value, subtitle }: any) {
  return (
    <div className="glass p-10 rounded-[40px] space-y-4">
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        <div className="p-2.5 bg-slate-50 rounded-2xl">{icon}</div>
      </div>
      <p className="text-5xl font-display font-black text-brand-blue-dark tracking-tighter">{value}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>
    </div>
  );
}
