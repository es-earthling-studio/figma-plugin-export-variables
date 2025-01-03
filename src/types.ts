import { EventHandler } from '@create-figma-plugin/utilities'

export interface ResizeWindowHandler extends EventHandler {
  name: 'RESIZE_WINDOW'
  handler: (windowSize: { width: number; height: number }) => void
}

export interface InsertCodeHandler extends EventHandler {
  name: 'INSERT_CODE'
  handler: (code: string) => void
}

export interface UiReady extends EventHandler {
  name: 'UI_READY'
  handler: () => void
}

export type NamingConvetionType = 'dot' | 'camel' | 'kebab' | 'snake'
export type VariableType = Variable['resolvedType']
export type VariableColor = {r: number, b: number; g: number; a: number}