// ─────────────────────────────────────────────
// Tracker page
// ─────────────────────────────────────────────
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import { matters, HUB_COLORS } from '../data/mockData'
import { StatusPill, ProgressBar, Card, CardHeader } from '../components/UI'

export function Tracker() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(matters[0])
  const [showDetail, setShowDetail] = useState(false)
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([
    { from: 'adv', text: 'La notaría necesita el paz y salvo predial 2024 para continuar.' },
    { from: 'user', text: '¿Puedes gestionarlo directamente tú?' },
    { from: 'adv', text: 'Claro, con tu autorización lo tramito hoy mismo.' },
  ])

  const sendMsg = () => {
    if (!msg.trim()) return
    setMessages(m => [...m, { from: 'user', text: msg }])
    setMsg('')
    setTimeout(() => setMessages(m => [...m, { from: 'adv', text: 'Entendido, lo gestiono ahora mismo.' }]), 1000)
  }

  if (showDetail) return (
    <div className="animate-slide-in">
      <button onClick={() => setShowDetail(false)}
        className="flex items-center gap-1.5 text-xs font-semibold text-[#1A56DB] mb-4 hover:opacity-80">
        <ArrowLeft size={14} /> Volver a mis trámites
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-syne font-extrabold text-[#0D1B2A] text-xl tracking-tight mb-1">{selected.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#9CA3AF] font-semibold">#{selected.id}</span>
            <StatusPill status={selected.status} />
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-[#9CA3AF] mb-1">Asesor asignado</div>
          <div className="flex items-center gap-2 justify-end">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#1A56DB,#7C3AED)' }}>
              {selected.advisor.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <span className="text-sm font-bold text-[#0D1B2A]">{selected.advisor}</span>
          </div>
        </div>
      </div>

      {/* Progress card */}
      <Card className="mb-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-[#0D1B2A]">Avance del proceso</span>
          <span className="font-syne font-extrabold text-3xl text-[#1A56DB]"
            style={{ letterSpacing: '-1.5px' }}>{selected.progress}%</span>
        </div>
        <div className="mb-6">
          <ProgressBar value={selected.progress} color={HUB_COLORS[selected.hub]} height={8} />
        </div>
        <div className="flex items-center gap-0 relative">
          {selected.steps.map((step, i) => (
            <div key={step} className="flex-1 flex flex-col items-center relative z-10">
              {i < selected.steps.length - 1 && (
                <div className="absolute top-3.5 left-1/2 right-0 h-0.5 z-0"
                  style={{ background: i < selected.currentStep ? HUB_COLORS[selected.hub] : '#E8ECF0' }} />
              )}
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 relative z-10"
                style={
                  i < selected.currentStep
                    ? { background: HUB_COLORS[selected.hub], color: '#fff' }
                    : i === selected.currentStep
                    ? { background: '#fff', border: `2px solid ${HUB_COLORS[selected.hub]}`, color: HUB_COLORS[selected.hub] }
                    : { background: '#fff', border: '2px solid #E8ECF0', color: '#9CA3AF' }
                }>
                {i < selected.currentStep ? '✓' : i + 1}
              </div>
              <span className="text-[9px] font-semibold text-center leading-tight"
                style={{ color: i <= selected.currentStep ? HUB_COLORS[selected.hub] : '#9CA3AF' }}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* 3 columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* Timeline */}
        <Card>
          <CardHeader title="Historial" />
          <div className="p-4 space-y-3">
            {[
              { text: 'Certificado catastral aprobado', time: 'Hoy 10:32', done: true },
              { text: 'Escritura enviada a notaría', time: 'Hoy 8:15', done: true },
              { text: 'Radicación confirmada', time: 'Nov 10', done: true },
            ].map((e, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
                  style={{ background: e.done ? HUB_COLORS[selected.hub] : '#E8ECF0' }} />
                <div>
                  <div className="text-xs font-semibold text-[#0D1B2A] leading-snug">{e.text}</div>
                  <div className="text-[10px] text-[#9CA3AF] mt-0.5">{e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader title="Documentos" />
          <div>
            {[
              { name: 'Registro civil testador', status: 'Verificado', ok: true },
              { name: 'Escritura propiedad 2019', status: 'Verificado', ok: true },
              { name: 'Paz y salvo predial 2024', status: 'Pendiente', ok: false },
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 border-b border-[#F1F4F7] last:border-0">
                <span className="text-sm">📄</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#0D1B2A] truncate">{d.name}</div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={d.ok
                    ? { background: '#ECFDF5', color: '#059669' }
                    : { background: '#FFFBEB', color: '#D97706' }}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat */}
        <Card className="flex flex-col" style={{ height: 260 }}>
          <CardHeader title="Chat con asesor" />
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] ${m.from === 'user' ? 'ml-auto' : ''}`}>
                <div className="px-3 py-2 rounded-xl text-xs leading-relaxed"
                  style={m.from === 'user'
                    ? { background: '#1A56DB', color: '#fff', borderBottomRightRadius: 3 }
                    : { background: '#F4F6FB', color: '#374151', borderBottomLeftRadius: 3 }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-[#F1F4F7] flex gap-1.5">
            <input value={msg} onChange={e => setMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              className="flex-1 px-3 py-2 rounded-lg border border-[#E8ECF0] text-xs outline-none bg-[#F4F6FB]"
              placeholder="Escribe un mensaje..." />
            <button onClick={sendMsg}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
              style={{ background: '#1A56DB' }}>
              <Send size={13} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="animate-slide-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-syne font-extrabold text-[#0D1B2A] text-2xl tracking-tight">Mis Trámites</h1>
          <p className="text-sm text-[#9CA3AF] mt-0.5">{matters.length} trámites activos</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: '#1A56DB' }}>
          + Nuevo trámite
        </button>
      </div>
      <div className="space-y-3">
        {matters.map(m => (
          <Card key={m.id}>
            <div className="p-5 flex items-center gap-4 cursor-pointer hover:bg-[#FAFBFC] transition-colors"
              onClick={() => { setSelected(m); setShowDetail(true) }}
              style={{ borderLeft: `4px solid ${HUB_COLORS[m.hub]}` }}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-syne font-bold text-[#0D1B2A]">{m.title}</span>
                  <StatusPill status={m.status} />
                </div>
                <div className="text-xs text-[#9CA3AF] mb-3">#{m.id} · {m.advisor} · {m.entity}</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 max-w-xs">
                    <ProgressBar value={m.progress} color={HUB_COLORS[m.hub]} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: HUB_COLORS[m.hub] }}>{m.progress}%</span>
                  <span className="text-xs text-[#9CA3AF]">Cierre estimado: {m.estimatedClose}</span>
                </div>
              </div>
              <div className="text-[#9CA3AF] text-sm">→</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Family OS
// ─────────────────────────────────────────────
import { family } from '../data/mockData'

export function FamilyOS() {
  return (
    <div className="animate-slide-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: '#FFF1F2' }}>❤️</div>
          <div>
            <h1 className="font-syne font-extrabold text-[#0D1B2A] text-xl tracking-tight">Family OS</h1>
            <p className="text-xs text-[#9CA3AF]">Tu familia en Colombia monitoreada y cuidada</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: '#E11D48' }}>+ Agregar miembro</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {family.map(m => (
          <Card key={m.id} className="cursor-pointer hover:-translate-y-1 transition-all duration-200">
            <div className="h-1" style={{ background: `linear-gradient(90deg,${m.color},${m.color}80)` }} />
            <div className="p-5 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-3"
                style={{ background: `linear-gradient(135deg,${m.color},${m.color}90)` }}>{m.initials}</div>
              <div className="font-syne font-bold text-[#0D1B2A] mb-0.5">{m.name}</div>
              <div className="text-xs text-[#9CA3AF] mb-3">{m.relation} · {m.age} años · {m.city}</div>
              <div className="flex gap-2 justify-center flex-wrap mb-3">
                {m.birthdayDays && (
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ background: '#FDF4FF', color: '#A21CAF' }}>
                    🎂 {m.birthdayDays} días
                  </span>
                )}
                {m.tasks > 0 && (
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ background: '#FFFBEB', color: '#D97706' }}>
                    {m.tasks} tarea{m.tasks > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#9CA3AF]">Bienestar</span>
                <div className="flex-1">
                  <ProgressBar value={m.healthScore} color={m.color} height={3} />
                </div>
                <span className="text-[10px] font-bold text-[#0D1B2A]">{m.healthScore}%</span>
              </div>
            </div>
            <div className="px-5 pb-4 text-xs text-[#9CA3AF] border-t border-[#F1F4F7] pt-3">
              📅 {m.nextAppointment}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Próximas citas médicas" action="Agendar +" actionHref="/app/health" />
          <div className="p-4 space-y-3">
            {[
              { name: 'Cardiología — Patricia', clinic: 'Clínica Shaio', date: 'Dic 12', status: 'Confirmada', color: '#1A56DB' },
              { name: 'Control general — Roberto', clinic: 'Imbanaco', date: 'Dic 18', status: 'Pendiente', color: '#D97706' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-[#F1F4F7] last:border-0">
                <div className="w-9 h-9 rounded-xl flex flex-col items-center justify-center text-center flex-shrink-0"
                  style={{ background: `${a.color}15`, color: a.color }}>
                  <div className="font-syne font-extrabold text-sm leading-none">{a.date.split(' ')[1]}</div>
                  <div className="text-[8px] uppercase">{a.date.split(' ')[0]}</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#0D1B2A]">{a.name}</div>
                  <div className="text-[10px] text-[#9CA3AF]">{a.clinic}</div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={a.status === 'Confirmada' ? { background: '#ECFDF5', color: '#059669' } : { background: '#FFFBEB', color: '#D97706' }}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Recordatorios activos" />
          <div className="p-4 space-y-3">
            {[
              { icon: '🎂', text: 'Cumpleaños de Sara', sub: 'En 12 días — Medellín', color: '#A21CAF' },
              { icon: '💊', text: 'Medicación Roberto', sub: 'Renovar fórmula en 7 días', color: '#1A56DB' },
              { icon: '🏠', text: 'Visita asesora', sub: 'María visita a Patricia mañana', color: '#059669' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-[#F1F4F7] last:border-0">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${r.color}15` }}>{r.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-[#0D1B2A]">{r.text}</div>
                  <div className="text-[10px] text-[#9CA3AF]">{r.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Property OS
// ─────────────────────────────────────────────
import { properties } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function PropertyOS() {
  const monthlyData = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'].map(m => ({
    month: m, ingresos: Math.floor(7000000 + Math.random() * 1000000),
    gastos: Math.floor(800000 + Math.random() * 400000),
  }))

  return (
    <div className="animate-slide-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: '#FFFBEB' }}>🏠</div>
          <div>
            <h1 className="font-syne font-extrabold text-[#0D1B2A] text-xl tracking-tight">Property OS</h1>
            <p className="text-xs text-[#9CA3AF]">Gestión completa de tu patrimonio inmobiliario</p>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: '#D97706' }}>+ Agregar propiedad</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { val: '2', label: 'Propiedades', color: '#D97706' },
          { val: '$7.3M', label: 'Ingreso mensual COP', color: '#059669' },
          { val: '1', label: 'Alerta activa', color: '#EF4444' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E8ECF0] rounded-2xl p-4"
            style={{ borderTopColor: s.color, borderTopWidth: 3 }}>
            <div className="font-syne font-extrabold text-[#0D1B2A] text-3xl mb-1">{s.val}</div>
            <div className="text-xs text-[#9CA3AF]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Property cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {properties.map(p => (
          <Card key={p.id}>
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: '#FFFBEB' }}>🏠</div>
                <div className="flex-1">
                  <div className="font-syne font-bold text-[#0D1B2A] mb-0.5">{p.name}</div>
                  <div className="text-xs text-[#9CA3AF]">{p.address}</div>
                  {p.hasAlert && (
                    <div className="mt-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full inline-block">
                      ⚠ {p.alertMessage}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Arriendo / mes', val: `$${(p.monthlyRent / 1000000).toFixed(1)}M COP`, green: true },
                  { label: 'Valor comercial', val: `$${(p.commercialValue / 1000000000).toFixed(2)}B COP` },
                  { label: 'Inquilino', val: p.tenant },
                  { label: 'Pago', val: p.paymentStatus === 'current' ? 'Al día ✓' : 'Mora', ok: p.paymentStatus === 'current' },
                ].map(f => (
                  <div key={f.label} className="rounded-xl p-2.5 border border-[#F1F4F7]"
                    style={{ background: '#F4F6FB' }}>
                    <div className="text-[9px] text-[#9CA3AF] uppercase font-bold mb-0.5">{f.label}</div>
                    <div className="text-xs font-bold"
                      style={{ color: f.green ? '#059669' : f.ok ? '#059669' : '#0D1B2A' }}>
                      {f.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader title="Ingresos vs Gastos 2024" />
        <div className="p-4" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={4}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={v => `$${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v) => [`$${(Number(v)/1000000).toFixed(2)}M COP`]} />
              <Bar dataKey="ingresos" fill="#D97706" radius={[4,4,0,0]} />
              <Bar dataKey="gastos" fill="#E8ECF0" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────
// Documents vault
// ─────────────────────────────────────────────
export function Documents() {
  const [activeFolder, setActiveFolder] = useState('Todos')
  const [view, setView] = useState<'list'|'grid'>('list')

  const folders = [
    { name: 'Todos', count: 47 }, { name: 'Identidad', count: 6 },
    { name: 'Propiedades', count: 14 }, { name: 'Legal', count: 11 },
    { name: 'Médicos', count: 8 }, { name: 'Empresarial', count: 5 },
    { name: 'Financiero', count: 3 },
  ]

  const docs = [
    { name: 'Escritura pública #4821.pdf', type: 'Propiedad', size: '2.1 MB', date: 'Nov 8', status: 'verified', icon: '📄' },
    { name: 'Registro civil nacimiento.pdf', type: 'Identidad', size: '340 KB', date: 'Oct 20', status: 'verified', icon: '📄' },
    { name: 'Paz y salvo predial 2023.pdf', type: 'Tributario', size: '180 KB', date: 'Ene 15', status: 'expiring', icon: '📄', expiry: 'Vence en 8 días' },
    { name: 'Cédula ciudadanía — Frente.jpg', type: 'Identidad', size: '680 KB', date: 'Sep 3', status: 'verified', icon: '🖼' },
    { name: 'Contrato arrendamiento.docx', type: 'Legal', size: '420 KB', date: 'Ago 1', status: 'verified', icon: '📝' },
  ]

  return (
    <div className="animate-slide-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-syne font-extrabold text-[#0D1B2A] text-2xl tracking-tight">Bóveda Documental</h1>
          <p className="text-sm text-[#9CA3AF] mt-0.5">47 documentos · 2.3 GB de 5 GB usados</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: '#1A56DB' }}>↑ Subir documento</button>
      </div>

      {/* Expiry alert */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 border"
        style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}>
        <span className="text-base">⚠</span>
        <span className="text-sm font-semibold text-amber-800">3 documentos vencen en los próximos 30 días</span>
        <button className="ml-auto text-xs font-bold text-amber-700">Ver todos</button>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '200px 1fr' }}>
        {/* Folders */}
        <div className="bg-white border border-[#E8ECF0] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#F1F4F7] text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">
            Carpetas
          </div>
          {folders.map(f => (
            <button key={f.name} onClick={() => setActiveFolder(f.name)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                color: activeFolder === f.name ? '#1A56DB' : '#374151',
                background: activeFolder === f.name ? '#EBF2FF' : 'transparent',
              }}>
              <span>{f.name}</span>
              <span className="text-xs text-[#9CA3AF]">{f.count}</span>
            </button>
          ))}
          {/* Storage */}
          <div className="px-4 py-3 border-t border-[#F1F4F7]">
            <div className="text-[9px] text-[#9CA3AF] uppercase tracking-widest mb-2">Almacenamiento</div>
            <div className="h-1.5 bg-[#E8ECF0] rounded-full overflow-hidden">
              <div className="h-full bg-[#1A56DB] rounded-full" style={{ width: '46%' }} />
            </div>
            <div className="text-[10px] text-[#9CA3AF] mt-1">2.3 / 5 GB</div>
          </div>
        </div>

        {/* Docs list */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 flex items-center gap-2 bg-white border border-[#E8ECF0] rounded-xl px-3 py-2.5">
              <span className="text-[#9CA3AF] text-sm">🔍</span>
              <span className="text-sm text-[#9CA3AF]">Buscar documentos...</span>
            </div>
            <div className="flex bg-white border border-[#E8ECF0] rounded-xl overflow-hidden">
              {(['list','grid'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className="px-3 py-2 text-xs font-semibold transition-colors"
                  style={{ background: view === v ? '#1A56DB' : 'transparent', color: view === v ? '#fff' : '#6B7280' }}>
                  {v === 'list' ? '≡' : '⊞'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E8ECF0] rounded-2xl overflow-hidden">
            <div className="grid px-5 py-3 border-b border-[#F1F4F7] text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide"
              style={{ gridTemplateColumns: '2fr 1fr 80px 80px 100px' }}>
              <span>Nombre</span><span>Tipo</span><span>Tamaño</span><span>Fecha</span><span>Estado</span>
            </div>
            {docs.map((d, i) => (
              <div key={i}
                className="grid px-5 py-3.5 border-b border-[#F1F4F7] last:border-0 items-center hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                style={{ gridTemplateColumns: '2fr 1fr 80px 80px 100px' }}>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0D1B2A]">
                  <span>{d.icon}</span>
                  <span className="truncate">{d.name}</span>
                </div>
                <span className="text-xs text-[#9CA3AF]">{d.type}</span>
                <span className="text-xs text-[#9CA3AF]">{d.size}</span>
                <span className="text-xs text-[#9CA3AF]">{d.date}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={d.status === 'verified'
                      ? { background: '#ECFDF5', color: '#059669' }
                      : { background: '#FFFBEB', color: '#D97706' }}>
                    {d.status === 'verified' ? 'Verificado' : 'Por vencer'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// TramiGo Black
// ─────────────────────────────────────────────
export function BlackTier() {
  const navigate = useNavigate()

  return (
    <div className="animate-slide-in -m-7 min-h-screen" style={{ background: '#07090E' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-syne font-extrabold text-[#07090E] text-sm"
            style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A)' }}>T</div>
          <span className="font-syne font-extrabold text-white text-base">
            TramiGo <span style={{ color: '#E8C96A' }}>Black</span>
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#C9A84C' }} />
          <span className="text-xs text-white/50">Jorge Bermúdez</span>
          <span className="text-xs font-bold" style={{ color: '#E8C96A' }}>disponible</span>
        </div>
      </div>

      <div className="px-8 py-10">
        {/* Hero */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-3"
            style={{ color: '#C9A84C' }}>
            Membresía Exclusiva
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,rgba(201,168,76,0.4),transparent)' }} />
          </div>
          <h1 className="font-syne font-extrabold text-white mb-3" style={{ fontSize: 42, letterSpacing: '-2px' }}>
            Para quienes no <span style={{ color: '#E8C96A' }}>aceptan</span> esperar.
          </h1>
          <p className="text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
            Un ecosistema privado donde un equipo ejecutivo se ocupa de absolutamente todo. Sin filas. Sin demoras. Sin compromisos.
          </p>
        </div>

        {/* Advisor */}
        <div className="rounded-2xl p-7 mb-8 flex items-center justify-between relative overflow-hidden"
          style={{ background: '#0F1017', border: '1px solid rgba(201,168,76,0.12)' }}>
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-40 h-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse,rgba(201,168,76,0.06) 0%,transparent 70%)' }} />
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-extrabold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A)', color: '#07090E' }}>JB</div>
            <div>
              <div className="font-syne font-extrabold text-white text-lg mb-0.5">Jorge Bermúdez</div>
              <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#C9A84C' }}>
                Asesor Ejecutivo Black
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#C9A84C' }} />
                En línea · Respuesta inmediata garantizada
              </div>
            </div>
          </div>
          <div className="flex gap-3 relative z-10">
            <button onClick={() => navigate('/app/ai')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ border: '1.5px solid rgba(201,168,76,0.3)', color: '#C9A84C', background: 'transparent' }}>
              💬 Mensaje privado
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A)', color: '#07090E' }}>
              📞 Llamada privada
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '👤', name: 'Asesor Ejecutivo 24/7', desc: 'Un profesional senior dedicado exclusivamente a ti. Respuesta en 30 minutos.' },
            { icon: '🚗', name: 'Transporte Blindado', desc: 'Vehículo ejecutivo y escolta certificada para tus familiares en Colombia.' },
            { icon: '🏥', name: 'Concierge Médico', desc: 'Acceso VIP a las mejores clínicas. Sin esperas. Prioridad total.' },
            { icon: '📈', name: 'Gestión Patrimonial', desc: 'Coordinación completa de inversiones, propiedades y activos empresariales.' },
            { icon: '🛡', name: 'Seguridad Privada', desc: 'Escolta certificada y análisis de riesgo para tu familia en Colombia.' },
            { icon: '⭐', name: 'Lifestyle & Eventos VIP', desc: 'Reservas exclusivas, eventos privados y experiencias únicas en Colombia.' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-6 cursor-pointer transition-all hover:border-opacity-30 group"
              style={{ background: '#0F1017', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="text-2xl mb-3" style={{ color: '#C9A84C' }}>{s.icon}</div>
              <div className="font-bold text-white text-sm mb-2">{s.name}</div>
              <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// TramiGo AI
// ─────────────────────────────────────────────
export function AIPage() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: '¡Hola Andrés! 👋 Soy TramiGo AI. Conozco tus 7 trámites activos, 2 propiedades en Bogotá y tu familia. ¿En qué puedo ayudarte hoy?' },
    { from: 'ai', text: '⚡ Detecté algo urgente: el impuesto predial de Casa Usaquén vence en 8 días. ¿Quieres que coordine el pago ahora?' },
  ])
  const [input, setInput] = useState('')

  const RESPONSES: Record<string, string> = {
    'sucesión': 'Tu sucesión TG-2024-0847 va al 68%. El paso actual es la fijación del edicto en Notaría 15. El Dr. Rondón necesita el paz y salvo predial 2024 para continuar. Estimado de cierre: 20 de diciembre.',
    'familia': 'Tu familia está bien. Patricia tiene cita de cardiología el 12 de diciembre en Clínica Shaio. ¡Recuerda que el cumpleaños de Sara es en 12 días!',
    'predial': 'El predial de Casa Usaquén vence en 8 días. El valor estimado es $1,240,000 COP. ¿Quieres que inicie el proceso de pago ante el Distrito de Bogotá? Solo necesito tu autorización.',
    'resumen': '📊 Tu resumen TramiGo:\n\n• 7 trámites activos, 2 requieren acción urgente\n• Predial Usaquén vence en 8 días\n• Cumpleaños Sara en 12 días\n• Sucesión al 68% — casi lista\n• 3 documentos pendientes de renovación',
  }

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages(m => [...m, { from: 'user', text }])
    setInput('')
    const key = Object.keys(RESPONSES).find(k => text.toLowerCase().includes(k))
    setTimeout(() => {
      setMessages(m => [...m, { from: 'ai', text: RESPONSES[key ?? ''] ?? 'Entendido, Andrés. Estoy coordinando con tu equipo en Colombia ahora mismo. Te actualizo en breve.' }])
    }, 900)
  }

  return (
    <div className="animate-slide-in -m-7 h-screen flex" style={{ background: '#fff' }}>
      {/* Left — chat */}
      <div className="flex flex-col" style={{ width: '42%', background: '#070B1A' }}>
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#1A56DB,#7C3AED)' }}>
              <span className="text-white text-sm">✦</span>
            </div>
            <span className="text-white font-bold text-sm">TramiGo AI</span>
          </div>
          <div className="text-[10px] ml-11" style={{ color: 'rgba(255,255,255,0.3)' }}>
            En línea · Conoce todo sobre tu Colombia
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[88%] ${m.from === 'user' ? 'ml-auto' : ''}`}>
              <div className="px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line"
                style={m.from === 'user'
                  ? { background: 'linear-gradient(135deg,#1A56DB,#2563EB)', color: '#fff', borderBottomRightRadius: 4 }
                  : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', borderBottomLeftRadius: 4 }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 flex flex-wrap gap-1.5 border-t border-white/[0.06]">
          {['Estado sucesión','Docs por vencer','Pagar predial','Resumen semanal'].map(c => (
            <button key={c} onClick={() => send(c)}
              className="px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all hover:bg-blue-600"
              style={{ background: 'rgba(26,86,219,0.15)', border: '1px solid rgba(26,86,219,0.25)', color: '#60A5FA' }}>
              {c}
            </button>
          ))}
        </div>

        <div className="p-3 flex gap-2 border-t border-white/[0.06]">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'Inter' }}
            placeholder="Pregunta algo a TramiGo AI..." />
          <button onClick={() => send(input)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
            style={{ background: '#1A56DB' }}>
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Right — context */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6" style={{ background: '#F4F6FB' }}>
        <div className="mb-1">
          <h2 className="font-syne font-extrabold text-[#0D1B2A] text-base">Contexto y acciones sugeridas</h2>
          <p className="text-xs text-[#9CA3AF]">Basado en tu perfil y conversación</p>
        </div>

        <div className="mt-4 rounded-2xl p-4 mb-4"
          style={{ background: 'linear-gradient(135deg,#EBF2FF,#F0F4FF)', border: '1.5px solid #C7D7F9' }}>
          <div className="text-xs font-bold text-[#1A56DB] mb-3 flex items-center gap-2">
            <span>⚡</span> TramiGo AI detectó 4 alertas importantes
          </div>
          {[
            { color: '#EF4444', text: 'Predial Usaquén vence en 8 días', action: 'Pagar' },
            { color: '#EF4444', text: 'Poder notarial vence en 60 días', action: 'Renovar' },
            { color: '#D97706', text: 'Cumpleaños Sara en 12 días', action: 'Celebrar' },
            { color: '#059669', text: 'Chapinero valorizó 4.2%', action: 'Ver' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 py-2 border-b border-blue-100 last:border-0">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
              <span className="flex-1 text-xs text-[#374151] font-medium">{a.text}</span>
              <button className="text-[10px] font-bold" style={{ color: '#1A56DB' }}>{a.action} →</button>
            </div>
          ))}
        </div>

        <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">Acciones sugeridas</div>
        <div className="space-y-2">
          {[
            { icon: '⚖️', text: 'Ver detalle de mi sucesión', to: '/app/tracker' },
            { icon: '📄', text: 'Subir paz y salvo predial', to: '/app/documents' },
            { icon: '🎂', text: 'Organizar cumpleaños de Sara', to: '/app/celebrations' },
            { icon: '💰', text: 'Gestionar pago predial Usaquén', to: '/app/tracker' },
          ].map((s, i) => (
            <button key={i}
              className="w-full bg-white border border-[#E8ECF0] rounded-xl p-3.5 flex items-center gap-3
              hover:border-[#1A56DB] hover:bg-[#EBF2FF] transition-all text-left">
              <span className="text-base">{s.icon}</span>
              <span className="text-xs font-semibold text-[#0D1B2A]">{s.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Stub pages for remaining hubs
// ─────────────────────────────────────────────
function HubStub({ name, icon, color, desc }: { name:string; icon:string; color:string; desc:string }) {
  return (
    <div className="animate-slide-in flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h1 className="font-syne font-extrabold text-[#0D1B2A] text-2xl mb-2" style={{ letterSpacing: '-1px' }}>{name}</h1>
      <p className="text-[#9CA3AF] text-sm mb-8 max-w-xs">{desc}</p>
      <div className="px-6 py-3 rounded-xl text-sm font-bold text-white"
        style={{ background: color }}>
        Próximamente disponible
      </div>
    </div>
  )
}

export const HealthOS   = () => <HubStub name="Health OS" icon="🏥" color="#0891B2" desc="Concierge médico, citas premium y coordinación de tratamientos para tu familia." />
export const LegalOS    = () => <HubStub name="Legal OS" icon="⚖️" color="#7C3AED" desc="Sucesiones, poderes notariales y representación legal activa en Colombia." />
export const WealthOS   = () => <HubStub name="Wealth OS" icon="📈" color="#047857" desc="Gestión de patrimonio, inversiones y activos financieros colombianos." />
export const BusinessOS = () => <HubStub name="Business OS" icon="💼" color="#1D4ED8" desc="Constitución de empresas, contabilidad y representación comercial." />
export const CelebrationsOS = () => <HubStub name="Celebrations OS" icon="🎉" color="#A21CAF" desc="Bodas, quinceañeros y eventos especiales organizados desde cualquier parte del mundo." />
