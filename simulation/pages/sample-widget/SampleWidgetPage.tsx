import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { AXWidgetKit } from '../../../src/AXWidgetKit'

export default function SampleWidgetPage() {
  const [sampleText, setSampleText] = useState('World')

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        AXWidgetKit Preview
      </Typography>

      <Box sx={{ mb: 3, maxWidth: 400 }}>
        <TextField
          label="sampleText"
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          size="small"
          fullWidth
        />
      </Box>

      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <AXWidgetKit name="AXWidgetKit1" class="" sampleText={sampleText} />
      </Box>
    </Box>
  )
}
