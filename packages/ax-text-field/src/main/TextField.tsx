import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MuiTextField from '@mui/material/TextField'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'

import { useTextFieldStore } from './context'

export const TextField = observer(function TextField(): ReactElement {
  const store = useTextFieldStore()

  const isPassword = store.inputType === 'password'
  const resolvedType = isPassword && store.showPassword ? 'text' : store.inputType

  return (
    <MuiTextField
      label={store.label || undefined}
      placeholder={store.placeholder || undefined}
      variant={store.variant}
      size={store.size}
      type={resolvedType}
      multiline={store.multiline}
      rows={store.multiline ? store.rows : undefined}
      maxRows={store.multiline ? store.maxRows : undefined}
      required={store.required}
      fullWidth={store.fullWidth}
      helperText={store.error || store.helperText || undefined}
      error={!!store.error}
      value={store.value}
      disabled={store.readOnly}
      onChange={(e) => store.setValue(e.target.value)}
      onBlur={() => store.submit()}
      slotProps={{
        input: {
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => store.toggleShowPassword()} edge="end">
                {store.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  )
})
