'use client'

import { useMemo, useState } from 'react'
import type { EmployeeStatus } from '@/lib/techforward-world'
import {
  departments,
  employees,
  statusLabel,
  statusTone,
  techforwardWorldEvents,
} from '@/lib/techforward-world'

export default function TechForwardWorldPage() {
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showLinks, setShowLinks] = useState(true)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('e1')

  const visibleEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const departmentMatch =
        departmentFilter === 'all' || employee.departmentId === departmentFilter
      const statusMatch = statusFilter === 'all' || employee.status === statusFilter

      return departmentMatch && statusMatch
    })
  }, [departmentFilter, statusFilter])

  const visibleEmployeeIds = new Set(visibleEmployees.map((employee) => employee.id))

  const selectedEmployee =
    visibleEmployees.find((employee) => employee.id === selectedEmployeeId) ??
    visibleEmployees[0] ??
    null

  const selectedDepartment = selectedEmployee
    ? departments.find((department) => department.id === selectedEmployee.departmentId) ?? null
    : null

  const totalProjects = new Set(visibleEmployees.map((employee) => employee.project)).size

  return (
    <div className="tf-world-shell">
      <section className="tf-world-hero">
        <div>
          <p className="tf-world-kicker">Interactive Org Map</p>
          <h1 className="tf-world-title">TechForward World</h1>
          <p className="tf-world-copy">
            Build a readable company map where departments become places, projects become quests,
            and employees become active characters inside a shared world.
          </p>
        </div>
        <div className="tf-world-heroCard">
          <span className="tf-world-heroCardLabel">Current mode</span>
          <strong>Organization View</strong>
          <p>Use this as the base MVP before adding movement, quests, or scenario playback.</p>
        </div>
      </section>

      <section className="tf-world-layout">
        <aside className="tf-world-panel tf-world-panel--sidebar">
          <div>
            <h2 className="tf-world-panelTitle">Filters</h2>
            <p className="tf-world-panelText">Start with structure, then layer in activity.</p>
          </div>

          <label className="tf-world-field">
            <span>Department</span>
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
            >
              <option value="all">All departments</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>

          <label className="tf-world-field">
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">All states</option>
              <option value="focused">Focused</option>
              <option value="meeting">In meeting</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </label>

          <label className="tf-world-toggle">
            <input
              type="checkbox"
              checked={showLinks}
              onChange={(event) => setShowLinks(event.target.checked)}
            />
            <span>Show collaboration links</span>
          </label>

          <div className="tf-world-summary">
            <h3>Team Summary</h3>
            <dl>
              <div>
                <dt>Visible staff</dt>
                <dd>{visibleEmployees.length}</dd>
              </div>
              <div>
                <dt>Active quests</dt>
                <dd>{totalProjects}</dd>
              </div>
              <div>
                <dt>Busy members</dt>
                <dd>{visibleEmployees.filter((employee) => employee.status === 'busy').length}</dd>
              </div>
            </dl>
          </div>

          <div className="tf-world-legend">
            <h3>Legend</h3>
            <ul>
              {Object.entries(statusTone).map(([status, tone]) => (
                <li key={status}>
                  <span className="tf-world-legendDot" style={{ backgroundColor: tone }} />
                  <span>{statusLabel[status as EmployeeStatus]}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="tf-world-panel tf-world-panel--map">
          <div className="tf-world-mapHeader">
            <div>
              <h2 className="tf-world-panelTitle">Company Map</h2>
              <p className="tf-world-panelText">
                Click a character to inspect role, project, and team connections.
              </p>
            </div>
            <span className="tf-world-badge">MVP route: /techforward-world</span>
          </div>

          <div className="tf-world-map">
            <div className="tf-world-cloud tf-world-cloud--one" aria-hidden="true" />
            <div className="tf-world-cloud tf-world-cloud--two" aria-hidden="true" />
            <div className="tf-world-terrain tf-world-terrain--pond" aria-hidden="true" />
            <div className="tf-world-terrain tf-world-terrain--grove" aria-hidden="true" />
            <div className="tf-world-terrain tf-world-terrain--path" aria-hidden="true" />
            <svg
              className="tf-world-links"
              viewBox="0 0 920 520"
              role="presentation"
              aria-hidden="true"
            >
              {showLinks &&
                visibleEmployees.flatMap((employee) =>
                  employee.links
                    .filter((targetId) => visibleEmployeeIds.has(targetId))
                    .map((targetId) => {
                      const target = employees.find((entry) => entry.id === targetId)
                      if (!target || employee.id > targetId) {
                        return null
                      }

                      return (
                        <line
                          key={`${employee.id}-${targetId}`}
                          x1={employee.x}
                          y1={employee.y}
                          x2={target.x}
                          y2={target.y}
                        />
                      )
                    }),
                )}
            </svg>

            {departments.map((department) => (
              <button
                key={department.id}
                type="button"
                className="tf-world-building"
                style={{
                  left: department.x,
                  top: department.y,
                  width: department.width,
                  height: department.height,
                  ['--building-hue' as string]: department.hue,
                }}
                onClick={() => setDepartmentFilter(department.id)}
              >
                <span className="tf-world-buildingRoof" aria-hidden="true" />
                <span className="tf-world-buildingZone">{department.zone}</span>
                <strong>{department.name}</strong>
                <span>{department.summary}</span>
              </button>
            ))}

            {visibleEmployees.map((employee, index) => (
              <button
                key={employee.id}
                type="button"
                className="tf-world-npc"
                style={{
                  left: employee.x,
                  top: employee.y,
                  ['--npc-tone' as string]: statusTone[employee.status],
                  ['--npc-delay' as string]: `${index * 0.14}s`,
                }}
                data-selected={selectedEmployee?.id === employee.id}
                data-status={employee.status}
                onClick={() => setSelectedEmployeeId(employee.id)}
                aria-label={`${employee.name}, ${employee.role}`}
              >
                {selectedEmployee?.id === employee.id ? (
                  <span className="tf-world-questMarker" aria-hidden="true">
                    !
                  </span>
                ) : null}
                <span className="tf-world-npcSprite" />
                <span className="tf-world-npcName">{employee.name}</span>
              </button>
            ))}
          </div>

          <div className="tf-world-events">
            <h3>Event Log</h3>
            <ul>
              {techforwardWorldEvents.map((event) => (
                <li key={event}>{event}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="tf-world-panel tf-world-panel--detail">
          {selectedEmployee && selectedDepartment ? (
            <>
              <div className="tf-world-detailHeader">
                <p className="tf-world-kicker">Selected Character</p>
                <h2 className="tf-world-panelTitle">{selectedEmployee.name}</h2>
                <p className="tf-world-panelText">{selectedEmployee.role}</p>
              </div>

              <div className="tf-world-detailGrid">
                <div>
                  <span>Department</span>
                  <strong>{selectedDepartment.name}</strong>
                </div>
                <div>
                  <span>Project</span>
                  <strong>{selectedEmployee.project}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{statusLabel[selectedEmployee.status]}</strong>
                </div>
                <div>
                  <span>Mission</span>
                  <strong>{selectedDepartment.mission}</strong>
                </div>
              </div>

              <div className="tf-world-skillList">
                <span>Skill tags</span>
                <div>
                  {selectedEmployee.skills.map((skill) => (
                    <small key={skill}>{skill}</small>
                  ))}
                </div>
              </div>

              <div className="tf-world-notes">
                <span>Field note</span>
                <p>{selectedEmployee.note}</p>
              </div>

              <div className="tf-world-notes">
                <span>Next build ideas</span>
                <p>Add route playback, project-only mode, and NPC movement to show load shifts.</p>
              </div>
            </>
          ) : (
            <div className="tf-world-emptyState">
              <h2 className="tf-world-panelTitle">No character selected</h2>
              <p className="tf-world-panelText">
                Relax the filters or click another area on the map.
              </p>
            </div>
          )}
        </aside>
      </section>
    </div>
  )
}
