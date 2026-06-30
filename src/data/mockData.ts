// ─────────────────────────────────────────────
// TramiGo · Mock Data — single source of truth
// ─────────────────────────────────────────────

export const HUB_COLORS: Record<string, string> = {
  family:       '#E11D48',
  property:     '#D97706',
  health:       '#0891B2',
  legal:        '#7C3AED',
  wealth:       '#047857',
  business:     '#1D4ED8',
  celebrations: '#A21CAF',
  travel:       '#0EA5E9',
  black:        '#C9A84C',
}

export const HUB_LABELS: Record<string, string> = {
  family:       'Family OS',
  property:     'Property OS',
  health:       'Health OS',
  legal:        'Legal OS',
  wealth:       'Wealth OS',
  business:     'Business OS',
  celebrations: 'Celebrations OS',
  travel:       'Travel OS',
  black:        'TramiGo Black',
}

export interface User {
  name: string
  email: string
  city: string
  plan: 'essential' | 'premium' | 'black'
  advisor: {
    name: string
    initials: string
    role: string
    online: boolean
    rating: number
    cases: number
  }
  lifeScore: {
    overall: number
    family: number
    property: number
    legal: number
    health: number
    wealth: number
    business: number
  }
}

export const user: User = {
  name: 'Andrés Pereira',
  email: 'andres@email.com',
  city: 'Miami, FL',
  plan: 'premium',
  advisor: {
    name: 'María Vargas',
    initials: 'MV',
    role: 'Asesora Senior · Bogotá',
    online: true,
    rating: 4.9,
    cases: 47,
  },
  lifeScore: {
    overall: 94,
    family: 98,
    property: 87,
    legal: 96,
    health: 100,
    wealth: 91,
    business: 88,
  },
}

export type MatterStatus = 'in_progress' | 'active' | 'pending' | 'review' | 'completed'

export interface Matter {
  id: string
  title: string
  hub: string
  status: MatterStatus
  progress: number
  advisor: string
  entity?: string
  steps: string[]
  currentStep: number
  opened: string
  estimatedClose: string
}

export const matters: Matter[] = [
  {
    id: 'TG-2024-0847',
    title: 'Sucesión Testamentaria',
    hub: 'legal',
    status: 'in_progress',
    progress: 68,
    advisor: 'Dr. Carlos Rondón',
    entity: 'Notaría 15 Bogotá',
    steps: ['Documentos', 'Radicación', 'Notaría', 'Escritura', 'Entrega'],
    currentStep: 2,
    opened: '8 Nov 2024',
    estimatedClose: '20 Dic 2024',
  },
  {
    id: 'TG-2024-0912',
    title: 'Arriendo Apto Chapinero',
    hub: 'property',
    status: 'active',
    progress: 100,
    advisor: 'María Vargas',
    entity: 'Propiedad propia',
    steps: ['Contrato', 'Firma', 'Activado'],
    currentStep: 2,
    opened: '1 Ago 2024',
    estimatedClose: '1 Ago 2025',
  },
  {
    id: 'TG-2024-1034',
    title: 'Renovación Cédula Ciudadanía',
    hub: 'legal',
    status: 'pending',
    progress: 15,
    advisor: 'María Vargas',
    entity: 'Registraduría Nacional',
    steps: ['Agenda', 'Cita', 'Trámite', 'Entrega'],
    currentStep: 0,
    opened: '15 Nov 2024',
    estimatedClose: '30 Dic 2024',
  },
  {
    id: 'TG-2024-1102',
    title: 'Constitución SAS Studio Creativo',
    hub: 'business',
    status: 'review',
    progress: 40,
    advisor: 'Dra. Ana Bermúdez',
    entity: 'Cámara de Comercio Bogotá',
    steps: ['Documentos', 'Revisión', 'Registro', 'RUT', 'Entrega'],
    currentStep: 1,
    opened: '20 Nov 2024',
    estimatedClose: '15 Ene 2025',
  },
]

export interface AIAlert {
  id: number
  type: 'urgent' | 'medium' | 'info'
  message: string
  action: string
  hub: string
}

export const alerts: AIAlert[] = [
  { id: 1, type: 'urgent', message: 'Poder notarial vence en 60 días', action: 'Renovar', hub: 'legal' },
  { id: 2, type: 'medium', message: 'Cumpleaños de Sara en 12 días', action: 'Celebrar', hub: 'celebrations' },
  { id: 3, type: 'urgent', message: 'Predial Usaquén vence en 8 días', action: 'Pagar', hub: 'property' },
  { id: 4, type: 'info', message: 'Apto Chapinero valorizó 4.2% este trimestre', action: 'Ver informe', hub: 'property' },
]

export interface FamilyMember {
  id: number
  name: string
  relation: string
  age: number
  city: string
  healthScore: number
  initials: string
  color: string
  nextAppointment: string
  medications: string[]
  tasks: number
  birthdayDays?: number
}

export const family: FamilyMember[] = [
  {
    id: 1, name: 'Patricia Pereira', relation: 'Mamá', age: 73, city: 'Bogotá',
    healthScore: 78, initials: 'MP', color: '#E11D48',
    nextAppointment: 'Cardiología · Clínica Shaio · Dic 12',
    medications: ['Losartán 50mg', 'Atorvastatina 20mg'], tasks: 2,
  },
  {
    id: 2, name: 'Roberto Pereira', relation: 'Papá', age: 75, city: 'Bogotá',
    healthScore: 82, initials: 'RP', color: '#7C3AED',
    nextAppointment: 'Control general · Imbanaco · Dic 18',
    medications: ['Metformina 850mg'], tasks: 1,
  },
  {
    id: 3, name: 'Sara Pereira', relation: 'Hermana', age: 35, city: 'Medellín',
    healthScore: 95, initials: 'SP', color: '#059669',
    nextAppointment: 'Sin citas próximas',
    medications: [], tasks: 1, birthdayDays: 12,
  },
]

export interface Property {
  id: number
  name: string
  address: string
  type: string
  size: number
  monthlyRent: number
  commercialValue: number
  tenant: string
  paymentStatus: 'current' | 'late'
  hasAlert: boolean
  alertMessage?: string
}

export const properties: Property[] = [
  {
    id: 1, name: 'Apartamento Chapinero', address: 'Cl 63 #11-45, Bogotá',
    type: 'Apartamento', size: 82, monthlyRent: 2800000, commercialValue: 520000000,
    tenant: 'Juan López', paymentStatus: 'current', hasAlert: false,
  },
  {
    id: 2, name: 'Casa Usaquén', address: 'Cr 6a #120-38, Bogotá',
    type: 'Casa', size: 220, monthlyRent: 4500000, commercialValue: 1200000000,
    tenant: 'Carlos Mesa', paymentStatus: 'current', hasAlert: true,
    alertMessage: 'Mantenimiento urgente: revisión cubierta',
  },
]

export const activityFeed = [
  { id: 1, text: 'Certificado catastral aprobado y cargado en bóveda', time: 'Hace 12 min', advisor: 'MV', color: '#059669' },
  { id: 2, text: 'Escritura de compraventa enviada a revisión notarial', time: 'Hace 2h', advisor: 'CR', color: '#1A56DB' },
  { id: 3, text: 'Pago de arrendamiento recibido — $2,800,000 COP', time: 'Ayer 3:42 PM', advisor: '', color: '#059669' },
  { id: 4, text: 'Impuesto predial Usaquén vence en 8 días', time: 'Ayer 9:00 AM', advisor: 'AI', color: '#D97706' },
]
