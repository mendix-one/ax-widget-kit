import type { ReactElement } from 'react'
import { HelloWorldSample } from './components/HelloWorldSample'

import type { AXWidgetKitContainerProps } from '../typings/AXWidgetKitProps'

import './ui/AXWidgetKit.scss'

export function AXWidgetKit({ sampleText }: AXWidgetKitContainerProps): ReactElement {
  return <HelloWorldSample sampleText={sampleText ? sampleText : 'World'} />
}
