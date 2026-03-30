import { ReactElement } from 'react'
import { HelloWorldSample } from './components/HelloWorldSample'

import { AXWidgetKitContainerProps } from '../typings/AXWidgetKitProps'

import './ui/AXWidgetKit.css'

export function AXWidgetKit({ sampleText }: AXWidgetKitContainerProps): ReactElement {
  return <HelloWorldSample sampleText={sampleText ? sampleText : 'World'} />
}
