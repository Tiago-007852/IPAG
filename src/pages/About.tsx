import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-display font-bold text-brand-blue"
      >
        Sobre o <span className="text-brand-gold">IPAG</span>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6 text-zinc-600 font-medium leading-relaxed">
          <p>O Instituto Poltécnico de Administração e Gestão (IPAG) é uma instituição de ensino secundário técnico dedicada a formar os futuros líderes de Angola.</p>
          <p>Nossa missão é fornecer uma educação de excelência que combine teoria rigorosa com prática profissional, preparando nossos alunos para os desafios do mercado global.</p>
        </div>
        <div className="aspect-video rounded-3xl overflow-hidden bg-brand-gray">
          <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
}
