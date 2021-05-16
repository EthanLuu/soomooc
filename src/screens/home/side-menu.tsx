import styled from '@emotion/styled'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useHttp } from 'utils/http'

interface MenuItemProp {
  id: number
  title: string
  subMenu?: MenuItemProp[]
}

export const SideMenu = () => {
  const { SubMenu } = Menu
  const [menuItems, setMenuItems] = useState<MenuItemProp[]>([])
  const client = useHttp()
  useEffect(() => {
    client('sideMenuList').then((MenuItems: MenuItemProp[]) => {
      setMenuItems(MenuItems)
    })
  }, [])

  const renderMenu = (items: MenuItemProp[]) => {
    return items.map((item) => {
      if (item.subMenu) {
        return (
          <SubMenu key={item.id} title={item.title} style={{ flex: 'auto' }}>
            {renderMenu(item.subMenu)}
          </SubMenu>
        )
      } else {
        return <Menu.Item key={item.id}>{item.title}</Menu.Item>
      }
    })
  }

  return <MenuContainer mode="vertical">{renderMenu(menuItems)}</MenuContainer>
}

const MenuContainer = styled(Menu)`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  height: 100%;
  padding: 1rem 0 0.5rem 1rem;
`
