// ─────────────────────────────────────────────
// Landing page — public marketing site
// ─────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

const HUBS = [
  { hub: 'family',       color: '#E11D48', name: 'Family OS',       icon: '👨‍👩‍👧', desc: 'Citas, cumpleaños, salud y emergencias familiares' },
  { hub: 'property',     color: '#D97706', name: 'Property OS',     icon: '🏠', desc: 'Arriendos, impuestos, mantenimiento e inmuebles' },
  { hub: 'health',       color: '#0891B2', name: 'Health OS',       icon: '🏥', desc: 'Concierge médico, citas premium y seguros' },
  { hub: 'legal',        color: '#7C3AED', name: 'Legal OS',        icon: '⚖️', desc: 'Poderes, demandas, sucesiones y representación' },
  { hub: 'wealth',       color: '#047857', name: 'Wealth OS',       icon: '📈', desc: 'Patrimonio, inversiones y planificación financiera' },
  { hub: 'business',     color: '#1D4ED8', name: 'Business OS',     icon: '💼', desc: 'Empresas, contabilidad y obligaciones legales' },
  { hub: 'celebrations', color: '#A21CAF', name: 'Celebrations OS', icon: '🎉', desc: 'Fechas especiales, regalos y eventos' },
  { hub: 'black',        color: '#C9A84C', name: 'TramiGo Black',   icon: '★',  desc: 'Asesor ejecutivo 24/7 y servicios VIP exclusivos', dark: true },
]

const PLANS = [
  {
    name: 'Essential', price: '$99', color: '#1A56DB',
    features: ['1 asesor dedicado', 'Seguimiento tiempo real', '3 hubs activos', 'Bóveda 5 GB', 'TramiGo AI básico'],
    cta: 'Empezar', featured: false, dark: false,
  },
  {
    name: 'Premium', price: '$299', color: '#3B82F6',
    features: ['Todo Essential +', 'Asesor senior', '7 hubs completos', 'TramiGo AI avanzado', 'Videollamadas ilimitadas'],
    cta: 'Empezar', featured: true, dark: true,
  },
  {
    name: 'Black', price: '$999', color: '#C9A84C',
    features: ['Todo Premium +', 'Asesor ejecutivo 24/7', 'Línea privada', 'Transporte blindado', 'Gestión patrimonial'],
    cta: 'Solicitar acceso', featured: false, dark: true,
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-12"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #E8ECF0' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-syne font-extrabold text-white text-sm"
            style={{ background: 'linear-gradient(135deg,#1A56DB,#3B82F6)' }}>T</div>
          <span className="font-syne font-extrabold text-[#0D1B2A] text-lg tracking-tight">
            Trami<span className="text-[#1A56DB]">Go</span>
            <span className="text-[#1A56DB] text-sm">.Online</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8">
          {['Inicio','Servicios','Planes','Contacto'].map(l => (
            <span key={l} className="text-sm font-medium text-[#6B7280] cursor-pointer hover:text-[#0D1B2A]">{l}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-[#0D1B2A] border border-[#E8ECF0] hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all">
            Iniciar sesión
          </button>
          <button onClick={() => navigate('/register')}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg,#1A56DB,#2563EB)', boxShadow: '0 4px 16px rgba(26,86,219,0.3)' }}>
            Comienza ahora →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16"
        style={{ background: 'linear-gradient(160deg,#030B1F 0%,#071B4B 50%,#0D2868 100%)' }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.18) 0%,transparent 65%)' }} />
        <div className="absolute bottom-0 left-48 w-72 h-72 pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 65%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-12 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#93C5FD' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-dot" />
              Colombian Life OS
            </div>
            <h1 className="font-syne font-extrabold text-white leading-none mb-6"
              style={{ fontSize: 'clamp(42px,5vw,72px)', letterSpacing: '-3px' }}>
              Tu vida en<br />Colombia, en<br />
              <span style={{ color: '#00E676' }}>buenas manos.</span>
            </h1>
            <p className="text-lg mb-10 max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
              El sistema que te representa, te acompaña y te da tranquilidad en todo lo que necesitas en Colombia. Un equipo real, potenciado por IA.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => navigate('/register')}
                className="px-9 py-4 rounded-xl font-bold text-base transition-all hover:scale-105"
                style={{ background: '#00C853', color: '#030B1F', boxShadow: '0 0 32px rgba(0,200,83,0.35)', fontWeight: 800 }}>
                Comienza ahora →
              </button>
              <button onClick={() => navigate('/login')}
                className="px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.2)' }}>
                Ver demo ▶
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex">
                {['#1A56DB','#7C3AED','#059669','#E11D48'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c, marginLeft: i ? -8 : 0 }}>
                    {['AP','MR','JC','+'][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <strong className="text-white">4,200+</strong> colombianos en 38 países
              </span>
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex justify-center">
            <div className="relative w-72 rounded-3xl p-4 shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)' }}>
              <div className="text-white/80 font-semibold mb-1 text-sm">Hola,</div>
              <div className="text-white font-syne font-extrabold text-xl mb-4">Juan Carlos 👋</div>

              {/* Life Score */}
              <div className="rounded-2xl p-4 mb-3 flex items-center gap-4"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5"/>
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#10B981" strokeWidth="5"
                      strokeDasharray="163" strokeDashoffset="51" strokeLinecap="round"
                      transform="rotate(-90 32 32)"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-syne font-extrabold text-white text-sm">92%</span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Life Score</div>
                  <div className="text-white/40 text-xs">Tu vida en Colombia está saludable</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
                    <span className="text-green-400 text-[10px] font-bold">ACTIVO</span>
                  </div>
                </div>
              </div>

              {/* Activity items */}
              {[
                { icon: '🎂', title: 'Cumpleaños de mamá', sub: 'En 3 días · Bogotá', dot: '#E11D48' },
                { icon: '📋', title: 'Poder notarial', sub: 'Firma pendiente · Notaría 12', dot: '#10B981' },
                { icon: '✓', title: 'Predial pagado', sub: 'Completado · El Poblado', dot: '#059669' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-white/[0.05] last:border-0">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="text-white text-xs font-semibold">{item.title}</div>
                    <div className="text-white/35 text-[10px]">{item.sub}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ background: item.dot }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="py-7 px-12 flex flex-wrap items-center justify-around gap-6"
        style={{ background: '#0D1B2A' }}>
        {[['4,200+','Colombianos atendidos'],['38','Países'],['97%','Satisfacción NPS'],['<24h','Inicio garantizado'],['12,000+','Trámites completados']].map(([n,l]) => (
          <div key={l} className="flex items-center gap-3">
            <span className="font-syne font-extrabold text-white text-2xl">{n}</span>
            <span className="text-xs text-white/35 leading-tight max-w-[80px]">{l}</span>
          </div>
        ))}
      </div>

      {/* HUBS */}
      <section className="py-24 px-12" style={{ background: '#F4F6FB' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1A56DB] mb-3">La plataforma</div>
            <h2 className="font-syne font-extrabold text-[#0D1B2A] mb-2" style={{ fontSize: 52, letterSpacing: '-2px' }}>
              7 sistemas operativos.
            </h2>
            <h2 className="font-syne font-extrabold text-[#9CA3AF]" style={{ fontSize: 52, letterSpacing: '-2px' }}>
              Un solo panel.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HUBS.map(h => (
              <div key={h.hub}
                onClick={() => navigate('/register')}
                className="rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                style={{
                  background: h.dark ? '#080808' : '#fff',
                  border: `1px solid ${h.dark ? '#1C1C1C' : '#E8ECF0'}`,
                  borderTopColor: h.color, borderTopWidth: 4,
                  boxShadow: '0 2px 8px rgba(13,27,42,0.06)',
                }}>
                <div className="text-3xl mb-4">{h.icon}</div>
                <div className="font-syne font-extrabold mb-2 text-base"
                  style={{ color: h.dark ? '#fff' : '#0D1B2A' }}>{h.name}</div>
                <div className="text-xs leading-relaxed mb-4"
                  style={{ color: h.dark ? 'rgba(255,255,255,0.4)' : '#9CA3AF' }}>{h.desc}</div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full"
                  style={{ background: `${h.color}15`, color: h.color }}>
                  ● Explorar
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1A56DB] mb-3">Planes y precios</div>
            <h2 className="font-syne font-extrabold text-[#0D1B2A] mb-2" style={{ fontSize: 48, letterSpacing: '-2px' }}>
              Tu equipo colombiano<br />desde $99/mes
            </h2>
            <p className="text-[#6B7280] text-base">Sin letra pequeña. Garantía de inicio en 24 horas o reembolso del 100%.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map(p => (
              <div key={p.name}
                className="rounded-2xl p-9 border transition-all hover:-translate-y-1"
                style={{
                  background: p.dark ? '#0D1B2A' : '#fff',
                  border: `1px solid ${p.featured ? '#1A56DB' : '#E8ECF0'}`,
                  transform: p.featured ? 'scale(1.03)' : undefined,
                  boxShadow: p.featured ? '0 12px 40px rgba(26,86,219,0.2)' : undefined,
                }}>
                {p.featured && (
                  <div className="text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block"
                    style={{ background: 'rgba(59,130,246,0.2)', color: '#60A5FA' }}>
                    Más popular
                  </div>
                )}
                <div className="font-syne font-extrabold mb-2 text-xl" style={{ color: p.dark ? '#fff' : '#0D1B2A' }}>{p.name}</div>
                <div className="font-syne font-extrabold mb-1 leading-none" style={{ fontSize: 48, letterSpacing: '-2px', color: p.dark ? '#fff' : '#0D1B2A' }}>{p.price}</div>
                <div className="text-xs mb-6" style={{ color: p.dark ? 'rgba(255,255,255,0.35)' : '#9CA3AF' }}>USD / mes</div>
                <div className="h-px mb-6" style={{ background: p.dark ? 'rgba(255,255,255,0.08)' : '#E8ECF0' }} />
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-2 mb-3 text-sm" style={{ color: p.dark ? 'rgba(255,255,255,0.7)' : '#374151' }}>
                    <Check size={14} style={{ color: p.dark ? '#4ADE80' : '#059669', flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
                <button onClick={() => navigate('/register')}
                  className="w-full mt-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: p.name === 'Black' ? 'linear-gradient(135deg,#C9A84C,#E8C96A)'
                      : p.featured ? '#1A56DB' : '#F4F6FB',
                    color: p.name === 'Black' ? '#080808' : p.featured ? '#fff' : '#0D1B2A',
                    border: p.featured || p.name === 'Black' ? 'none' : '1px solid #E8ECF0',
                  }}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-12" style={{ background: '#0D1B2A' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="font-syne font-extrabold text-white text-xl tracking-tight mb-1">
              Trami<span className="text-blue-400">Go</span>.Online
            </div>
            <div className="text-white/30 text-xs">The Colombia Life Operating System</div>
          </div>
          <div className="flex gap-6">
            {['Privacidad','Términos','Seguridad','Contacto'].map(l => (
              <span key={l} className="text-white/30 text-xs cursor-pointer hover:text-white/60">{l}</span>
            ))}
          </div>
          <div className="text-white/20 text-xs">© 2024 TramiGo.Online SAS · NIT 901.XXX.XXX-X</div>
        </div>
      </footer>
    </div>
  )
}
