import { Col, Row } from 'antd'
import { FullPageLoading } from '@/components/lib'
import { useEffect, useState } from 'react'
import { Carousel } from '@/screens/home/carousel'
import { CourseProps } from '@/type/course'
import { MenuItemProp } from '@/type/menu'
import { useHttp } from '@/utils/http'
import styled from '@emotion/styled'
import { SideMenu } from './side-menu'
import { SlideList } from './slide-list'

export const HomePage: React.FC = () => {
  const client = useHttp()
  const [loading, setLoading] = useState(false)
  const [carousels, setCarousels] = useState<CourseProps[]>([])
  const [menuItems, setMenuItems] = useState<MenuItemProp[]>([])
  const [editorChoices, setEditorChoices] = useState<CourseProps[]>([])

  const fetchHomeData = async () => {
    setLoading(true)
    await Promise.all([
      client('course/courses').then(courses => {
        setCarousels(courses.slice(0, 4))
        setEditorChoices(courses.slice(4, 12))
      }),
      client('menu/menus').then(items => setMenuItems(items)),
    ])
    setLoading(false)
  }

  useEffect(() => {
    fetchHomeData()
  }, [client])

  return (
    <Container>
      {loading ? (
        <FullPageLoading />
      ) : (
        <>
          <Banner>
            <Col span={6}>
              <SideMenu menuItems={menuItems} />
            </Col>
            <Col span={18}>
              <Carousel courses={carousels} />
            </Col>
          </Banner>
          <SlideList courses={editorChoices} />
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: auto;
  flex-direction: column;
  gap: 24px;
`

const Banner = styled(Row)`
  border-radius: 1rem;
  overflow: hidden;
  height: 36rem;
  max-width: 1200px;
  box-shadow: 0 1.9px 2px rgba(0, 0, 0, 0.044),
    0 0px 4px rgba(0, 0, 0, 0.066), 0 0px 10px rgba(0, 0, 0, 0.11);
`
