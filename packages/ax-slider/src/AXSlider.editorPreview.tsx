import { type ReactElement } from 'react'

import { type AXSliderPreviewProps } from '../typings/AXSliderProps'
import { SliderPreview } from './preview/SliderPreview'

export function preview(props: AXSliderPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.style}>
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
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AXSliderPreview.scss')
}
