import { AXAuthLayout } from '@ax/auth-layout/src/AXAuthLayout'

function mockDynamic(value: string) {
  return { status: 'available' as const, value }
}

export default function AuthLayoutPage() {
  return (
    <AXAuthLayout
      name="AXAuthLayout1"
      class=""
      tagline={mockDynamic('AI-Powered\nSmart Manufacturing')}
      brandDescription={mockDynamic(
        'Streamline your semiconductor operations with intelligent planning, real-time monitoring, and predictive analytics.',
      )}
      showBackground={true}
    />
  )
}
