import { Input } from 'antd'
import { useHistory } from 'react-router'

export const Search = ({ placeholder }: { placeholder: string }) => {
  const history = useHistory()
  const handleSearch = (keywords: string) => {
    history.push({
      pathname: '/search',
      search: `?w=${keywords}`,
    })
  }
  return (
    <Input.Search
      placeholder={placeholder}
      style={{ width: 250, padding: '0 2rem' }}
      onSearch={handleSearch}
    />
  )
}
