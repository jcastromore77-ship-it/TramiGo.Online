// ─────────────────────────────────────────────
// Login page
// ─────────────────────────────────────────────
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff } from 'lucide-react'

export function Login() {
  const [email, setEmail] = useState('andres@email.com')
  const [password, setPassword] = useState('demo123')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Completa todos los campos'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    login({ name: 'Andrés Pereira', email, plan: 'premium' })
    navigate('/app/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg,#F4F6FB,#EBF2FF)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-syne font-extrabold text-white text-xl mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg,#1A56DB,#3B82F6)' }}>T</div>
          <h1 className="font-syne font-extrabold text-2xl text-[#0D1B2A] tracking-tight">Bienvenido de vuelta</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">Ingresa a tu Colombia</p>
        </div>

        <form onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 border border-[#E8ECF0] shadow-sm">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm font-semibold text-red-700 bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-xs font-bold text-[#374151] mb-2">Correo electrónico</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
              style={{ border: '1.5px solid #E8ECF0', fontFamily: 'Inter' }}
              onFocus={e => e.target.style.borderColor = '#1A56DB'}
              onBlur={e => e.target.style.borderColor = '#E8ECF0'}
              placeholder="tu@email.com" />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-[#374151] mb-2">Contraseña</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all pr-10"
                style={{ border: '1.5px solid #E8ECF0', fontFamily: 'Inter' }}
                onFocus={e => e.target.style.borderColor = '#1A56DB'}
                onBlur={e => e.target.style.borderColor = '#E8ECF0'}
                placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151]">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg,#1A56DB,#2563EB)' }}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>

          <div className="mt-4 text-center text-xs text-[#9CA3AF]">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-[#1A56DB] font-semibold">Regístrate gratis</Link>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-[#9CA3AF] hover:text-[#374151]">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Register — 5-step onboarding wizard
// ─────────────────────────────────────────────
const LIFE_OPTIONS = [
  { id: 'family', label: 'Familia en Colombia', icon: '👨‍👩‍👧' },
  { id: 'property', label: 'Propiedades', icon: '🏠' },
  { id: 'legal', label: 'Trámites pendientes', icon: '📋' },
  { id: 'wealth', label: 'Inversiones / patrimonio', icon: '💰' },
  { id: 'business', label: 'Negocio', icon: '💼' },
  { id: 'celebrations', label: 'Eventos / celebraciones', icon: '🎉' },
  { id: 'health', label: 'Gestión de salud', icon: '🏥' },
  { id: 'urgent', label: 'Algo urgente ahora', icon: '🆘' },
]

const PLANS_REG = ['Essential · $99', 'Premium · $299', 'Black · $999']

export function Register() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [priority, setPriority] = useState('')
  const [plan, setPlan] = useState('Premium · $299')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const toggleOption = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const finish = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    const p = plan.includes('Black') ? 'black' : plan.includes('Premium') ? 'premium' : 'essential'
    login({ name: name || 'Usuario', email, plan: p as 'essential' | 'premium' | 'black' })
    navigate('/app/dashboard')
  }

  const steps = ['Tus datos', 'Tu Colombia', 'Prioridad', 'Tu plan', 'Bienvenida']

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg,#F4F6FB,#EBF2FF)' }}>
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-syne font-extrabold text-white mx-auto mb-3"
            style={{ background: 'linear-gradient(135deg,#1A56DB,#3B82F6)' }}>T</div>
          <h1 className="font-syne font-extrabold text-xl text-[#0D1B2A]">Crear cuenta TramiGo</h1>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-1.5 rounded-full transition-all duration-300"
                style={{ background: i <= step ? '#1A56DB' : '#E8ECF0' }} />
              <span className="text-[9px] font-semibold" style={{ color: i === step ? '#1A56DB' : '#C4CDD6' }}>
                {s}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#E8ECF0]">

          {/* STEP 0 */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-syne font-extrabold text-lg text-[#0D1B2A] mb-6">Cuéntanos quién eres</h2>
              {[
                { label: 'Nombre completo', val: name, set: setName, placeholder: 'Andrés Pereira', type: 'text' },
                { label: 'Correo electrónico', val: email, set: setEmail, placeholder: 'andres@email.com', type: 'email' },
                { label: 'Contraseña', val: password, set: setPassword, placeholder: '8+ caracteres', type: 'password' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">{f.label}</label>
                  <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ border: '1.5px solid #E8ECF0', fontFamily: 'Inter' }}
                    onFocus={e => e.target.style.borderColor = '#1A56DB'}
                    onBlur={e => e.target.style.borderColor = '#E8ECF0'} />
                </div>
              ))}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="font-syne font-extrabold text-lg text-[#0D1B2A] mb-2">¿Qué tienes en Colombia?</h2>
              <p className="text-sm text-[#9CA3AF] mb-6">Selecciona todo lo que aplique</p>
              <div className="grid grid-cols-2 gap-3">
                {LIFE_OPTIONS.map(o => (
                  <button key={o.id} onClick={() => toggleOption(o.id)}
                    className="flex items-center gap-3 p-4 rounded-xl border text-left transition-all"
                    style={{
                      border: selected.includes(o.id) ? '2px solid #1A56DB' : '1.5px solid #E8ECF0',
                      background: selected.includes(o.id) ? '#EBF2FF' : '#fff',
                    }}>
                    <span className="text-2xl">{o.icon}</span>
                    <span className="text-xs font-semibold text-[#0D1B2A] leading-tight">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="font-syne font-extrabold text-lg text-[#0D1B2A] mb-2">¿Qué necesitas resolver primero?</h2>
              <p className="text-sm text-[#9CA3AF] mb-6">Elige uno — empezaremos por ahí</p>
              <div className="grid grid-cols-2 gap-3">
                {LIFE_OPTIONS.filter(o => o.id !== 'urgent').map(o => (
                  <button key={o.id} onClick={() => setPriority(o.id)}
                    className="flex items-center gap-3 p-4 rounded-xl border text-left transition-all"
                    style={{
                      border: priority === o.id ? '2px solid #1A56DB' : '1.5px solid #E8ECF0',
                      background: priority === o.id ? '#EBF2FF' : '#fff',
                    }}>
                    <span className="text-2xl">{o.icon}</span>
                    <span className="text-xs font-semibold text-[#0D1B2A]">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 className="font-syne font-extrabold text-lg text-[#0D1B2A] mb-2">Elige tu plan</h2>
              <p className="text-sm text-[#9CA3AF] mb-6">Puedes cambiar en cualquier momento</p>
              <div className="space-y-3">
                {PLANS_REG.map(p => (
                  <button key={p} onClick={() => setPlan(p)}
                    className="w-full p-5 rounded-xl border text-left transition-all flex items-center justify-between"
                    style={{
                      border: plan === p ? '2px solid #1A56DB' : '1.5px solid #E8ECF0',
                      background: plan === p ? '#EBF2FF' : '#fff',
                    }}>
                    <span className="font-syne font-extrabold text-[#0D1B2A]">{p}</span>
                    {plan === p && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#1A56DB] text-white">
                        Seleccionado
                      </span>
                    )}
                    {p.includes('Premium') && plan !== p && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                        Recomendado
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-syne font-extrabold text-2xl text-[#0D1B2A] mb-2">
                ¡{name || 'Bienvenido'}!
              </h2>
              <p className="text-[#6B7280] text-sm mb-8">Tu equipo ya está trabajando para ti.</p>

              {/* Advisor card */}
              <div className="rounded-2xl p-5 mb-8 text-left"
                style={{ background: '#0D1B2A' }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#1A56DB,#7C3AED)' }}>MV</div>
                  <div>
                    <div className="text-white font-bold text-sm">María Vargas</div>
                    <div className="text-white/40 text-xs">Asesora Senior · Bogotá</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
                      <span className="text-green-400 text-[10px] font-semibold">En línea · Lista para ayudarte</span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={finish} disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#1A56DB,#2563EB)' }}>
                {loading ? 'Configurando tu cuenta...' : 'Ir a mi dashboard →'}
              </button>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)}
                  className="flex-1 py-3 rounded-xl border border-[#E8ECF0] text-sm font-semibold text-[#6B7280] hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all">
                  ← Atrás
                </button>
              )}
              <button
                onClick={() => step === 3 ? setStep(4) : setStep(s => s + 1)}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#1A56DB,#2563EB)' }}>
                {step === 3 ? 'Crear cuenta' : 'Siguiente →'}
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <Link to="/login" className="text-xs text-[#9CA3AF] hover:text-[#374151]">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
