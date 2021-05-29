import { useHistory } from 'react-router'

export const useJumpTo = (url: string) => {
  const history = useHistory()
  return () => {
    history.push(url)
  }
}
