import { createBrowserRouter } from 'react-router'

import { Layout } from '../../shared/layout/Layout'

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import('../../pages/dashboard/DashboardPage')
          return { Component: module.default }
        },
      },
      {
        path: '*',
        lazy: async () => {
          const module = await import('../../pages/not-found/NotFoundPage')
          return { Component: module.default }
        },
      },
    ],
  },
])
