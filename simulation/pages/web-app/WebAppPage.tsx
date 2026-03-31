import { AXAgentChat } from '@ax/agent-chat/src/AXAgentChat'
import { AXLogo } from '@ax/logo/src/AXLogo'
import { AXNotifyMenu } from '@ax/notify-menu/src/AXNotifyMenu'
import { AXSidebar } from '@ax/sidebar/src/AXSidebar'
import { AXTasksMenu } from '@ax/tasks-menu/src/AXTasksMenu'
import { AXUserMenu } from '@ax/user-menu/src/AXUserMenu'
import { AXWebApp } from '@ax/web-app/src/AXWebApp'

import aPlannerDark from '../../assets/a-planner-ai-dark.png'
import aPlannerLight from '../../assets/a-planner-ai-light.png'

function mockDynamic(value: string) {
  return { status: 'available' as const, value }
}

const mockAction = { canExecute: true, isExecuting: false, execute: () => {} }

function DemoContent() {
  return (
    <div style={{ maxWidth: 960 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 600 }}>Production Dashboard</h2>
      <p style={{ margin: '0 0 24px', color: '#666', fontSize: '0.875rem' }}>
        Plan smarter. Produce faster. Real-time wafer manufacturing intelligence at a glance.
      </p>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          { label: 'Overall Yield', value: '92.4%', color: '#4caf50' },
          { label: 'Throughput', value: '1,247 wafers/day', color: '#2196f3' },
          { label: 'Defect Rate', value: '1.8%', color: '#ff9800' },
          { label: 'WIP Count', value: '3,421 wafers', color: '#9c27b0' },
        ].map((kpi) => (
          <div
            key={kpi.label}
            style={{
              padding: 20,
              background: '#fff',
              borderRadius: 8,
              borderLeft: `4px solid ${kpi.color}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: 4 }}>{kpi.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Placeholder charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {['Yield Trend', 'Defect Distribution', 'Daily Throughput', 'Defect Heatmap'].map((chart) => (
          <div
            key={chart}
            style={{
              padding: 20,
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              minHeight: 200,
            }}
          >
            <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 12 }}>{chart}</div>
            <div
              style={{
                height: 150,
                background: 'linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '0.75rem',
              }}
            >
              Chart placeholder
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WebAppPage() {
  // Detect dark mode from the system (simulation app handles theme switching)
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  const logo = isDark ? aPlannerDark : aPlannerLight

  return (
    <AXWebApp
      name="AXWebApp1"
      class=""
      themeTokens=""
      logo={
        <AXLogo
          name="AXLogo1"
          class=""
          logoUrl={mockDynamic(logo)}
          altText={mockDynamic('aPlanner')}
          height={24}
          onClick={mockAction}
        />
      }
      tasksMenu={
        <AXTasksMenu name="AXTasksMenu1" class="" title={mockDynamic('Urgent tasks')} onTaskClick={mockAction} />
      }
      notifyMenu={
        <AXNotifyMenu name="AXNotifyMenu1" class="" title={mockDynamic('Notifications')} onNotifyClick={mockAction} />
      }
      userMenu={
        <AXUserMenu
          name="AXUserMenu1"
          class=""
          userName={mockDynamic('AI Planner')}
          userEmail={mockDynamic('contact@aplanner.ai')}
          onSignOut={mockAction}
          onProfile={mockAction}
          onSettings={mockAction}
        />
      }
      sidebar={<AXSidebar name="AXSidebar1" class="" />}
      content={<DemoContent />}
      agentChat={
        <AXAgentChat name="AXAgentChat1" class="" title={mockDynamic('AI Assistant')} onSendMessage={mockAction} />
      }
    />
  )
}
