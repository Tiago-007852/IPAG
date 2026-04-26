import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-white">
      {/* Feature Icons Bar */}
      <div className="h-auto md:h-24 bg-brand-blue-dark px-6 md:px-12 py-8 md:py-0 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 h-full">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-16">
            <FeatureItem icon="📚" title="Biblioteca Digital" subtitle="+5000 ebooks grátis" />
            <FeatureItem icon="💻" title="Ensino Híbrido" subtitle="Plataforma 24/7" />
            <FeatureItem icon="🏅" title="Laboratórios Pro" subtitle="Hardware Industrial" />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-bold text-slate-400 text-right uppercase tracking-[0.2em] leading-relaxed">
              Huambo, Angola<br/>Rua Independência, s/n
            </p>
            <div className="h-8 w-px bg-white/10 hidden md:block"></div>
            <div className="flex gap-2">
              <SocialIcon label="FB" />
              <SocialIcon label="IG" />
              <SocialIcon label="LI" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 p-12 md:px-12 md:py-20">
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-brand-blue flex items-center justify-center w-10 h-10 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
               <div className="w-5 h-5 border-2 border-brand-gold rotate-45"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl uppercase leading-none tracking-tight">IPAG Huambo</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-none mt-1">Instituição de Excelência</span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            O Instituto Poltécnico de Huambo forma os líderes de amanhã com tecnologia de ponta e ensino de excelência.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
          <ul className="space-y-4">
            <FooterLink href="/sobre">Sobre a Escola</FooterLink>
            <FooterLink href="/cursos">Nossos Cursos</FooterLink>
            <FooterLink href="/eventos">Eventos e Notícias</FooterLink>
            <FooterLink href="/contato">Fale Conosco</FooterLink>
            <FooterLink href="/biblioteca">Biblioteca Digital</FooterLink>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Cursos Técnicos</h4>
          <ul className="space-y-4">
            <FooterLink href="/cursos/informatica-gestao">Informática e Gestão</FooterLink>
            <FooterLink href="/cursos/contabilidade">Contabilidade</FooterLink>
            <FooterLink href="/cursos/recursos-humanos">Gestão de Recursos Humanos</FooterLink>
            <FooterLink href="/cursos/comercio">Comércio</FooterLink>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Contato</h4>
          <ul className="space-y-4 text-white/60">
            <li className="flex items-start gap-3 text-sm">
              <MapPin className="text-brand-gold shrink-0 mt-1" size={18} />
              <span>Av. da Independência, Huambo, Angola</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone className="text-brand-gold shrink-0" size={18} />
              <span>+244 9XX XXX XXX</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Mail className="text-brand-gold shrink-0" size={18} />
              <span>contato@ipag-huambo.ed.ao</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© 2026 IPAG Huambo. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

function FeatureItem({ icon, title, subtitle }: { icon: string; title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl shadow-inner border border-white/5">
        {icon}
      </div>
      <div>
        <p className="text-sm font-extrabold tracking-tight">{title}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400 hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer">
      {label}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link to={href} className="text-slate-400 text-sm font-medium hover:text-brand-gold transition-colors">
        {children}
      </Link>
    </li>
  );
}
