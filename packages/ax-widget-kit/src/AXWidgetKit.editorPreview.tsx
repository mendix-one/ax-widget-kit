import { ReactElement } from 'react'
import { HelloWorldSample } from './components/HelloWorldSample'
import { AXWidgetKitPreviewProps } from '../typings/AXWidgetKitProps'

export function preview({ sampleText }: AXWidgetKitPreviewProps): ReactElement {
  return <HelloWorldSample sampleText={sampleText} />
}

export function getPreviewCss(): string {
  return require('./ui/AXWidgetKit.scss')
}
