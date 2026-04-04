export type EmployeeStatus = 'focused' | 'meeting' | 'busy' | 'offline'

export type Department = {
  id: string
  name: string
  zone: string
  x: number
  y: number
  width: number
  height: number
  hue: string
  summary: string
  mission: string
}

export type Employee = {
  id: string
  name: string
  role: string
  departmentId: string
  skills: string[]
  project: string
  status: EmployeeStatus
  x: number
  y: number
  links: string[]
  note: string
}

export const departments: Department[] = [
  {
    id: 'entrance',
    name: 'Entrance Plaza',
    zone: 'Company Core',
    x: 64,
    y: 56,
    width: 210,
    height: 128,
    hue: '#d9bb6d',
    summary: 'Welcome, company overview, weekly pulse',
    mission: 'Make the current shape of the company easy to grasp at a glance.',
  },
  {
    id: 'product',
    name: 'Product Forge',
    zone: 'Delivery',
    x: 310,
    y: 48,
    width: 248,
    height: 158,
    hue: '#5f88ff',
    summary: 'Engineering, PM, design system',
    mission: 'Ship product quality while keeping delivery flow healthy.',
  },
  {
    id: 'growth',
    name: 'Growth Port',
    zone: 'Revenue',
    x: 610,
    y: 52,
    width: 232,
    height: 148,
    hue: '#44b87d',
    summary: 'Sales, marketing, customer success',
    mission: 'Convert market demand into predictable growth.',
  },
  {
    id: 'lab',
    name: 'AI Lab',
    zone: 'R&D',
    x: 116,
    y: 272,
    width: 212,
    height: 142,
    hue: '#ef8d4d',
    summary: 'Experiments, prototypes, internal tooling',
    mission: 'Test high-upside ideas before they hit core delivery.',
  },
  {
    id: 'hub',
    name: 'Quest Hub',
    zone: 'Cross-team',
    x: 374,
    y: 264,
    width: 204,
    height: 154,
    hue: '#8f72e6',
    summary: 'Shared projects, ceremonies, unblockers',
    mission: 'Coordinate dependencies across teams without adding friction.',
  },
  {
    id: 'ops',
    name: 'People Base',
    zone: 'Operations',
    x: 650,
    y: 282,
    width: 188,
    height: 136,
    hue: '#e16e86',
    summary: 'HR, finance, operations',
    mission: 'Keep hiring, staffing, and operations stable.',
  },
]

export const employees: Employee[] = [
  {
    id: 'e1',
    name: 'Arai Mei',
    role: 'Frontend Engineer',
    departmentId: 'product',
    skills: ['React', 'Design Systems', 'AI UI'],
    project: 'Atlas Console',
    status: 'focused',
    x: 378,
    y: 114,
    links: ['e2', 'e3', 'e5'],
    note: 'Owns the customer-facing dashboard and interaction polish.',
  },
  {
    id: 'e2',
    name: 'Kondo Ren',
    role: 'Backend Engineer',
    departmentId: 'product',
    skills: ['Node.js', 'APIs', 'Infra'],
    project: 'Atlas Console',
    status: 'busy',
    x: 474,
    y: 142,
    links: ['e1', 'e4'],
    note: 'Handling API load hotspots and queue reliability.',
  },
  {
    id: 'e3',
    name: 'Sato Yui',
    role: 'Sales Lead',
    departmentId: 'growth',
    skills: ['Enterprise Sales', 'CRM', 'Discovery'],
    project: 'Northstar Pipeline',
    status: 'meeting',
    x: 680,
    y: 110,
    links: ['e1', 'e6'],
    note: 'Brings customer feedback back into the product loop.',
  },
  {
    id: 'e4',
    name: 'Hoshino Kai',
    role: 'People Ops Manager',
    departmentId: 'ops',
    skills: ['Hiring', 'Operations', 'Onboarding'],
    project: 'PeopleOS',
    status: 'focused',
    x: 748,
    y: 336,
    links: ['e2', 'e7'],
    note: 'Watching bandwidth and staffing risk across squads.',
  },
  {
    id: 'e5',
    name: 'Fujita Noa',
    role: 'AI Researcher',
    departmentId: 'lab',
    skills: ['LLM', 'Evaluation', 'Rapid Prototyping'],
    project: 'FutureDesk',
    status: 'focused',
    x: 204,
    y: 318,
    links: ['e1', 'e7'],
    note: 'Exploring AI copilots for internal workflows.',
  },
  {
    id: 'e6',
    name: 'Imai Riku',
    role: 'Customer Success',
    departmentId: 'growth',
    skills: ['Onboarding', 'Expansion', 'Insights'],
    project: 'Northstar Pipeline',
    status: 'focused',
    x: 760,
    y: 150,
    links: ['e3', 'e7'],
    note: 'Tracks activation and adoption after handoff.',
  },
  {
    id: 'e7',
    name: 'Takeda Rin',
    role: 'Program Manager',
    departmentId: 'hub',
    skills: ['Roadmaps', 'Facilitation', 'Delivery Ops'],
    project: 'Orbit Sync',
    status: 'meeting',
    x: 470,
    y: 320,
    links: ['e4', 'e5', 'e6'],
    note: 'Keeps cross-team work visible and unblocked.',
  },
]

export const statusLabel: Record<EmployeeStatus, string> = {
  focused: 'Focused',
  meeting: 'In meeting',
  busy: 'Busy',
  offline: 'Offline',
}

export const statusTone: Record<EmployeeStatus, string> = {
  focused: '#2d9d57',
  meeting: '#dc8b18',
  busy: '#d64545',
  offline: '#7f8794',
}

export const techforwardWorldEvents = [
  'Atlas Console sprint review moved to Quest Hub.',
  'Northstar Pipeline raised a new product feedback item.',
  'People Base opened a hiring quest for platform engineering.',
]
