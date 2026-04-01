import FormControlLabel from '@mui/material/FormControlLabel'
import MuiSwitch from '@mui/material/Switch'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useSwitchStore } from './context'

export const Switch = observer(function Switch(): ReactElement {
  const store = useSwitchStore()

  return (
    <FormControlLabel
      label={store.label}
      labelPlacement={store.labelPlacement}
      disabled={store.disabled}
      control={
        <MuiSwitch
          checked={store.checked}
          color={store.color}
          size={store.size}
          onChange={(_e, checked) => store.setChecked(checked)}
        />
      }
    />
  )
})
