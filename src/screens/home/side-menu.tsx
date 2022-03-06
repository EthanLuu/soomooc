import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

interface MenuItemProp {
    _id: number;
    direction: string;
    types: string[];
}

export const SideMenu: React.FC<{ menuItems: MenuItemProp[] }> = ({
    menuItems
}) => {
    const { SubMenu } = Menu;

    const renderMenu = (items: MenuItemProp[]) => {
        return items.map((item) => {
            return (
                <SubMenu
                    key={item._id}
                    title={`${item.direction}：${item.types.join(" / ")}`}
                >
                    {item.types.map((type) => (
                        <Menu.Item key={type}>
                            <Link to={`/search?t=${type}`}>{type}</Link>
                        </Menu.Item>
                    ))}
                </SubMenu>
            );
        });
    };

    return (
        <MenuContainer mode="vertical">{renderMenu(menuItems)}</MenuContainer>
    );
};

const MenuContainer = styled(Menu)`
    display: flex;
    flex-direction: column;
    justify-items: space-around;
    height: 100%;
    padding: 1rem 0 0.5rem 1rem;
`;
