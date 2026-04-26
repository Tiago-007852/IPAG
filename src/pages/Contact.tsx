import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 pb-24">
      <h1 className="text-5xl font-display font-bold text-brand-blue">Fale <span className="text-brand-gold">Conosco</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-600 uppercase tracking-wider">Nome Completo</label>
            <input className="w-full px-6 py-4 glass rounded-xl outline-none border-2 border-transparent focus:border-brand-gold/30 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-600 uppercase tracking-wider">E-mail</label>
            <input className="w-full px-6 py-4 glass rounded-xl outline-none border-2 border-transparent focus:border-brand-gold/30 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-600 uppercase tracking-wider">Mensagem</label>
            <textarea rows={4} className="w-full px-6 py-4 glass rounded-xl outline-none border-2 border-transparent focus:border-brand-gold/30 transition-all" />
          </div>
          <button className="w-full py-5 bg-brand-blue text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">Enviar Mensagem</button>
        </form>
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl space-y-4">
             <h4 className="font-bold text-xl text-brand-blue">Huambo</h4>
             <p className="text-zinc-500">Av. da Independência, S/N<br />Bairro Central, Huambo</p>
             <p className="font-bold text-brand-gold">+244 9XX XXX XXX</p>
          </div>
        </div>
      </div>
    </div>
  );
}
