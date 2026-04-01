import { type ReactElement } from 'react'

import { type AXSliderPreviewProps } from '../typings/AXSliderProps'
import { SliderPreview } from './preview/SliderPreview'

export function preview(props: AXSliderPreviewProps): ReactElement {
  return (
    <SliderPreview
      label={props.label}
      min={props.min}
      max={props.max}
      step={props.step}
      color={props.color}
      size={props.size}
      marks={props.marks}
      valueLabelDisplay={props.valueLabelDisplay}
      disabled={props.readOnly || props.disabled}
    />
  )
}

export function getPreviewCss(): string {
  return require('./styles/AXSliderPreview.scss')
}
