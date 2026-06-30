// ─────────────────────────────────────────────
// AppShell v3 — sidebar navy premium + logo exacto
// ─────────────────────────────────────────────
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, RefreshCw, FolderOpen, Heart, Building,
  Users, Activity, Scale, TrendingUp, Briefcase,
  PartyPopper, Sparkles, LogOut, Bell, Settings, Crown,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Logo from './Logo'

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
  { to: '/app/documents', label: 'Bóveda',    icon: <FolderOpen size={17} />, badge: 3, badgeColor: '#F59E0B' },
]

const NAV_OS: NavItem[] = [
  { to: '/app/family',       label: 'Family OS',       icon: <Users size={17} /> },
  { to: '/app/property',     label: 'Property OS',     icon: <Building size={17} /> },
  { to: '/app/health',       label: 'Health OS',       icon: <Heart size={17} /> },
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
    <div className="flex h-screen overflow-hidden" style={{ background: '#F7F8FB' }}>
      <aside className="w-64 flex-shrink-0 flex flex-col overflow-y-auto"
        style={{ background: 'linear-gradient(180deg,#060A18,#0A1228)' }}>

        <div className="px-5 py-5 border-b border-white/[0.06]">
          <Logo size={22} variant="dark" showTagline={false} />
        </div>

        <div className="px-5 py-4 flex items-center gap-2.5 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: '#2563EB' }}>
            {authUser?.name?.split(' ').map(w => w[0]).join('').slice(0, 2) ?? 'JD'}
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">{authUser?.name ?? 'Usuario'}</div>
            <div className="text-[11px] text-white/40 capitalize">Cuenta {authUser?.plan ?? 'premium'}</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-3">
          <div className="text-[10px] font-bold uppercase tracking-widest px-3 py-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Plataforma
          </div>
          {NAV_PLATAFORMA.map((item) => (
            <NavLink key={item.label} to={item.to} end={item.to === '/app/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all
                ${isActive ? 'text-white' : 'text-white/55 hover:text-white/85 hover:bg-white/[0.06]'}`}
              style={({ isActive }) => isActive ? { background: '#2563EB' } : {}}>
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1"
                  style={{ background: item.badgeColor ?? '#EF4444' }}>{item.badge}</span>
              )}
            </NavLink>
          ))}

          <div className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 mt-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Life OS
          </div>
          {NAV_OS.map((item) => (
            <NavLink key={item.label} to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all
                ${isActive ? 'text-white' : 'text-white/55 hover:text-white/85 hover:bg-white/[0.06]'}`}
              style={({ isActive }) => isActive ? { background: '#2563EB' } : {}}>
              {item.icon}
              <span className="flex-1">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <NavLink to="/app/ai" className="mx-3 mb-2 p-3 rounded-xl flex items-center gap-2"
          style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(37,99,235,0.3)' }}>
          <Sparkles size={15} className="text-blue-300" />
          <span className="text-xs font-bold text-white">TramiGo AI</span>
        </NavLink>

        <NavLink to="/app/black" className="mx-3 mb-3 p-3 rounded-xl block"
          style={{ background: 'linear-gradient(135deg,#C9A84C20,#E8C96A10)', border: '1px solid rgba(201,168,76,0.3)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Crown size={13} style={{ color: '#E8C96A' }} />
            <span className="text-xs font-bold" style={{ color: '#E8C96A' }}>TramiGo Black</span>
          </div>
          <p className="text-[10px] text-white/40">Asesor ejecutivo dedicado 24/7</p>
        </NavLink>

        <button onClick={handleLogout}
          className="flex items-center gap-2 mx-3 mb-4 px-3 py-2 rounded-lg text-xs text-white/35 hover:text-white/70 transition-all">
          <LogOut size={13} /> Cerrar sesión
        </button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b flex items-center justify-between px-7 flex-shrink-0"
          style={{ borderColor: '#E5E8EE' }}>
          <span className="text-sm font-bold" style={{ color: '#0A0E1A' }}>Centro de Control Colombia</span>
          <div className="flex items-center gap-2">
            <NavLink to="/app/ai" className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#F7F8FB', border: '1px solid #E5E8EE', color: '#6B7280' }}>
              <Sparkles size={16} />
            </NavLink>
            <div className="relative w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#F7F8FB', border: '1px solid #E5E8EE', color: '#6B7280' }}>
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">3</span>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#F7F8FB', border: '1px solid #E5E8EE', color: '#6B7280' }}>
              <Settings size={16} />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-7" style={{ background: '#F7F8FB' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
