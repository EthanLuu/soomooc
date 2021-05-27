import { Input } from 'antd'

export const Search = ({ placeholder }: { placeholder: string }) => {
  const handleSearch = () => {}
  return (
    <Input.Search
      placeholder={placeholder}
      style={{ width: 250, padding: '0 2rem' }}
      onSearch={handleSearch}
    />
  )
}
