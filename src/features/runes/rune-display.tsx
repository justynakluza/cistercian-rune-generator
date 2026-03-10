import { useRuneDisplayForm } from './hooks'
import { RuneDisplayView } from './components'

export const RuneDisplay = () => {
  const runeDisplayProps = useRuneDisplayForm()

  return <RuneDisplayView {...runeDisplayProps} />
}
