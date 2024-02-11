import { Col, Row } from 'antd';
import { FullPageLoading } from '@/components/lib';
import { useEffect, useState } from 'react';
import { Carousel } from '@/screens/home/carousel';
import { CourseProps } from '@/type/course';
import { MenuItemProp } from '@/type/menu';
import { useHttp } from '@/utils/http';
import styled from '@emotion/styled';
import { SideMenu } from './side-menu';

export const HomePage: React.FC = () => {
    const client = useHttp();
    const [courses, setCourses] = useState<CourseProps[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItemProp[]>([]);
    useEffect(() => {
        client("course/courses").then((courses: CourseProps[]) => {
            setCourses(courses.slice(0, 4));
        });
        client("menu/menus").then((MenuItems: MenuItemProp[]) => {
            setMenuItems(MenuItems);
        });
    }, [client]);
    return (
        <Container>
            {courses.length === 0 && menuItems.length === 0 ? (
                <FullPageLoading />
            ) : (
                <Banner>
                    <Col span={6}>
                        <SideMenu menuItems={menuItems} />
                    </Col>
                    <Col span={18}>
                        <Carousel courses={courses} />
                    </Col>
                </Banner>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex: auto;
`;

const Banner = styled(Row)`
    border-radius: 1rem;
    overflow: hidden;
    height: 40rem;
    max-width: 1200px;
    box-shadow: 0 1.9px 4px rgba(0, 0, 0, 0.044),
        0 4.6px 13.4px rgba(0, 0, 0, 0.066), 0 26px 60px rgba(0, 0, 0, 0.11);
`;
