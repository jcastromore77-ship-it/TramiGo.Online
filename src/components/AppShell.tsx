// ─────────────────────────────────────────────
// AppShell v2 — sidebar azul/navy con todos los
// módulos de las referencias (Legal OS, Wealth OS,
// Business OS, Celebrations OS, Viajes, Black, AI)
// ─────────────────────────────────────────────
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, RefreshCw, FolderOpen, Heart, Building,
  Users, Plane, Activity, Scale, TrendingUp, Briefcase,
  PartyPopper, Sparkles, LogOut, Bell, Settings, Crown,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
  badge?: number
  badgeColor?: string
}

const NAV_PLATAFORMA: NavItem[] = [
  { to: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
  { to: '/app/tracker',   label: 'Trámites',  icon: <RefreshCw size={17} />, badge: 7 },
  { to: '/app/tracker',   label: 'Tracker',   icon: <Activity size={17} /> },
  { to: '/app/documents', label: 'Bóveda',    icon: <FolderOpen size={17} />, badge: 3, badgeColor: '#F59E0B' },
  { to: '/app/family',    label: 'Family OS', icon: <Users size={17} /> },
  { to: '/app/property',  label: 'Viajes',    icon: <Plane size={17} /> },
  { to: '/app/property',  label: 'Property OS', icon: <Building size={17} /> },
  { to: '/app/health',    label: 'Salud',     icon: <Heart size={17} /> },
]

const NAV_OS: NavItem[] = [
  { to: '/app/health',       label: 'Adultos Mayores', icon: <Heart size={17} /> },
  { to: '/app/business',     label: 'Banca',           icon: <Briefcase size={17} /> },
  { to: '/app/legal',        label: 'Legal OS',        icon: <Scale size={17} /> },
  { to: '/app/wealth',       label: 'Wealth OS',       icon: <TrendingUp size={17} /> },
  { to: '/app/business',     label: 'Business OS',     icon: <Briefcase size={17} /> },
  { to: '/app/celebrations', label: 'Celebrations OS', icon: <PartyPopper size={17} /> },
]

export default function AppShell() {
  const { logout, authUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F4F6FB' }}>
      {/* SIDEBAR — azul/navy degradado */}
      <aside className="w-64 flex-shrink-0 flex flex-col overflow-y-auto"
        style={{ background: 'linear-gradient(180deg,#0B1530,#0D1B3A)' }}>

        {/* Logo */}
        <div className="px-4 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-syne font-extrabold text-white"
              style={{ background: '#2563EB' }}>T</div>
            <span className="font-syne font-extrabold text-white text-lg tracking-tight">TramiGo</span>
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-3 flex items-center gap-2.5 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: '#2563EB' }}>
            {authUser?.name?.split(' ').map(w => w[0]).join('').slice(0, 2) ?? 'JD'}
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">{authUser?.name ?? 'Usuario'}</div>
            <div className="text-[11px] text-white/40">Cuenta {authUser?.plan ?? 'premium'}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3">
          <div className="text-[10px] font-bold uppercase tracking-widest px-2 py-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Plataforma
          </div>
          {NAV_PLATAFORMA.map((item, i) => (
            <NavLink key={item.label + i} to={item.to} end={item.to === '/app/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all
                ${isActive ? 'text-white' : 'text-white/55 hover:text-white/85 hover:bg-white/[0.06]'}`
              }
              style={({ isActive }) => isActive ? { background: '#2563EB' } : {}}>
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1"
                  style={{ background: item.badgeColor ?? '#EF4444' }}>{item.badge}</span>
              )}
            </NavLink>
          ))}

          <div className="text-[10px] font-bold uppercase tracking-widest px-2 py-2 mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Más módulos
          </div>
          {NAV_OS.map((item, i) => (
            <NavLink key={item.label + i} to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all
                ${isActive ? 'text-white' : 'text-white/55 hover:text-white/85 hover:bg-white/[0.06]'}`
              }
              style={({ isActive }) => isActive ? { background: '#2563EB' } : {}}>
              {item.icon}
              <span className="flex-1">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* TramiGo AI widget */}
        <NavLink to="/app/ai" className="mx-3 mb-2 p-3 rounded-xl flex items-center gap-2"
          style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(37,99,235,0.3)' }}>
          <Sparkles size={15} className="text-blue-300" />
          <span className="text-xs font-bold text-white">TramiGo AI</span>
        </NavLink>

        {/* Black banner */}
        <NavLink to="/app/black" className="mx-3 mb-3 p-3 rounded-xl block"
          style={{ background: 'linear-gradient(135deg,#C9A84C20,#E8C96A10)', border: '1px solid rgba(201,168,76,0.3)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Crown size={13} style={{ color: '#E8C96A' }} />
            <span className="text-xs font-bold" style={{ color: '#E8C96A' }}>TramiGo Black</span>
          </div>
          <p className="text-[10px] text-white/40">Oficina privada premium con asesor dedicado 24/7</p>
        </NavLink>

        <button onClick={handleLogout}
          className="flex items-center gap-2 mx-3 mb-4 px-3 py-2 rounded-lg text-xs text-white/35 hover:text-white/70 transition-all">
          <LogOut size={13} /> Cerrar sesión
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b flex items-center justify-between px-7 flex-shrink-0"
          style={{ borderColor: '#E8ECF0' }}>
          <span className="text-sm font-bold" style={{ color: '#0D1B2A' }}>Centro de Control Colombia</span>
          <div className="flex items-center gap-2">
            <NavLink to="/app/ai" className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#F4F6FB', border: '1px solid #E8ECF0', color: '#6B7280' }}>
              <Sparkles size={16} />
            </NavLink>
            <div className="relative w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#F4F6FB', border: '1px solid #E8ECF0', color: '#6B7280' }}>
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">3</span>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#F4F6FB', border: '1px solid #E8ECF0', color: '#6B7280' }}>
              <Settings size={16} />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-7" style={{ background: '#F4F6FB' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
