import styled from '@emotion/styled'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from 'utils/http'

interface MenuItemProp {
  _id: number
  direction: string
  types: string[]
}

export const SideMenu: React.FC = () => {
  const { SubMenu } = Menu
  const [menuItems, setMenuItems] = useState<MenuItemProp[]>([])
  const client = useHttp()
  useEffect(() => {
    client('menu/menus').then((MenuItems: MenuItemProp[]) => {
      setMenuItems(MenuItems)
    })
  }, [client])

  const renderMenu = (items: MenuItemProp[]) => {
    return items.map((item) => {
      return (
        <SubMenu
          key={item._id}
          title={`${item.direction}：${item.types.join(' / ')}`}
          style={{ flex: 'auto' }}
        >
          {item.types.map((type) => (
            <Menu.Item key={type}>
              <Link to={`/search?t=${type}`}>{type}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      )
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
