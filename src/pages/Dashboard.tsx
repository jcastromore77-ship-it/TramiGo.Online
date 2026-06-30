// ─────────────────────────────────────────────
// Dashboard — Colombia Control Center
// ─────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import { RefreshCw, FolderOpen, MessageCircle, Bell, Sparkles, Plus, Upload } from 'lucide-react'
import { user, matters, alerts, activityFeed, HUB_COLORS } from '../data/mockData'
import { LifeScoreRing, StatCard, StatusPill, ProgressBar, AlertItem, Card, CardHeader } from '../components/UI'

export default function Dashboard() {
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  const HUB_BARS = [
    { label: 'Familia',     value: user.lifeScore.family,   color: HUB_COLORS.family },
    { label: 'Propiedades', value: user.lifeScore.property, color: HUB_COLORS.property },
    { label: 'Legal',       value: user.lifeScore.legal,    color: HUB_COLORS.legal },
    { label: 'Salud',       value: user.lifeScore.health,   color: HUB_COLORS.health },
  ]

  return (
    <div className="space-y-5 animate-slide-in">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne font-extrabold text-[#0D1B2A] text-2xl tracking-tight">
            {greeting}, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-0.5">Tienes 2 trámites que requieren tu atención hoy.</p>
        </div>
        <div className="text-right text-xs text-[#9CA3AF]">
          {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* LIFE SCORE HERO */}
      <div className="rounded-2xl p-6 grid gap-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg,#070B1A 0%,#0D2868 60%,#1A3A7A 100%)',
          gridTemplateColumns: 'auto 1fr auto',
        }}>
        {/* Orbs */}
        <div className="absolute right-0 top-0 w-48 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 65%)' }} />
        <div className="absolute left-48 bottom-0 w-32 h-32 pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 65%)' }} />

        <LifeScoreRing score={user.lifeScore.overall} size={110} />

        <div className="relative z-10">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            Índice de Tranquilidad
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
              Live
            </span>
          </div>
          <h2 className="font-syne font-extrabold text-white text-xl mb-0.5">Todo Bajo Control</h2>
          <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            3 asuntos requieren atención · Actualizado hace 2 min
          </p>
          <div className="space-y-2">
            {HUB_BARS.map(b => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="text-xs w-20" style={{ color: 'rgba(255,255,255,0.4)' }}>{b.label}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${b.value}%`, background: b.color }} />
                </div>
                <span className="text-xs font-bold w-8 text-right" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {b.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 relative z-10">
          <button onClick={() => navigate('/app/ai')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white text-center whitespace-nowrap"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            ◉ TramiGo AI
          </button>
          <button onClick={() => navigate('/app/tracker')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white text-center whitespace-nowrap"
            style={{ background: '#1A56DB' }}>
            Ver trámites
          </button>
          <button className="px-4 py-2.5 rounded-xl text-xs font-semibold text-center whitespace-nowrap"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
            Ver reporte
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-2 flex-wrap">
        {[
          { icon: <Plus size={13} />, label: 'Nuevo trámite', to: '/app/tracker' },
          { icon: <Upload size={13} />, label: 'Subir documento', to: '/app/documents' },
          { icon: <MessageCircle size={13} />, label: 'Hablar con asesor', to: '/app/ai' },
          { icon: <Bell size={13} />, label: 'Ver alertas', to: '/app/tracker' },
          { icon: <Sparkles size={13} />, label: 'Preguntar a AI', to: '/app/ai' },
        ].map(a => (
          <button key={a.label} onClick={() => navigate(a.to)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8ECF0] rounded-xl
            text-xs font-semibold text-[#374151] hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all">
            {a.icon} {a.label}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard value="7" label="Trámites activos" color="#1A56DB"
          icon={<RefreshCw size={16} />} badge="+2" />
        <StatCard value="3" label="Acciones urgentes" color="#D97706"
          icon={<Bell size={16} />} badge="Urgente" />
        <StatCard value="24" label="Completados 2024" color="#059669"
          icon={<span className="text-sm font-bold">✓</span>} badge="+3 mes" />
        <StatCard value="47" label="Docs en bóveda" color="#7C3AED"
          icon={<FolderOpen size={16} />} badge="3 vencen" />
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 300px' }}>
        <div className="space-y-4">
          {/* Active matters */}
          <Card>
            <CardHeader title="Trámites en curso" action="Ver todos →" actionHref="/app/tracker" />
            <div>
              {matters.slice(0, 4).map(m => (
                <div key={m.id}
                  onClick={() => navigate('/app/tracker')}
                  className="flex items-center gap-3 px-5 py-3.5 border-b border-[#F1F4F7]
                  last:border-0 cursor-pointer hover:bg-[#FAFBFC] transition-colors">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: `${HUB_COLORS[m.hub]}18`, color: HUB_COLORS[m.hub] }}>
                    {m.hub === 'legal' ? '⚖' : m.hub === 'property' ? '🏠' : m.hub === 'business' ? '💼' : '📋'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#0D1B2A] truncate">{m.title}</div>
                    <div className="text-xs text-[#9CA3AF] truncate">{m.id} · {m.advisor}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <StatusPill status={m.status} />
                    {m.progress < 100 && (
                      <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF]">
                        <div className="w-10">
                          <ProgressBar value={m.progress} color={HUB_COLORS[m.hub]} height={3} />
                        </div>
                        {m.progress}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity feed */}
          <Card>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F4F7]">
              <span className="text-sm font-bold text-[#0D1B2A]">Actividad en tiempo real</span>
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                Live
              </div>
            </div>
            {activityFeed.map(item => (
              <div key={item.id} className="flex gap-3 px-5 py-3.5 border-b border-[#F1F4F7] last:border-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                  style={{ background: `${item.color}18`, color: item.color }}>
                  {item.color === '#059669' ? '✓' : item.color === '#D97706' ? '⚠' : '↑'}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#374151] leading-relaxed font-medium">{item.text}</div>
                  <div className="text-[10px] text-[#9CA3AF] mt-0.5">{item.time}{item.advisor ? ` · ${item.advisor}` : ''}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-3">
          {/* Advisor */}
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg,#070B1A,#1A3A7A)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#1A56DB,#7C3AED)' }}>
                {user.advisor.initials}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{user.advisor.name}</div>
                <div className="text-xs text-white/40">{user.advisor.role}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
                  <span className="text-[10px] text-green-400 font-semibold">En línea ahora</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { val: user.advisor.cases, label: 'Casos resueltos' },
                { val: user.advisor.rating, label: 'Calificación' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="font-syne font-extrabold text-white text-lg">{s.val}</div>
                  <div className="text-[10px] text-white/30">{s.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/app/ai')}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
              style={{ background: '#1A56DB' }}>
              <MessageCircle size={13} /> Abrir chat
            </button>
          </div>

          {/* AI Alerts */}
          <Card>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F1F4F7]">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#1A56DB,#7C3AED)' }}>
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-xs font-bold text-[#0D1B2A]">TramiGo AI detectó {alerts.length} alertas</span>
            </div>
            {alerts.map(a => (
              <AlertItem key={a.id} type={a.type} message={a.message} action={a.action}
                onAction={() => navigate('/app/ai')} />
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
