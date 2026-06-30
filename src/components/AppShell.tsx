// ─────────────────────────────────────────────
// AppShell — sidebar + topbar layout wrapper
// ─────────────────────────────────────────────
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, RefreshCw, FolderOpen, Heart, Building,
  Activity, Scale, TrendingUp, Briefcase, Star, Crown,
  Sparkles, LogOut, Bell, Settings,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
  color?: string
  badge?: number
  badgeColor?: string
}

const NAV_SECTIONS: Array<{ title: string; items: NavItem[] }> = [
  {
    title: 'Principal',
    items: [
      { to: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
      { to: '/app/tracker', label: 'Mis Trámites', icon: <RefreshCw size={16} />, badge: 7 },
      { to: '/app/documents', label: 'Documentos', icon: <FolderOpen size={16} />, badge: 3, badgeColor: '#D97706' },
    ],
  },
  {
    title: 'Life OS',
    items: [
      { to: '/app/family',       label: 'Family OS',       icon: <Heart size={16} />,       color: '#E11D48' },
      { to: '/app/property',     label: 'Property OS',     icon: <Building size={16} />,    color: '#D97706' },
      { to: '/app/health',       label: 'Health OS',       icon: <Activity size={16} />,    color: '#0891B2' },
      { to: '/app/legal',        label: 'Legal OS',        icon: <Scale size={16} />,       color: '#7C3AED' },
      { to: '/app/wealth',       label: 'Wealth OS',       icon: <TrendingUp size={16} />,  color: '#047857' },
      { to: '/app/business',     label: 'Business OS',     icon: <Briefcase size={16} />,   color: '#1D4ED8' },
      { to: '/app/celebrations', label: 'Celebrations OS', icon: <Star size={16} />,        color: '#A21CAF' },
    ],
  },
  {
    title: 'Premium',
    items: [
      { to: '/app/black', label: 'TramiGo Black', icon: <Crown size={16} />, color: '#C9A84C' },
      { to: '/app/ai',    label: 'TramiGo AI',    icon: <Sparkles size={16} />, color: '#7C3AED' },
    ],
  },
]

export default function AppShell() {
  const { logout, authUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-60 flex-shrink-0 flex flex-col overflow-y-auto"
        style={{ background: '#070B1A' }}>

        {/* Logo + user */}
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center
              text-sm font-extrabold text-white font-syne"
              style={{ background: 'linear-gradient(135deg,#1A56DB,#3B82F6)' }}>T</div>
            <span className="font-syne font-extrabold text-white text-base tracking-tight">
              Trami<span className="text-blue-400">Go</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center
              text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#1A56DB,#7C3AED)' }}>
              {authUser?.name?.charAt(0) ?? 'A'}
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-none mb-1">
                {authUser?.name ?? 'Usuario'}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(201,168,76,0.15)', color: '#E8C96A' }}>
                ★ {authUser?.plan ?? 'premium'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-green-400 font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
            María Vargas en línea
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          {NAV_SECTIONS.map(sec => (
            <div key={sec.title} className="mb-2">
              <div className="text-[9px] font-bold uppercase tracking-widest px-2 py-2"
                style={{ color: 'rgba(255,255,255,0.2)' }}>
                {sec.title}
              </div>
              {sec.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 text-xs font-medium
                    transition-all duration-150 relative
                    ${isActive
                      ? 'text-white font-semibold'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]'
                    }`
                  }
                  style={({ isActive }) => isActive ? {
                    background: item.color ? `${item.color}22` : 'rgba(26,86,219,0.2)',
                  } : {}}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r"
                          style={{ background: item.color ?? '#1A56DB' }} />
                      )}
                      <span style={{ color: isActive ? (item.color ?? '#60A5FA') : undefined }}>
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="min-w-[18px] h-[18px] rounded-full flex items-center
                          justify-center text-[9px] font-bold px-1 text-white"
                          style={{ background: item.badgeColor ?? '#1A56DB' }}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* AI Widget */}
        <NavLink to="/app/ai"
          className="mx-3 mb-2 p-3 rounded-xl cursor-pointer"
          style={{ background: 'rgba(26,86,219,0.15)', border: '1px solid rgba(26,86,219,0.25)' }}>
          <div className="text-[10px] font-bold text-blue-400 mb-0.5 flex items-center gap-1">
            <Sparkles size={10} /> TramiGo AI
          </div>
          <div className="text-[10px] text-white/30">¿En qué puedo ayudarte?</div>
        </NavLink>

        {/* Logout */}
        <button onClick={handleLogout}
          className="flex items-center gap-2 mx-3 mb-4 px-3 py-2 rounded-lg
          text-xs text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-all">
          <LogOut size={14} /> Cerrar sesión
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-13 bg-white border-b border-[#E8ECF0] flex items-center
          justify-between px-7 flex-shrink-0" style={{ height: 52 }}>
          <span className="text-sm font-bold text-[#0D1B2A]">
            Centro de Control Colombia
          </span>
          <div className="flex items-center gap-2">
            <NavLink to="/app/ai"
              className="w-8 h-8 rounded-lg flex items-center justify-center
              text-[#6B7280] hover:text-[#0D1B2A] transition-colors"
              style={{ background: '#F4F6FB', border: '1px solid #E8ECF0' }}>
              <Sparkles size={15} />
            </NavLink>
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center
              text-[#6B7280]" style={{ background: '#F4F6FB', border: '1px solid #E8ECF0' }}>
              <Bell size={15} />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full
                flex items-center justify-center text-[8px] font-bold text-white bg-[#1A56DB]">4</span>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center
              text-[#6B7280]" style={{ background: '#F4F6FB', border: '1px solid #E8ECF0' }}>
              <Settings size={15} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-7" style={{ background: '#F4F6FB' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
