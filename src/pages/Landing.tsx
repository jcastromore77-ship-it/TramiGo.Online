// ─────────────────────────────────────────────
// Landing v3 — Premium, psicología de venta aplicada
// Problema real → Agitación → Solución → Prueba →
// Oferta irresistible → Urgencia → Garantía → CTA
// ─────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import { Check, ShieldCheck, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import Logo from '../components/Logo'

const HUBS = [
  { hub: 'family',       color: '#DB2763', name: 'Family OS',       desc: 'Citas, cumpleaños, salud y emergencias familiares — gestionadas sin que tengas que llamar.' },
  { hub: 'property',     color: '#B45309', name: 'Property OS',     desc: 'Arriendos cobrados, impuestos pagados, mantenimiento coordinado. Sin sorpresas.' },
  { hub: 'legal',        color: '#7C3AED', name: 'Legal OS',        desc: 'Poderes, sucesiones y representación legal activa — actuamos en tu nombre.' },
  { hub: 'wealth',       color: '#0EA5A4', name: 'Wealth OS',       desc: 'Tu patrimonio en Colombia, monitoreado y proyectado en tiempo real.' },
  { hub: 'business',     color: '#2563EB', name: 'Business OS',     desc: 'Empresas, contabilidad y obligaciones — resueltas antes de que venzan.' },
  { hub: 'celebrations', color: '#9333EA', name: 'Celebrations OS', desc: 'Bodas, cumpleaños y eventos organizados desde donde estés.' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 md:px-12"
        style={{ background: 'rgba(6,10,24,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Logo size={20} variant="dark" />
        <div className="hidden md:flex gap-8">
          {['Cómo funciona', 'Planes', 'Garantía'].map(l => (
            <span key={l} className="text-sm font-medium text-white/50 cursor-pointer hover:text-white">{l}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all">
            Iniciar sesión
          </button>
          <button onClick={() => navigate('/register')}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#00A859' }}>
            Empezar ahora
          </button>
        </div>
      </nav>

      {/* ════ HERO — Problema real + Solución ════ */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#060A18 0%,#0A1228 55%,#060A18 100%)' }}>
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.05) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px]" style={{ background: 'radial-gradient(circle,rgba(0,166,89,0.12) 0%,transparent 65%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-12 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(0,166,89,0.12)', border: '1px solid rgba(0,166,89,0.3)', color: '#00D67A' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
              Solo 200 cupos disponibles este mes
            </div>
            <h1 className="font-display font-bold text-white leading-[0.95] mb-6" style={{ fontSize: 'clamp(38px,4.5vw,62px)', letterSpacing: '-2.5px' }}>
              Tu vida en Colombia,<br />en <span style={{ color: '#00D67A' }}>buenas manos.</span>
            </h1>
            <p className="text-lg mb-8 max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>
              El sistema operativo que te representa, anticipa y resuelve todo lo que tienes en Colombia — mientras tú vives tranquilo donde estés.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button onClick={() => navigate('/register')}
                className="px-8 py-4 rounded-xl font-bold text-base text-white transition-all hover:scale-[1.03] flex items-center gap-2"
                style={{ background: '#00A859', boxShadow: '0 0 32px rgba(0,166,89,0.35)' }}>
                Empezar gratis hoy <ArrowRight size={17} />
              </button>
              <button className="px-7 py-4 rounded-xl font-semibold text-white/80 text-base border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                Ver cómo funciona
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex">
                {['#2563EB','#7C3AED','#00A859','#DB2763'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: c, borderColor: '#060A18', marginLeft: i ? -8 : 0 }}>{['AP','MR','JC','+'][i]}</div>
                ))}
              </div>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <strong className="text-white">4,200+</strong> colombianos ya viven tranquilos
              </span>
            </div>
          </div>

          {/* Right - phone */}
          <div className="flex justify-center">
            <div className="w-72 rounded-3xl p-5 shadow-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
              <div className="text-white font-display font-bold text-lg mb-4">Hola, Juan Carlos</div>
              <div className="rounded-2xl p-4 mb-3" style={{ background: 'rgba(0,166,89,0.1)', border: '1px solid rgba(0,166,89,0.2)' }}>
                <div className="font-display font-bold text-3xl mb-1" style={{ color: '#00D67A' }}>92%</div>
                <div className="text-white/50 text-xs">Tu vida en Colombia está saludable</div>
              </div>
              {[
                { t: 'Cumpleaños de mamá', s: 'En 3 días' },
                { t: 'Poder notarial', s: 'Firma pendiente' },
                { t: 'Predial pagado', s: 'Completado' },
              ].map((x, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-0">
                  <div>
                    <div className="text-white text-xs font-semibold">{x.t}</div>
                    <div className="text-white/35 text-[10px]">{x.s}</div>
                  </div>
                  <Check size={14} className="text-green-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ PROBLEMA REAL — agitación ════ */}
      <section className="py-24 px-8 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#DB2763' }}>El problema real</p>
          <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(28px,3.5vw,42px)', color: '#0A0E1A', letterSpacing: '-1.5px' }}>
            ¿Cuánto tiempo llevas sin saber qué está<br />pasando con tu vida en Colombia?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
            Documentos que vencen sin avisar. Propiedades sin monitorear. Trámites que se quedan a medias porque nadie te representa de verdad. La distancia no debería costarte tranquilidad.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-14">
          {[
            { stat: '68%', label: 'de colombianos en el exterior no sabe el estado de sus trámites en este momento' },
            { stat: '$2.4M', label: 'promedio perdido al año por vencimientos no detectados a tiempo' },
            { stat: '4.2 hrs', label: 'semanales dedicadas a llamadas y gestiones que podrían resolverse solas' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-7 border" style={{ borderColor: '#E5E8EE' }}>
              <div className="font-display font-bold mb-3" style={{ fontSize: 40, color: '#DB2763', letterSpacing: '-1px' }}>{s.stat}</div>
              <p className="text-sm" style={{ color: '#6B7280' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════ SOLUCIÓN — Los hubs ════ */}
      <section className="py-24 px-8 md:px-12" style={{ background: '#F7F8FB' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#00A859' }}>La solución completa</p>
            <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(30px,4vw,46px)', color: '#0A0E1A', letterSpacing: '-2px' }}>
              Un sistema. Seis áreas de tu vida.<br />Control total.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {HUBS.map(h => (
              <div key={h.hub} className="bg-white rounded-2xl p-7 border transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: '#E5E8EE', borderTopColor: h.color, borderTopWidth: 3 }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${h.color}14` }}>
                  <div className="w-4 h-4 rounded" style={{ background: h.color }} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#0A0E1A' }}>{h.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PRUEBA SOCIAL ════ */}
      <section className="py-20 px-8 md:px-12" style={{ background: '#060A18' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-8">
          {[['4,200+','Colombianos activos'],['38','Países atendidos'],['97%','Satisfacción'],['<24h','Inicio garantizado']].map(([n,l]) => (
            <div key={l} className="text-center">
              <div className="font-display font-bold text-white" style={{ fontSize: 40, letterSpacing: '-1.5px' }}>{n}</div>
              <div className="text-xs text-white/35 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════ OFERTA IRRESISTIBLE + URGENCIA ════ */}
      <section className="py-24 px-8 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: '#FEF3F2', color: '#DB2763' }}>
            <Clock size={13} /> Oferta válida solo para los primeros 200 nuevos miembros
          </div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(28px,3.5vw,42px)', color: '#0A0E1A', letterSpacing: '-1.5px' }}>
            Empieza con el plan completo,<br />a precio de plan básico.
          </h2>
          <p className="text-lg" style={{ color: '#6B7280' }}>Acceso a los 6 hubs + TramiGo AI + asesor dedicado. Sin letra pequeña.</p>
        </div>

        <div className="max-w-md mx-auto rounded-3xl overflow-hidden border-2" style={{ borderColor: '#00A859' }}>
          <div className="px-8 py-3 text-center text-xs font-bold uppercase tracking-wider text-white" style={{ background: '#00A859' }}>
            Plan fundador — precio congelado de por vida
          </div>
          <div className="p-9 text-center">
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="font-display font-bold" style={{ fontSize: 56, color: '#0A0E1A', letterSpacing: '-2px' }}>$99</span>
              <div className="text-left">
                <div className="text-sm line-through" style={{ color: '#C4CDD6' }}>$299</div>
                <div className="text-xs" style={{ color: '#9CA3AF' }}>USD / mes</div>
              </div>
            </div>
            <p className="text-xs font-semibold mb-7" style={{ color: '#00A859' }}>Ahorras $200 cada mes, para siempre</p>
            <div className="space-y-3 mb-8 text-left">
              {['Acceso a los 6 Life OS Hubs', 'Asesor dedicado en Colombia', 'TramiGo AI ilimitado', 'Bóveda documental 50 GB', 'Videollamadas sin límite', 'Soporte prioritario 24/7'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#ECFDF5' }}>
                    <Check size={12} style={{ color: '#00A859' }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#374151' }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/register')}
              className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 mb-3"
              style={{ background: '#0A0E1A' }}>
              Asegurar mi precio fundador →
            </button>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>Sin tarjeta requerida para empezar · Cancela cuando quieras</p>
          </div>
        </div>
      </section>

      {/* ════ GARANTÍA ════ */}
      <section className="py-20 px-8 md:px-12" style={{ background: '#F7F8FB' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#ECFDF5' }}>
            <ShieldCheck size={28} style={{ color: '#00A859' }} />
          </div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(26px,3vw,36px)', color: '#0A0E1A', letterSpacing: '-1px' }}>
            Garantía de inicio en 24 horas.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Si no iniciamos la gestión de tu primer trámite dentro de 24 horas hábiles, te devolvemos el 100% de tu pago. Sin preguntas, sin condiciones.
          </p>
        </div>
      </section>

      {/* ════ CTA FINAL ════ */}
      <section className="py-24 px-8 md:px-12 text-center" style={{ background: 'linear-gradient(160deg,#060A18,#0A1228)' }}>
        <TrendingUp size={32} className="mx-auto mb-6" style={{ color: '#00D67A' }} />
        <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(28px,4vw,46px)', letterSpacing: '-1.5px' }}>
          Tu Colombia, bajo control,<br />desde hoy.
        </h2>
        <p className="text-white/45 text-lg mb-9 max-w-lg mx-auto">Únete a los 4,200 colombianos que ya duermen tranquilos.</p>
        <button onClick={() => navigate('/register')}
          className="px-10 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105"
          style={{ background: '#00A859', boxShadow: '0 0 40px rgba(0,166,89,0.4)' }}>
          Empezar gratis ahora →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-8 md:px-12" style={{ background: '#060A18' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <Logo size={18} variant="dark" />
          <div className="text-white/25 text-xs">© 2024 TramiGo.Online SAS · NIT 901.XXX.XXX-X</div>
        </div>
      </footer>
    </div>
  )
}
