import { createBrowserRouter } from 'react-router'

import { Layout } from '../../shared/layout/Layout'

export const router = createBrowserRouter([
  {
    path: 'sign-in',
    lazy: async () => {
      const module = await import('../../pages/sign-in/SignInPage')
      return { Component: module.default }
    },
  },
  {
    path: 'sign-up',
    lazy: async () => {
      const module = await import('../../pages/sign-up/SignUpPage')
      return { Component: module.default }
    },
  },
  {
    path: 'reset-psw',
    lazy: async () => {
      const module = await import('../../pages/reset-psw/ResetPswPage')
      return { Component: module.default }
    },
  },
  {
    path: 'set-psw',
    lazy: async () => {
      const module = await import('../../pages/set-psw/SetPswPage')
      return { Component: module.default }
    },
  },
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
