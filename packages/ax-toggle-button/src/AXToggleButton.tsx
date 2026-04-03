import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { type AxEvent, AxThemeProvider, useWidgetEvents } from '@ax/shared'

import type { AXToggleButtonContainerProps } from '../typings/AXToggleButtonProps'

import { ToggleButtonProvider } from './main/context'
import { ToggleButton } from './main/ToggleButton'
import { ToggleButtonStore } from './main/store'

export function AXToggleButton(props: AXToggleButtonContainerProps): ReactElement {
  const [store] = useState(() => new ToggleButtonStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncValue(props.valueAttr?.value ?? '')
  }, [props.valueAttr?.value])

  useEffect(() => {
    store.setOptions(
      props.options.map((opt) => ({
        value: opt.optValue,
        label: opt.optLabel?.value ?? opt.optValue,
      })),
    )
  }, [props.options])

  useEffect(() => {
    store.setExclusive(props.exclusive)
  }, [props.exclusive])

  useEffect(() => {
    store.setColor(props.color)
  }, [props.color])

  useEffect(() => {
    store.setSize(props.size)
  }, [props.size])

  useEffect(() => {
    store.setOrientation(props.orientation)
  }, [props.orientation])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [props.disabled])

  useEffect(() => {
    store.setFullWidth(props.fullWidth)
  }, [props.fullWidth])

  // Sync callbacks
  useEffect(() => {
    store.onValueChange = (v: string) => props.valueAttr?.setValue(v)
    store.onChangeAction = props.onChange?.canExecute ? () => props.onChange!.execute() : undefined
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <AxThemeProvider>
      <ToggleButtonProvider store={store}>
        <ToggleButton />
      </ToggleButtonProvider>
    </AxThemeProvider>
  )
}
