import { useRef } from 'react'
import useFocusNavigation from '../../hooks/useFocusNavigation.js'

function FocusGroup({ children, orientation = 'vertical', className = '', onBack }) {
  const groupRef = useRef(null)
  useFocusNavigation(groupRef, { orientation, onBack })

  return (
    <div ref={groupRef} data-focus-group={orientation} className={className}>
      {children}
    </div>
  )
}

export default FocusGroup
