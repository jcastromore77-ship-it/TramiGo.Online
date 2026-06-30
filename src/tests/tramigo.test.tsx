// ─────────────────────────────────────────────
// TramiGo · Test Suite
// Covers: data integrity, auth hook, UI components, routing
// ─────────────────────────────────────────────
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'

// ── 1. Mock data integrity ────────────────────
import {
  user, matters, alerts, family, properties, activityFeed,
  HUB_COLORS, HUB_LABELS,
} from '../data/mockData'

describe('mockData — structural integrity', () => {
  it('user has required fields', () => {
    expect(user.name).toBeTruthy()
    expect(user.email).toContain('@')
    expect(['essential','premium','black']).toContain(user.plan)
    expect(user.advisor.online).toBe(true)
    expect(user.lifeScore.overall).toBeGreaterThanOrEqual(0)
    expect(user.lifeScore.overall).toBeLessThanOrEqual(100)
  })

  it('all lifeScore values are 0-100', () => {
    Object.values(user.lifeScore).forEach(v => {
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(100)
    })
  })

  it('matters array has 4 items with required fields', () => {
    expect(matters).toHaveLength(4)
    matters.forEach(m => {
      expect(m.id).toMatch(/^TG-\d{4}-\d{4}$/)
      expect(m.title).toBeTruthy()
      expect(m.hub).toBeTruthy()
      expect(m.progress).toBeGreaterThanOrEqual(0)
      expect(m.progress).toBeLessThanOrEqual(100)
      expect(m.steps.length).toBeGreaterThan(0)
      expect(m.currentStep).toBeLessThan(m.steps.length)
    })
  })

  it('matter statuses are valid', () => {
    const validStatuses = ['in_progress','active','pending','review','completed']
    matters.forEach(m => expect(validStatuses).toContain(m.status))
  })

  it('alerts have valid urgency types', () => {
    const validTypes = ['urgent','medium','info']
    alerts.forEach(a => {
      expect(validTypes).toContain(a.type)
      expect(a.message).toBeTruthy()
      expect(a.action).toBeTruthy()
    })
  })

  it('family members have valid health scores', () => {
    family.forEach(m => {
      expect(m.healthScore).toBeGreaterThanOrEqual(0)
      expect(m.healthScore).toBeLessThanOrEqual(100)
      expect(m.name).toBeTruthy()
      expect(m.initials).toHaveLength(2)
    })
  })

  it('properties have positive financial values', () => {
    properties.forEach(p => {
      expect(p.monthlyRent).toBeGreaterThan(0)
      expect(p.commercialValue).toBeGreaterThan(p.monthlyRent)
    })
  })

  it('HUB_COLORS has valid hex values', () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/
    Object.values(HUB_COLORS).forEach(c => expect(c).toMatch(hexRegex))
  })

  it('HUB_LABELS matches HUB_COLORS keys', () => {
    const colorKeys = Object.keys(HUB_COLORS).sort()
    const labelKeys = Object.keys(HUB_LABELS).sort()
    expect(colorKeys).toEqual(labelKeys)
  })

  it('activityFeed has items', () => {
    expect(activityFeed.length).toBeGreaterThan(0)
    activityFeed.forEach(a => {
      expect(a.text).toBeTruthy()
      expect(a.time).toBeTruthy()
    })
  })
})

// ── 2. useAuth hook ───────────────────────────
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../hooks/useAuth'

describe('useAuth hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts unauthenticated when localStorage is empty', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isLoggedIn).toBe(false)
    expect(result.current.authUser).toBeNull()
  })

  it('login sets user and isLoggedIn', () => {
    const { result } = renderHook(() => useAuth())
    act(() => {
      result.current.login({ name: 'Test User', email: 'test@test.com', plan: 'premium' })
    })
    expect(result.current.isLoggedIn).toBe(true)
    expect(result.current.authUser?.name).toBe('Test User')
    expect(result.current.authUser?.plan).toBe('premium')
  })

  it('login persists to localStorage', () => {
    const { result } = renderHook(() => useAuth())
    act(() => {
      result.current.login({ name: 'Persist', email: 'p@p.com', plan: 'essential' })
    })
    const stored = JSON.parse(localStorage.getItem('tramigo_user') ?? '{}')
    expect(stored.name).toBe('Persist')
  })

  it('logout clears user and localStorage', () => {
    const { result } = renderHook(() => useAuth())
    act(() => {
      result.current.login({ name: 'Out', email: 'o@o.com', plan: 'black' })
    })
    act(() => {
      result.current.logout()
    })
    expect(result.current.isLoggedIn).toBe(false)
    expect(result.current.authUser).toBeNull()
    expect(localStorage.getItem('tramigo_user')).toBeNull()
  })

  it('reads existing session from localStorage on mount', () => {
    localStorage.setItem('tramigo_user', JSON.stringify({ name: 'Existing', email: 'e@e.com', plan: 'premium' }))
    const { result } = renderHook(() => useAuth())
    expect(result.current.isLoggedIn).toBe(true)
    expect(result.current.authUser?.name).toBe('Existing')
  })

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('tramigo_user', 'NOT_JSON{{{')
    const { result } = renderHook(() => useAuth())
    expect(result.current.isLoggedIn).toBe(false)
  })
})

// ── 3. UI Components ──────────────────────────
import { StatusPill, ProgressBar, LifeScoreRing, StatCard, AlertItem, Toast } from '../components/UI'

describe('StatusPill component', () => {
  it('renders "En progreso" for in_progress', () => {
    render(<StatusPill status="in_progress" />)
    expect(screen.getByText('En progreso')).toBeInTheDocument()
  })

  it('renders "Completado" for completed', () => {
    render(<StatusPill status="completed" />)
    expect(screen.getByText('Completado')).toBeInTheDocument()
  })

  it('renders "Pendiente" for pending', () => {
    render(<StatusPill status="pending" />)
    expect(screen.getByText('Pendiente')).toBeInTheDocument()
  })

  it('renders "En revisión" for review', () => {
    render(<StatusPill status="review" />)
    expect(screen.getByText('En revisión')).toBeInTheDocument()
  })

  it('renders "Activo" for active', () => {
    render(<StatusPill status="active" />)
    expect(screen.getByText('Activo')).toBeInTheDocument()
  })
})

describe('ProgressBar component', () => {
  it('renders a fill div without crashing', () => {
    const { container } = render(<ProgressBar value={68} color="#1A56DB" />)
    const fill = container.querySelector('div > div')
    expect(fill).not.toBeNull()
  })
  it('renders at 0', () => {
    const { container } = render(<ProgressBar value={0} />)
    expect(container.firstChild).not.toBeNull()
  })
  it('renders at 100', () => {
    const { container } = render(<ProgressBar value={100} />)
    expect(container.firstChild).not.toBeNull()
  })
})

describe('LifeScoreRing component', () => {
  it('renders the score number', () => {
    render(<LifeScoreRing score={94} />)
    expect(screen.getByText('94')).toBeInTheDocument()
  })

  it('renders percentage sign', () => {
    render(<LifeScoreRing score={87} />)
    expect(screen.getByText('%')).toBeInTheDocument()
  })

  it('renders SVG circles', () => {
    const { container } = render(<LifeScoreRing score={75} />)
    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBeGreaterThanOrEqual(2)
  })
})

describe('StatCard component', () => {
  it('renders value and label', () => {
    render(<StatCard value="7" label="Trámites activos" color="#1A56DB" icon={<span>●</span>} />)
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('Trámites activos')).toBeInTheDocument()
  })

  it('renders badge when provided', () => {
    render(<StatCard value="3" label="Test" color="#D97706" icon={<span />} badge="+2" />)
    expect(screen.getByText('+2')).toBeInTheDocument()
  })
})

describe('AlertItem component', () => {
  it('renders message and action', () => {
    render(<AlertItem type="urgent" message="Predial vence en 8 días" action="Pagar" />)
    expect(screen.getByText('Predial vence en 8 días')).toBeInTheDocument()
    expect(screen.getByText('Pagar →')).toBeInTheDocument()
  })

  it('calls onAction when action button clicked', () => {
    const cb = vi.fn()
    render(<AlertItem type="medium" message="Test" action="Resolver" onAction={cb} />)
    fireEvent.click(screen.getByText('Resolver →'))
    expect(cb).toHaveBeenCalledOnce()
  })
})

describe('Toast component', () => {
  it('renders success message', () => {
    render(<Toast type="success" message="¡Listo!" onClose={vi.fn()} />)
    expect(screen.getByText('¡Listo!')).toBeInTheDocument()
  })

  it('calls onClose when X is clicked', () => {
    const cb = vi.fn()
    render(<Toast type="info" message="Información" onClose={cb} />)
    fireEvent.click(screen.getByText('✕'))
    expect(cb).toHaveBeenCalledOnce()
  })

  it('auto-closes after timeout for non-error types', async () => {
    vi.useFakeTimers()
    const cb = vi.fn()
    render(<Toast type="success" message="Auto close" onClose={cb} />)
    await vi.runAllTimersAsync()
    expect(cb).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('does NOT auto-close error type', async () => {
    vi.useFakeTimers()
    const cb = vi.fn()
    render(<Toast type="error" message="Error" onClose={cb} />)
    vi.advanceTimersByTime(5000)
    expect(cb).not.toHaveBeenCalled()
    vi.useRealTimers()
  })
})

// ── 4. Page routing ───────────────────────────
import Landing from '../pages/Landing'
import { Login } from '../pages/Auth'

describe('Landing page', () => {
  it('renders main headline', () => {
    render(<MemoryRouter><Landing /></MemoryRouter>)
    expect(screen.getAllByText(/Tu vida en/i).length).toBeGreaterThanOrEqual(1)
  })

  it('has Comienza ahora CTA', () => {
    render(<MemoryRouter><Landing /></MemoryRouter>)
    const btns = screen.getAllByText(/Comienza ahora/i)
    expect(btns.length).toBeGreaterThanOrEqual(1)
  })

  it('shows trust stats', () => {
    render(<MemoryRouter><Landing /></MemoryRouter>)
    expect(screen.getAllByText(/4,200\+/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows all 8 hub cards', () => {
    render(<MemoryRouter><Landing /></MemoryRouter>)
    expect(screen.getByText('Family OS')).toBeInTheDocument()
    expect(screen.getByText('Property OS')).toBeInTheDocument()
    expect(screen.getByText('Legal OS')).toBeInTheDocument()
    expect(screen.getByText('TramiGo Black')).toBeInTheDocument()
  })

  it('shows pricing plans', () => {
    render(<MemoryRouter><Landing /></MemoryRouter>)
    expect(screen.getByText('Essential')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
    expect(screen.getByText('Black')).toBeInTheDocument()
  })
})

describe('Login page', () => {
  it('renders email and password fields', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('shows error when submitting empty fields', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    const emailInput = screen.getByPlaceholderText('tu@email.com') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: '' } })
    const btn = screen.getByText('Iniciar sesión')
    fireEvent.click(btn)
    await waitFor(() => {
      expect(screen.getByText('Completa todos los campos')).toBeInTheDocument()
    })
  })

  it('has link to register', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    expect(screen.getByText('Regístrate gratis')).toBeInTheDocument()
  })
})

// ── 5. Business logic ─────────────────────────
describe('Business logic — matters', () => {
  it('progress values are sorted logically', () => {
    const activeMatter = matters.find(m => m.status === 'active')
    expect(activeMatter?.progress).toBe(100)
  })

  it('in_progress matter has currentStep < steps.length', () => {
    const inProgress = matters.filter(m => m.status === 'in_progress')
    inProgress.forEach(m => {
      expect(m.currentStep).toBeLessThan(m.steps.length)
    })
  })

  it('each matter has at least 3 steps', () => {
    matters.forEach(m => expect(m.steps.length).toBeGreaterThanOrEqual(3))
  })
})

describe('Business logic — life score', () => {
  it('overall score is reasonable vs hub scores', () => {
    const hubValues = Object.entries(user.lifeScore)
      .filter(([k]) => k !== 'overall')
      .map(([, v]) => v)
    const avg = hubValues.reduce((a, b) => a + b, 0) / hubValues.length
    // overall should be within 15 points of average
    expect(Math.abs(user.lifeScore.overall - avg)).toBeLessThan(15)
  })
})
