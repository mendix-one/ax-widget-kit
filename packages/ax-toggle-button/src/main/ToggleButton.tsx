import MuiToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useToggleButtonStore } from './context'

export const ToggleButton = observer(function ToggleButton(): ReactElement {
  const store = useToggleButtonStore()

  return (
    <ToggleButtonGroup
      value={store.value}
      exclusive={store.exclusive}
      color={store.color}
      size={store.size}
      orientation={store.orientation}
      disabled={store.disabled}
      fullWidth={store.fullWidth}
      onChange={(_e, v) => {
        if (v !== null) {
          store.setValue(v as string)
        }
      }}
    >
      {store.options.map((opt) => (
        <MuiToggleButton key={opt.value} value={opt.value}>
          {opt.label || opt.value}
        </MuiToggleButton>
      ))}
    </ToggleButtonGroup>
  )
})
