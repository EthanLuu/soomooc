import { Input } from 'antd'

export const Search: React.FC = () => {
  const handleSearch = () => {}
  return (
    <Input.Search
      placeholder={"搜索课程"}
      style={{ width: 250, paddingRight: '3rem' }}
      onSearch={handleSearch}
    />
  )
}
