import { motion } from 'motion/react';
import Hero from '../components/Hero';
import { GraduationCap, BookOpen, Users, Trophy, ArrowRight, Calendar, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Alunos Ativos', value: '1.200+', icon: <Users size={24} /> },
  { label: 'Cursos Técnicos', value: '8', icon: <BookOpen size={24} /> },
  { label: 'Professores PhD', value: '25', icon: <GraduationCap size={24} /> },
  { label: 'Prêmios Nacionais', value: '12', icon: <Trophy size={24} /> },
];

const courses = [
  { id: 1, title: 'Informática e Gestão', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', category: 'Tecnologia' },
  { id: 2, title: 'Contabilidade', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2012&auto=format&fit=crop', category: 'Finanças' },
  { id: 3, title: 'Gestão de Recursos Humanos', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop', category: 'Gestão' },
  { id: 4, title: 'Comércio', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop', category: 'Negócios' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24 overflow-x-hidden">
      <Hero />

      {/* Stats Section */}
      <section className="px-6 md:px-12">
        <motion.div
           variants={container}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={item} className="p-10 card-sleek text-center space-y-4">
              <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center mx-auto text-brand-blue">
                {stat.icon}
              </div>
              <div>
                <p className="text-4xl font-display font-black text-brand-blue-dark dark:text-white tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Courses Sneak Peek */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-5xl md:text-6xl font-display font-extrabold text-brand-blue-dark dark:text-white leading-[0.95] tracking-tighter">
                Escolha o seu caminho para a <span className="text-brand-gold">Excelência</span>.
              </h2>
              <p className="text-lg text-slate-500 dark:text-zinc-400 leading-relaxed">Oferecemos programas de ensino médio técnico desenhados para as necessidades reais da economia angolana.</p>
            </div>
            <Link 
              to="/cursos" 
              className="group flex items-center gap-2 text-brand-blue dark:text-white font-extrabold uppercase text-sm tracking-widest hover:text-brand-gold transition-colors"
            >
              Ver todos os cursos
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative h-[400px] rounded-[2rem] overflow-hidden shadow-lg cursor-pointer"
              >
                <img 
                  src={course.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={course.title} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-8 space-y-2">
                   <div className="text-[10px] font-bold text-brand-gold bg-brand-gold/10 backdrop-blur-md px-3 py-1 rounded-full inline-block uppercase tracking-widest">
                     {course.category}
                   </div>
                   <h3 className="text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">{course.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & News */}
      <section className="px-6 md:px-12 bg-white dark:bg-zinc-900/50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-8 space-y-12">
            <h3 className="text-4xl font-display font-extrabold text-brand-blue-dark dark:text-white tracking-tighter">
              Notícias Institucionais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="group cursor-pointer space-y-4">
                  <div className="rounded-2xl overflow-hidden aspect-video">
                    <img 
                      src={`https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-zinc-500 flex items-center gap-2">
                       <Calendar size={14}/> 20 Abr 2026
                    </p>
                    <h4 className="text-xl font-bold text-brand-blue dark:text-white group-hover:text-brand-gold transition-colors">IPAG conquista 1º lugar na Olimpíada de Gestão Provincial.</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 space-y-8">
             <h3 className="text-3xl font-display font-bold text-brand-blue dark:text-white">Eventos</h3>
             <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="shrink-0 w-16 h-16 rounded-2xl border-2 border-brand-blue/5 flex flex-col items-center justify-center font-bold group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <span className="text-xl leading-none">1{i}</span>
                      <span className="text-[10px] uppercase tracking-tight">Maio</span>
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-brand-blue dark:text-white leading-snug group-hover:text-brand-gold transition-colors">Workshop: O Futuro da Inteligência Artificial na Gestão Pública.</h5>
                      <p className="text-xs text-zinc-500 flex items-center gap-2">09:00 - Auditório Principal</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-brand-blue relative overflow-hidden p-12 md:p-24 text-center space-y-8">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 relative"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white max-w-3xl mx-auto leading-tight">
              Pronto para transformar a sua carreira?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto">Inscreva-se hoje e faça parte da elite acadêmica do Huambo. Vagas limitadas para o ano letivo de 2026.</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
               <button className="px-10 py-5 bg-brand-gold text-brand-blue rounded-2xl font-bold text-lg hover:scale-105 transition-transform">Inscreva-se Agora</button>
               <button className="px-10 py-5 bg-white/5 border border-white/20 text-white rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-colors">Ver Edital 2026</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
