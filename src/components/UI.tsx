// ─────────────────────────────────────────────
// TramiGo · Shared UI Components
// ─────────────────────────────────────────────
import React from 'react'
import { HUB_COLORS } from '../data/mockData'
import type { MatterStatus } from '../data/mockData'

// ── Status pill ──────────────────────────────
const STATUS_MAP: Record<MatterStatus, { label: string; bg: string; color: string }> = {
  in_progress: { label: 'En progreso', bg: '#EBF2FF', color: '#1A56DB' },
  active:      { label: 'Activo',      bg: '#ECFDF5', color: '#059669' },
  pending:     { label: 'Pendiente',   bg: '#FFFBEB', color: '#D97706' },
  review:      { label: 'En revisión', bg: '#F5F3FF', color: '#7C3AED' },
  completed:   { label: 'Completado',  bg: '#ECFDF5', color: '#059669' },
}

export function StatusPill({ status }: { status: MatterStatus }) {
  const s = STATUS_MAP[status]
  return (
    <span
      className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  )
}

// ── Progress bar ─────────────────────────────
export function ProgressBar({
  value, color = '#1A56DB', height = 4,
}: { value: number; color?: string; height?: number }) {
  return (
    <div className="rounded-full overflow-hidden" style={{ height, background: '#E8ECF0' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  )
}

// ── Hub icon circle ───────────────────────────
export function HubIcon({ hub, size = 40 }: { hub: string; size?: number }) {
  const color = HUB_COLORS[hub] ?? '#1A56DB'
  const icons: Record<string, string> = {
    family: '👨‍👩‍👧', property: '🏠', health: '🏥', legal: '⚖️',
    wealth: '📈', business: '💼', celebrations: '🎉', travel: '✈️', black: '★',
  }
  return (
    <div
      className="rounded-xl flex items-center justify-center text-xl flex-shrink-0"
      style={{ width: size, height: size, background: `${color}18`, color }}
    >
      {icons[hub] ?? '●'}
    </div>
  )
}

// ── Life Score ring ───────────────────────────
export function LifeScoreRing({
  score, size = 100,
}: { score: number; size?: number }) {
  const r = (size / 2) - 8
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 85 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="animate-ring"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-syne font-extrabold text-white leading-none"
          style={{ fontSize: size * 0.26 }}>
          {score}
        </span>
        <span className="text-white/40" style={{ fontSize: size * 0.1 }}>%</span>
      </div>
    </div>
  )
}

// ── Card wrapper ──────────────────────────────
export function Card({
  children, className = '', style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`bg-white border border-[#E8ECF0] rounded-2xl overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

// ── Card header ───────────────────────────────
export function CardHeader({
  title, action, actionHref,
}: { title: string; action?: string; actionHref?: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F4F7]">
      <span className="text-sm font-bold text-[#0D1B2A]">{title}</span>
      {action && actionHref && (
        <a href={actionHref} className="text-xs font-semibold text-[#1A56DB]">{action}</a>
      )}
    </div>
  )
}

// ── Stat card ─────────────────────────────────
export function StatCard({
  value, label, color, icon, badge,
}: { value: string | number; label: string; color: string; icon: React.ReactNode; badge?: string }) {
  return (
    <div className="bg-white border rounded-2xl p-4" style={{ borderColor: '#E8ECF0', borderTopColor: color, borderTopWidth: 3 }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, color }}>
          {icon}
        </div>
        {badge && (
          <span className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: `${color}18`, color }}>
            {badge}
          </span>
        )}
      </div>
      <div className="font-syne font-extrabold text-[#0D1B2A] leading-none mb-1"
        style={{ fontSize: 32, letterSpacing: '-1.5px' }}>
        {value}
      </div>
      <div className="text-xs text-[#9CA3AF] font-medium">{label}</div>
    </div>
  )
}

// ── Alert card item ───────────────────────────
const ALERT_STYLE = {
  urgent: { bg: '#FFF1F2', border: '#EF4444', textColor: '#991B1B', dot: '#EF4444' },
  medium: { bg: '#FFFBEB', border: '#D97706', textColor: '#92400E', dot: '#D97706' },
  info:   { bg: '#ECFDF5', border: '#059669', textColor: '#065F46', dot: '#059669' },
}

export function AlertItem({
  type, message, action, onAction,
}: { type: 'urgent' | 'medium' | 'info'; message: string; action: string; onAction?: () => void }) {
  const s = ALERT_STYLE[type]
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[#F1F4F7] last:border-0"
      style={{ background: s.bg, borderLeftWidth: 3, borderLeftColor: s.border }}>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      <span className="flex-1 text-xs font-semibold leading-snug" style={{ color: s.textColor }}>
        {message}
      </span>
      <button onClick={onAction} className="text-xs font-bold cursor-pointer"
        style={{ color: s.border }}>
        {action} →
      </button>
    </div>
  )
}

// ── Toast ─────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

const TOAST_COLORS = {
  success: { bg: '#059669', icon: '✓' },
  error:   { bg: '#DC2626', icon: '✕' },
  warning: { bg: '#D97706', icon: '⚠' },
  info:    { bg: '#1A56DB', icon: 'ℹ' },
}

export function Toast({ message, type, onClose }: ToastProps) {
  const t = TOAST_COLORS[type]
  React.useEffect(() => {
    if (type !== 'error') {
      const timer = setTimeout(onClose, 3500)
      return () => clearTimeout(timer)
    }
  }, [type, onClose])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-in
      flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-semibold"
      style={{ background: t.bg, minWidth: 280 }}>
      <span className="text-base">{t.icon}</span>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 ml-2">✕</button>
    </div>
  )
}
