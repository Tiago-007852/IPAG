import { motion } from 'motion/react';
import { ChevronRight, ArrowUpRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden px-6 md:px-12">
      {/* Background with abstract shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold-light border border-brand-gold/20 rounded-full">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-brand-gold-dark uppercase tracking-widest">Matrículas Abertas • Huambo</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-display font-extrabold leading-[0.95] tracking-tighter text-brand-blue-dark dark:text-white text-balance">
            A Excelência <br/> começa aqui.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 dark:text-zinc-400 max-w-lg leading-relaxed">
            Formando os líderes de amanhã com tecnologia de ponta, infraestrutura moderna e ensino humanizado.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-4 bg-brand-blue text-white rounded-2xl font-bold text-lg shadow-2xl flex items-center gap-2 hover:bg-brand-blue-dark transition-all hover:scale-105">
              Inscreva-se Agora
              <span className="text-brand-gold">→</span>
            </button>
            <button className="px-8 py-4 bg-white dark:bg-zinc-800 text-slate-700 dark:text-white border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-lg hover:shadow-xl transition-all">
              Tour Virtual 3D
            </button>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative"
        >
          {/* Main Image Container */}
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
              alt="Estudantes IPAG" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent" />
          </div>

          {/* Floating Card: Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-6 -left-6 md:-left-12 glass p-6 rounded-3xl shadow-xl z-20 max-w-[200px]"
          >
            <p className="text-brand-blue font-black text-4xl mb-1 tracking-tighter">98%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
              Taxa de Empregabilidade após estágio
            </p>
          </motion.div>

          {/* Floating Card: AI Tutor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ delay: 1 }}
            className="absolute top-12 -right-6 md:-right-8 bg-brand-blue text-white p-4 rounded-2xl shadow-xl z-20 transform border-4 border-slate-50 max-w-[140px]"
          >
            <div className="text-[10px] font-bold uppercase mb-1 opacity-80">IA Tutora</div>
            <p className="text-xs leading-tight font-medium">Olá! Precisas de ajuda para o exame de amanhã?</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
