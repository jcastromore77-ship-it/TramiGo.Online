// ─────────────────────────────────────────────
// Dashboard — Colombia Control Center v2
// Inspirado en referencias: sidebar azul, módulos
// de color, mapa compacto, fondo claro con vida
// ─────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import { Bell, Search, Sparkles, ChevronRight } from 'lucide-react'
import { user, matters, alerts, HUB_COLORS } from '../data/mockData'

export default function Dashboard() {
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  const modules = [
    { key: 'tramites',    label: 'Trámites',    value: '12 activos',   color: '#2563EB', icon: '📄' },
    { key: 'propiedades', label: 'Propiedades', value: '3 propiedades',color: '#16A34A', icon: '🏠' },
    { key: 'familia',     label: 'Familia',     value: '6 miembros',   color: '#7C3AED', icon: '👥' },
    { key: 'inversiones', label: 'Inversiones',  value: '4 activas',    color: '#059669', icon: '📈' },
    { key: 'salud',       label: 'Salud',        value: '5 citas',      color: '#E11D48', icon: '❤️' },
    { key: 'negocios',    label: 'Negocios',     value: '2 empresas',   color: '#D97706', icon: '🏢' },
  ]

  const pins = [
    { city: 'Bogotá',       top: '48%', left: '58%', color: '#EF4444', status: 'Requiere acción' },
    { city: 'Medellín',     top: '38%', left: '52%', color: '#3B82F6', status: 'En proceso' },
    { city: 'Cali',         top: '58%', left: '50%', color: '#3B82F6', status: 'En proceso' },
    { city: 'Cartagena',    top: '24%', left: '40%', color: '#9CA3AF', status: 'Nueva' },
    { city: 'Barranquilla', top: '20%', left: '53%', color: '#F59E0B', status: 'En revisión' },
  ]

  return (
    <div className="space-y-5 animate-slide-in">
      {/* Top header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne font-extrabold text-2xl tracking-tight" style={{ color: '#0D1B2A' }}>
            {greeting}, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm mt-0.5" style={{ color: '#6B7280' }}>
            Aquí tienes el control total de tu vida en Colombia.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border"
            style={{ borderColor: '#E8ECF0', minWidth: 260 }}>
            <Search size={15} style={{ color: '#9CA3AF' }} />
            <span className="text-sm" style={{ color: '#9CA3AF' }}>Buscar trámites, propiedades...</span>
          </div>
          <button className="relative w-10 h-10 rounded-xl bg-white border flex items-center justify-center"
            style={{ borderColor: '#E8ECF0' }}>
            <Bell size={17} style={{ color: '#374151' }} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
          </button>
        </div>
      </div>

      {/* HERO: Tranquilidad + imagen ciudad */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 360px' }}>
        {/* Left hero card with city image */}
        <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 280 }}>
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(7,11,26,0.75), rgba(13,40,104,0.55)), url(https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=1200&q=80) center/cover',
            }} />
          <div className="relative z-10 p-7 h-full flex flex-col justify-between" style={{ minHeight: 280 }}>
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">Tu tranquilidad, nuestro compromiso.</p>
              <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-4">Estado general</p>
              <div className="flex items-center gap-3">
                <span className="font-syne font-extrabold text-white" style={{ fontSize: 56, letterSpacing: '-2px' }}>92%</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
                <span className="text-green-300 text-sm font-semibold">Todo bajo control</span>
              </div>
            </div>

            {/* Quick stat pills */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: '23', label: 'Todo bajo control', color: '#22C55E' },
                { val: '3', label: 'Requieren atención', color: '#F59E0B' },
                { val: '1', label: 'Riesgo detectado', color: '#EF4444' },
                { val: '4', label: 'Próximos eventos', color: '#60A5FA' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                  <div className="font-syne font-extrabold text-white text-xl mb-0.5">{s.val}</div>
                  <div className="text-white/60 text-[10px] leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Tranquilidad ring breakdown */}
        <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E8ECF0' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold" style={{ color: '#0D1B2A' }}>Mi tranquilidad</span>
            <button onClick={() => navigate('/app/tracker')} className="text-xs font-semibold flex items-center gap-1" style={{ color: '#2563EB' }}>
              Ver reporte <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex items-center gap-5 mb-2">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg width="128" height="128" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="54" fill="none" stroke="#F1F4F7" strokeWidth="10" />
                <circle cx="64" cy="64" r="54" fill="none" stroke="#16A34A" strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 54} strokeDashoffset={2 * Math.PI * 54 * 0.08}
                  strokeLinecap="round" transform="rotate(-90 64 64)" className="animate-ring" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-syne font-extrabold" style={{ fontSize: 30, color: '#0D1B2A' }}>92%</span>
                <span className="text-[10px]" style={{ color: '#9CA3AF' }}>Tranquilidad</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {[
                { label: 'Trámites',    val: 95, color: '#2563EB' },
                { label: 'Propiedades', val: 90, color: '#16A34A' },
                { label: 'Familia',     val: 88, color: '#7C3AED' },
                { label: 'Inversiones', val: 93, color: '#059669' },
                { label: 'Salud',       val: 91, color: '#E11D48' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color }} />
                  <span className="text-xs flex-1" style={{ color: '#374151' }}>{b.label}</span>
                  <span className="text-xs font-bold" style={{ color: '#0D1B2A' }}>{b.val}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
            style={{ background: '#F0FDF4', color: '#15803D' }}>
            🎉 ¡Excelente! Vas por muy buen camino.
          </div>
        </div>
      </div>

      {/* MÓDULOS DE VIDA — colored cards */}
      <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E8ECF0' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-syne font-extrabold text-lg" style={{ color: '#0D1B2A' }}>Centro de control</h2>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>Todo lo que tienes en Colombia, en un solo lugar.</p>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {modules.map(m => (
            <button key={m.key}
              onClick={() => navigate('/app/dashboard')}
              className="text-left p-4 rounded-xl border transition-all hover:-translate-y-1"
              style={{ borderColor: '#F1F4F7', background: `${m.color}0A` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3"
                style={{ background: `${m.color}1A` }}>
                {m.icon}
              </div>
              <div className="font-bold text-sm mb-0.5" style={{ color: '#0D1B2A' }}>{m.label}</div>
              <div className="text-xs" style={{ color: m.color }}>{m.value}</div>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN GRID: Map (compact) + Mission + Activity */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '340px 1fr 320px' }}>

        {/* Compact Colombia map */}
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E8ECF0' }}>
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#F1F4F7' }}>
            <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: '#0D1B2A' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
              Operaciones Colombia
            </span>
          </div>
          <div className="relative" style={{ height: 220, background: '#0D1B2A' }}>
            {pins.map(p => (
              <div key={p.city} className="absolute group cursor-pointer" style={{ top: p.top, left: p.left }}>
                <div className="w-3 h-3 rounded-full border-2 border-white"
                  style={{ background: p.color, boxShadow: `0 0 0 4px ${p.color}33` }} />
                <div className="absolute left-1/2 -translate-x-1/2 top-5 hidden group-hover:block whitespace-nowrap
                  bg-white rounded-lg px-2 py-1 text-[10px] font-semibold shadow-lg z-10" style={{ color: '#0D1B2A' }}>
                  {p.city} · {p.status}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2.5 flex gap-3 text-[10px]" style={{ color: '#9CA3AF' }}>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" />Proceso</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500" />Acción</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500" />Hecho</span>
          </div>
        </div>

        {/* Mission activa */}
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#E8ECF0' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#9CA3AF' }}>Misión activa principal</span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: '#EBF2FF', color: '#2563EB' }}>EN PROCESO</span>
          </div>
          <h3 className="font-syne font-extrabold text-lg mb-1" style={{ color: '#0D1B2A' }}>Compra apartamento · El Poblado</h3>
          <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>María Restrepo · Abogada Senior · en línea ahora</p>
          <div className="flex items-end justify-between mb-2">
            <span className="font-syne font-extrabold text-3xl" style={{ color: '#2563EB' }}>72%</span>
            <span className="text-xs" style={{ color: '#9CA3AF' }}>Paso 4 de 6 · 3 días restantes</span>
          </div>
          <div className="h-2 rounded-full mb-5" style={{ background: '#F1F4F7' }}>
            <div className="h-full rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg,#2563EB,#60A5FA)' }} />
          </div>
          <div className="flex justify-between">
            {['Búsqueda', 'Verificación', 'Documentos', 'Firma', 'Registro', 'Entrega'].map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={i < 3 ? { background: '#16A34A', color: '#fff' } : i === 3 ? { background: '#2563EB', color: '#fff' } : { background: '#F1F4F7', color: '#9CA3AF' }}>
                  {i < 3 ? '✓' : i + 1}
                </div>
                <span className="text-[8px] text-center" style={{ color: '#9CA3AF', maxWidth: 40 }}>{s}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/app/tracker')}
            className="w-full mt-5 py-2.5 rounded-xl text-xs font-bold border"
            style={{ borderColor: '#2563EB', color: '#2563EB' }}>
            Ver caso · TG-2847
          </button>
        </div>

        {/* AI + Alerts */}
        <div className="space-y-3">
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg,#0D1B2A,#0F2D17)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={15} className="text-green-400" />
              <span className="text-white font-bold text-sm">TramiGo AI</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/60">BETA</span>
            </div>
            <p className="text-white/50 text-xs mb-3 leading-relaxed">Tu asistente inteligente que anticipa y resuelve por ti.</p>
            {['Detecta riesgos', 'Anticipa vencimientos', 'Recomienda acciones'].map(t => (
              <div key={t} className="flex items-center gap-2 text-white/70 text-xs py-1">
                <div className="w-1 h-1 rounded-full bg-green-400" /> {t}
              </div>
            ))}
            <button onClick={() => navigate('/app/ai')}
              className="w-full mt-3 py-2.5 rounded-xl text-xs font-bold text-white"
              style={{ background: '#16A34A' }}>
              Hablar con TramiGo AI →
            </button>
          </div>

          <div className="bg-white rounded-2xl border p-4" style={{ borderColor: '#E8ECF0' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold" style={{ color: '#0D1B2A' }}>Alertas activas</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">{alerts.length} nuevas</span>
            </div>
            {alerts.slice(0, 3).map(a => (
              <div key={a.id} className="flex items-center gap-2 py-2 border-b last:border-0" style={{ borderColor: '#F1F4F7' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: a.type === 'urgent' ? '#EF4444' : a.type === 'medium' ? '#F59E0B' : '#16A34A' }} />
                <span className="text-xs flex-1" style={{ color: '#374151' }}>{a.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Trámites en curso */}
      <div className="bg-white rounded-2xl border" style={{ borderColor: '#E8ECF0' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F1F4F7' }}>
          <span className="text-sm font-bold" style={{ color: '#0D1B2A' }}>Trámites en curso</span>
          <button onClick={() => navigate('/app/tracker')} className="text-xs font-semibold" style={{ color: '#2563EB' }}>Ver todos →</button>
        </div>
        {matters.map(m => (
          <div key={m.id} onClick={() => navigate('/app/tracker')}
            className="flex items-center gap-3 px-5 py-3.5 border-b last:border-0 cursor-pointer hover:bg-gray-50"
            style={{ borderColor: '#F1F4F7' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
              style={{ background: `${HUB_COLORS[m.hub]}18`, color: HUB_COLORS[m.hub] }}>
              {m.hub === 'legal' ? '⚖' : m.hub === 'property' ? '🏠' : '💼'}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold" style={{ color: '#0D1B2A' }}>{m.title}</div>
              <div className="text-xs" style={{ color: '#9CA3AF' }}>{m.id} · {m.advisor}</div>
            </div>
            <span className="text-xs font-bold" style={{ color: HUB_COLORS[m.hub] }}>{m.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
