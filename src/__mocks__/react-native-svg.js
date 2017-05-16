import React from 'react'

export default function ({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

export const Rect = () => {
  return (
    <span>Rect</span>
  )
}

export const Path = () => {
  return (
    <span>Path</span>
  )
}
