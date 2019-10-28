import React from 'react'

export default function ({ children }) {
  return <div>{children}</div>
}

export const Rect = props => {
  return <span>Rect: {JSON.stringify(props)}</span>
}

export const Path = props => {
  return <span>Path: {JSON.stringify(props)}</span>
}

export const G = ({ children, ...props }) => {
  return (
    <span>
      G: {JSON.stringify(props)}
      children: {children}
    </span>
  )
}

export const Defs = ({ children, ...props }) => {
  return (
    <span>
      Defs: {JSON.stringify(props)}
      children: {children}
    </span>
  )
}

export const Image = props => {
  return <span>Image: {JSON.stringify(props)}</span>
}

export const ClipPath = ({ children, ...props }) => {
  return (
    <span>
      ClipPath: {JSON.stringify(props)}
      children: {children}
    </span>
  )
}

export const LinearGradient = ({ children, ...props }) => {
  return (
    <span>
      LinearGradient: {JSON.stringify(props)}
      children: {children}
    </span>
  )
}

export const Stop = props => {
  return <span>Stop: {JSON.stringify(props)}</span>
}
