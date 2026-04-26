import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../context/AuthContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  Book, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatTutor from '../components/ChatTutor';

export default function StudentDashboard({ user }: { user: any }) {
  const [grades, setGrades] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      try {
        const gradesQuery = query(collection(db, 'grades'), where('studentId', '==', user.uid), orderBy('date', 'desc'), limit(5));
        const gradesSnap = await getDocs(gradesQuery);
        setGrades(gradesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const attendQuery = query(collection(db, 'attendance'), where('studentId', '==', user.uid), orderBy('date', 'desc'), limit(10));
        const attendSnap = await getDocs(attendQuery);
        setAttendance(attendSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const assignQuery = query(collection(db, 'assignments'), where('studentId', '==', user.uid), orderBy('dueDate', 'asc'));
        const assignSnap = await getDocs(assignQuery);
        setAssignments(assignSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoadingData(false);
      }
    }
    fetchData();
  }, [user]);

  const averageGrade = grades.length > 0 
    ? (grades.reduce((acc, curr) => acc + curr.value, 0) / grades.length).toFixed(1) 
    : "---";

  const totalAbsences = attendance.filter(a => a.status === 'ABSENT').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-24 px-6 md:px-12 pb-12">
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
                Espaço do Aluno
              </h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Bem-vindo, {user.displayName?.split(' ')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-5 py-2 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
               Inscrito: 2024/2025
             </div>
          </div>
        </header>

        {loadingData ? (
           <div className="grid grid-cols-1 md:grid-cols-12 gap-10 opacity-50">
             <div className="md:col-span-12 h-64 bg-white rounded-[40px] animate-pulse" />
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8 space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <DashboardStatCard 
                  title="Média Geral" 
                  value={averageGrade} 
                  subtitle="Ciclo Atual" 
                  icon={<TrendingUp className="text-emerald-500" size={18} />}
                  color="text-brand-blue-dark" 
                />
                <DashboardStatCard 
                  title="Faltas" 
                  value={String(totalAbsences).padStart(2, '0')} 
                  subtitle="Limite de 15" 
                  icon={<AlertCircle className="text-amber-500" size={18} />}
                  color="text-amber-600" 
                />
                <DashboardStatCard 
                  title="Tarefas" 
                  value={String(assignments.filter(a => !a.isCompleted).length).padStart(2, '0')} 
                  subtitle="Por entregar" 
                  icon={<Book className="text-blue-500" size={18} />}
                  color="text-blue-600" 
                />
              </div>
              
              <div className="glass p-10 rounded-[40px]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="text-brand-blue" size={24} />
                    <h3 className="text-2xl font-display font-extrabold text-brand-blue-dark tracking-tight">Trabalhos e Projetos</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {assignments.length > 0 ? (
                    assignments.map((assignment: any) => (
                      <AssignmentRow key={assignment.id} assignment={assignment} />
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400 font-medium">
                      <CheckCircle2 size={48} className="mx-auto mb-4 opacity-10" />
                      Sem tarefas pendentes no momento.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-10">
              <div className="glass p-10 rounded-[40px] bg-brand-blue-dark text-white space-y-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-2xl tracking-tight">Minhas Notas</h3>
                  <LayoutDashboard className="text-white/20" />
                </div>
                
                <div className="space-y-6 relative z-10">
                  {grades.length > 0 ? (
                    grades.map((grade: any) => (
                      <div key={grade.id} className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-default">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mb-1">{grade.subject}</p>
                          <p className="text-xs font-medium text-white/50">{new Date(grade.date?.toDate()).toLocaleDateString('pt-AO')}</p>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "text-3xl font-black tracking-tighter",
                            grade.value >= 14 ? "text-emerald-400" : grade.value >= 10 ? "text-brand-gold" : "text-rose-400"
                          )}>
                            {grade.value}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 italic">Notas ainda não publicadas.</p>
                  )}
                </div>
              </div>

              <div className="p-10 card-sleek">
                <div className="flex items-center gap-3 mb-8">
                   <Clock className="text-brand-blue" />
                   <h3 className="font-display font-extrabold text-xl font-bold text-brand-blue-dark">Últimas Presenças</h3>
                </div>
                <div className="space-y-5">
                  {attendance.slice(0, 5).map((record: any) => (
                    <div key={record.id} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-2.5 h-2.5 rounded-full",
                            record.status === 'PRESENT' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-rose-500"
                          )} />
                          <div className="space-y-0.5">
                            <p className="text-xs font-extrabold text-slate-700">{record.subject}</p>
                            <p className="text-[10px] font-medium text-slate-400">{new Date(record.date?.toDate()).toLocaleDateString()}</p>
                          </div>
                       </div>
                       <span className={cn(
                         "text-[10px] font-black uppercase tracking-widest",
                         record.status === 'PRESENT' ? "text-emerald-500" : "text-rose-500"
                       )}>
                         {record.status === 'PRESENT' ? 'Presente' : 'Falta'}
                       </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatTutor />
    </div>
  );
}

function DashboardStatCard({ title, value, subtitle, icon, color }: any) {
  return (
    <div className="glass p-8 rounded-[36px] space-y-4 shadow-sm border-white/60">
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-2xl">
          {icon}
        </div>
      </div>
      <div>
        <p className={cn("text-5xl font-display font-black tracking-tighter", color)}>{value}</p>
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-2">{subtitle}</p>
      </div>
    </div>
  );
}

function AssignmentRow({ assignment }: any) {
  const isOverdue = new Date(assignment.dueDate?.toDate()) < new Date() && !assignment.isCompleted;

  return (
    <div className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-slate-100 hover:shadow-2xl transition-all group hover:-translate-y-1">
      <div className="flex items-center gap-6">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all",
          assignment.isCompleted ? "bg-emerald-50 text-emerald-600" : isOverdue ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
        )}>
          {assignment.isCompleted ? <CheckCircle2 size={24} /> : <Clock size={24} />}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">{assignment.subject}</p>
          <p className="text-lg font-display font-extrabold text-brand-blue-dark dark:text-white leading-tight">{assignment.title}</p>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <div className="text-right hidden lg:block">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Prazo de Entrega</p>
           <p className={cn("text-sm font-black", isOverdue ? "text-rose-500" : "text-slate-600")}>
             {new Date(assignment.dueDate?.toDate()).toLocaleDateString('pt-AO', { day: '2-digit', month: 'long' })}
           </p>
        </div>
        <button className={cn(
          "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md",
          assignment.isCompleted 
            ? "bg-slate-100 text-slate-400 cursor-default shadow-none" 
            : "bg-brand-blue-dark text-white hover:bg-brand-blue hover:shadow-xl active:scale-95"
        )}>
          {assignment.isCompleted ? "Entregue" : "Submeter Agora"}
        </button>
      </div>
    </div>
  );
}
