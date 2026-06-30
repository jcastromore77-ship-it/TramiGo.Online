// ─────────────────────────────────────────────
// Dashboard v3 — Diseño con peso real de producto
// premium. Sin emojis decorativos, tipografía
// Space Grotesk, jerarquía clara, sin "juguete".
// ─────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles, ArrowUpRight, FileText, Home, Users, TrendingUp, HeartPulse, Building2 } from 'lucide-react'
import { user, matters, alerts, HUB_COLORS } from '../data/mockData'

export default function Dashboard() {
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  const modules = [
    { key: 'tramites',    label: 'Trámites',    value: '12 activos',    color: '#2563EB', icon: FileText },
    { key: 'propiedades', label: 'Propiedades', value: '3 propiedades', color: '#00A859', icon: Home },
    { key: 'familia',     label: 'Familia',     value: '6 miembros',    color: '#7C3AED', icon: Users },
    { key: 'inversiones', label: 'Inversiones', value: '4 activas',     color: '#0EA5A4', icon: TrendingUp },
    { key: 'salud',       label: 'Salud',       value: '5 citas',       color: '#DB2763', icon: HeartPulse },
    { key: 'negocios',    label: 'Negocios',    value: '2 empresas',    color: '#B45309', icon: Building2 },
  ]

  const pins = [
    { city: 'Bogotá',       top: '50%', left: '57%', color: '#EF4444' },
    { city: 'Medellín',     top: '36%', left: '50%', color: '#2563EB' },
    { city: 'Cali',         top: '60%', left: '48%', color: '#2563EB' },
    { city: 'Cartagena',    top: '20%', left: '38%', color: '#9CA3AF' },
    { city: 'Barranquilla', top: '15%', left: '52%', color: '#F59E0B' },
  ]

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl tracking-tight" style={{ color: '#0A0E1A' }}>
            {greeting}, {user.name.split(' ')[0]}
          </h1>
          <p className="text-sm mt-1.5" style={{ color: '#6B7280' }}>
            Tu Centro de Control Colombia — actualizado hace 2 minutos.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border" style={{ borderColor: '#E5E8EE', minWidth: 280 }}>
          <Search size={16} style={{ color: '#9CA3AF' }} />
          <span className="text-sm" style={{ color: '#9CA3AF' }}>Buscar en tu Colombia...</span>
          <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded border" style={{ color: '#9CA3AF', borderColor: '#E5E8EE' }}>⌘K</span>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 260 }}>
        <div className="absolute inset-0"
          style={{
            background: `linear-gradient(115deg, rgba(6,10,24,0.97) 0%, rgba(10,18,40,0.88) 45%, rgba(6,10,24,0.6) 100%), url(https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=1600&q=80) center/cover`,
          }} />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative z-10 p-9 grid" style={{ gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
              style={{ background: 'rgba(0,214,122,0.12)', border: '1px solid rgba(0,214,122,0.3)', color: '#00D67A' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#00D67A' }} />
              Sistema activo · tiempo real
            </div>
            <p className="text-white/45 text-sm font-medium mb-1">Índice de Tranquilidad</p>
            <div className="flex items-end gap-3 mb-1">
              <span className="font-display font-bold text-white leading-none" style={{ fontSize: 72, letterSpacing: '-3px' }}>92</span>
              <span className="text-white/40 font-display text-2xl mb-2">/ 100</span>
            </div>
            <p className="text-white/55 text-sm max-w-md leading-relaxed">
              Todo lo que tienes en Colombia está bajo control verificado. 3 asuntos requieren tu atención esta semana.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3" style={{ minWidth: 320 }}>
            {[
              { val: '23', label: 'Bajo control', color: '#00D67A' },
              { val: '03', label: 'Requieren atención', color: '#F59E0B' },
              { val: '01', label: 'Riesgo detectado', color: '#EF4444' },
              { val: '04', label: 'Próximos eventos', color: '#60A5FA' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-display font-bold text-white text-2xl mb-1" style={{ color: s.color }}>{s.val}</div>
                <div className="text-white/40 text-[11px] font-medium leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: '380px 1fr' }}>
        <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E5E8EE' }}>
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-bold" style={{ color: '#0A0E1A' }}>Desglose por área</span>
            <button onClick={() => navigate('/app/tracker')} className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#2563EB' }}>
              Reporte completo <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0" style={{ width: 116, height: 116 }}>
              <svg width="116" height="116" viewBox="0 0 116 116">
                <circle cx="58" cy="58" r="50" fill="none" stroke="#F1F4F7" strokeWidth="9" />
                <circle cx="58" cy="58" r="50" fill="none" stroke="#00A859" strokeWidth="9"
                  strokeDasharray={2 * Math.PI * 50} strokeDashoffset={2 * Math.PI * 50 * 0.08}
                  strokeLinecap="round" transform="rotate(-90 58 58)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-bold" style={{ fontSize: 28, color: '#0A0E1A' }}>92%</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: 'Trámites',    val: 95, color: '#2563EB' },
                { label: 'Propiedades', val: 90, color: '#00A859' },
                { label: 'Familia',     val: 88, color: '#7C3AED' },
                { label: 'Inversiones', val: 93, color: '#0EA5A4' },
                { label: 'Salud',       val: 91, color: '#DB2763' },
              ].map(b => (
                <div key={b.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: '#4B5563' }}>{b.label}</span>
                    <span className="text-xs font-bold" style={{ color: '#0A0E1A' }}>{b.val}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: '#F1F4F7' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${b.val}%`, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E5E8EE' }}>
          <div className="flex items-center justify-between mb-5">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#9CA3AF' }}>Misión activa principal</span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: '#EBF2FF', color: '#2563EB' }}>En proceso</span>
          </div>
          <h3 className="font-display font-bold text-xl mb-1.5" style={{ color: '#0A0E1A' }}>Compra apartamento — El Poblado</h3>
          <p className="text-xs mb-6" style={{ color: '#9CA3AF' }}>María Restrepo · Abogada Senior · disponible ahora</p>

          <div className="flex items-end justify-between mb-2">
            <span className="font-display font-bold" style={{ fontSize: 44, letterSpacing: '-2px', color: '#2563EB' }}>72%</span>
            <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>Paso 4 de 6 · 3 días restantes</span>
          </div>
          <div className="h-2 rounded-full mb-6" style={{ background: '#F1F4F7' }}>
            <div className="h-full rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg,#2563EB,#60A5FA)' }} />
          </div>
          <div className="flex justify-between mb-6">
            {['Búsqueda', 'Verificación', 'Documentos', 'Firma', 'Registro', 'Entrega'].map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-2" style={{ width: 60 }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={i < 3 ? { background: '#00A859', color: '#fff' } : i === 3 ? { background: '#2563EB', color: '#fff' } : { background: '#F1F4F7', color: '#9CA3AF' }}>
                  {i < 3 ? '✓' : i + 1}
                </div>
                <span className="text-[10px] text-center font-medium" style={{ color: i <= 3 ? '#374151' : '#C4CDD6' }}>{s}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/app/tracker')}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#0A0E1A' }}>
            Ver caso completo · TG-2847
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-7" style={{ borderColor: '#E5E8EE' }}>
        <div className="mb-6">
          <h2 className="font-display font-bold text-xl" style={{ color: '#0A0E1A' }}>Centro de control</h2>
          <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>Todo lo que tienes en Colombia, organizado por categoría.</p>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {modules.map(m => {
            const Icon = m.icon
            return (
              <button key={m.key}
                onClick={() => navigate('/app/dashboard')}
                className="text-left p-5 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: '#F1F4F7' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${m.color}14` }}>
                  <Icon size={20} style={{ color: m.color }} />
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: '#0A0E1A' }}>{m.label}</div>
                <div className="text-xs font-medium" style={{ color: '#9CA3AF' }}>{m.value}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 360px' }}>
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E5E8EE' }}>
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F1F4F7' }}>
            <span className="text-sm font-bold flex items-center gap-2" style={{ color: '#0A0E1A' }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#00D67A' }} />
              Operaciones en Colombia
            </span>
            <button onClick={() => navigate('/app/tracker')} className="text-xs font-semibold" style={{ color: '#2563EB' }}>Ver detalle →</button>
          </div>
          <div className="relative" style={{ height: 200, background: '#060A18' }}>
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.3) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
            {pins.map(p => (
              <div key={p.city} className="absolute group cursor-pointer" style={{ top: p.top, left: p.left }}>
                <div className="w-3 h-3 rounded-full border-2 border-white" style={{ background: p.color, boxShadow: `0 0 0 5px ${p.color}30` }} />
                <span className="absolute left-1/2 -translate-x-1/2 top-5 hidden group-hover:block whitespace-nowrap bg-white rounded-lg px-2.5 py-1.5 text-[11px] font-bold shadow-xl z-10" style={{ color: '#0A0E1A' }}>
                  {p.city}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg,#060A18,#0A1F0F)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} style={{ color: '#00D67A' }} />
              <span className="text-white font-bold text-sm">TramiGo AI</span>
            </div>
            <p className="text-white/45 text-xs mb-4 leading-relaxed">Anticipa riesgos y resuelve antes de que tengas que preguntar.</p>
            <button onClick={() => navigate('/app/ai')}
              className="w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: '#00A859' }}>
              Hablar con TramiGo AI
            </button>
          </div>

          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#E5E8EE' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold" style={{ color: '#0A0E1A' }}>Alertas activas</span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600">{alerts.length} nuevas</span>
            </div>
            {alerts.slice(0, 3).map(a => (
              <div key={a.id} className="flex items-center gap-2.5 py-2.5 border-b last:border-0" style={{ borderColor: '#F1F4F7' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.type === 'urgent' ? '#EF4444' : a.type === 'medium' ? '#F59E0B' : '#00A859' }} />
                <span className="text-xs flex-1 font-medium" style={{ color: '#374151' }}>{a.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border" style={{ borderColor: '#E5E8EE' }}>
        <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: '#F1F4F7' }}>
          <span className="font-display font-bold text-base" style={{ color: '#0A0E1A' }}>Trámites en curso</span>
          <button onClick={() => navigate('/app/tracker')} className="text-xs font-semibold" style={{ color: '#2563EB' }}>Ver todos →</button>
        </div>
        {matters.map(m => (
          <div key={m.id} onClick={() => navigate('/app/tracker')}
            className="flex items-center gap-4 px-6 py-4 border-b last:border-0 cursor-pointer hover:bg-gray-50/80 transition-colors"
            style={{ borderColor: '#F1F4F7' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${HUB_COLORS[m.hub]}14` }}>
              <FileText size={17} style={{ color: HUB_COLORS[m.hub] }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold" style={{ color: '#0A0E1A' }}>{m.title}</div>
              <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{m.id} · {m.advisor}</div>
            </div>
            <span className="font-display font-bold text-sm" style={{ color: HUB_COLORS[m.hub] }}>{m.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
