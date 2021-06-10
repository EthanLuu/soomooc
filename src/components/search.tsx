import { Input } from 'antd'
import { useState } from 'react'
import { useSearchCourse } from 'utils'

export const Search = ({ placeholder }: { placeholder: string }) => {
  const [key, setKey] = useState('')
  const handleSearch = useSearchCourse({ w: key })
  return (
    <Input.Search
      placeholder={placeholder}
      style={{ width: 250, padding: '0 2rem' }}
      onSearch={handleSearch}
      onChange={(e) => setKey(e.target.value)}
    />
  )
}
