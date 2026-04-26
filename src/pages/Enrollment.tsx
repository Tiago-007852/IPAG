import { motion } from 'motion/react';

export default function Enrollment() {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-4xl mx-auto space-y-12 pb-24">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-display font-bold text-brand-blue">Matrícula <span className="text-brand-gold">Online</span></h1>
        <p className="text-zinc-500 font-medium">Inicie sua jornada acadêmica preenchendo o formulário abaixo.</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-zinc-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Nome do Candidato</label>
            <input className="w-full px-5 py-3 glass border border-zinc-200 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Curso Pretendido</label>
            <select className="w-full px-5 py-3 glass border border-zinc-200 rounded-xl outline-none">
              <option>Administração</option>
              <option>Gestão de Sistemas</option>
              <option>Contabilidade</option>
            </select>
          </div>
          <div className="md:col-span-2 text-center pt-8">
            <p className="text-xs text-zinc-400 mb-6 font-medium">Ao clicar em continuar, você concorda com nossos termos de matrícula e processamento de dados.</p>
            <button className="px-12 py-5 bg-brand-blue text-white rounded-2xl font-bold text-xl shadow-lg hover:bg-brand-blue/90 transition-all">Continuar Processo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
