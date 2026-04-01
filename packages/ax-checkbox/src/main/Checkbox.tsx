import MuiCheckbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useCheckboxStore } from './context'

export const Checkbox = observer(function Checkbox(): ReactElement {
  const store = useCheckboxStore()

  return (
    <FormControlLabel
      label={store.label}
      disabled={store.disabled}
      control={
        <MuiCheckbox
          checked={store.checked}
          onChange={(_e, checked) => store.setChecked(checked)}
          color={store.color}
          size={store.size}
          disabled={store.disabled}
        />
      }
    />
  )
})
