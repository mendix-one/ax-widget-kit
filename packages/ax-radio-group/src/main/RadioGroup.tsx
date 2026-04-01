import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import MuiRadioGroup from '@mui/material/RadioGroup'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useRadioGroupStore } from './context'

export const RadioGroup = observer(function RadioGroup(): ReactElement {
  const store = useRadioGroupStore()

  return (
    <FormControl disabled={store.disabled}>
      {store.label && <FormLabel>{store.label}</FormLabel>}
      <MuiRadioGroup value={store.value} onChange={(_e, value) => store.setValue(value)} row={store.row}>
        {store.options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio color={store.color} size={store.size} />}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  )
})
