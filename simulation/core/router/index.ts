import { createBrowserRouter } from 'react-router'

import { Layout } from '../../shared/layout/Layout'

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import('../../pages/auth-layout/AuthLayoutPage')
          return { Component: module.default }
        },
      },
      {
        path: 'dashboard',
        lazy: async () => {
          const module = await import('../../pages/dashboard/DashboardPage')
          return { Component: module.default }
        },
      },
      {
        path: 'yield',
        lazy: async () => {
          const module = await import('../../pages/yield/YieldPage')
          return { Component: module.default }
        },
      },
      {
        path: 'defects',
        lazy: async () => {
          const module = await import('../../pages/defects/DefectsPage')
          return { Component: module.default }
        },
      },
      {
        path: 'lots',
        lazy: async () => {
          const module = await import('../../pages/lots/LotsPage')
          return { Component: module.default }
        },
      },
      {
        path: 'technology-roadmap',
        lazy: async () => {
          const module = await import('../../pages/technology-roadmap/TechnologyRoadmapPage')
          return { Component: module.default }
        },
      },
      {
        path: 'roadmap',
        lazy: async () => {
          const module = await import('../../pages/roadmap/RoadmapPage')
          return { Component: module.default }
        },
      },
      {
        path: 'about',
        lazy: async () => {
          const module = await import('../../pages/about/AboutPage')
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
