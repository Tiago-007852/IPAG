import { motion } from 'motion/react';

export default function Courses() {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 pb-24">
      <h1 className="text-5xl font-display font-bold text-brand-blue">Nossos <span className="text-brand-gold">Cursos</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {['Informática e Gestão', 'Contabilidade', 'Gestão de Recursos Humanos', 'Comércio'].map((course, i) => (
          <div key={i} className="p-8 glass rounded-[2rem] border border-zinc-200 space-y-4 hover:border-brand-gold transition-colors">
            <h3 className="text-2xl font-bold text-brand-blue">{course}</h3>
            <p className="text-zinc-500 text-sm">3 anos de duração | Técnico Médio</p>
            <button className="text-brand-gold font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Saber mais →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
