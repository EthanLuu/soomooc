import { Carousel as AntCarousel } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CourseProps } from 'type/course';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';

export const Carousel: React.FC = () => {
    const client = useHttp();
    const [courses, setCourses] = useState<CourseProps[]>([]);

    useEffect(() => {
        client("course/courses").then((courses: CourseProps[]) => {
            setCourses(courses.slice(0, 4));
        });
    }, [client]);

    return (
        <CarouselContainer autoplay effect={"fade"}>
            {courses.map((course) => (
                <div key={course._id}>
                    <Link to={`/course/${course._id}`}>
                        <CardContainer
                            style={{ backgroundImage: `url(${course.cover})` }}
                        ></CardContainer>
                    </Link>
                </div>
            ))}
        </CarouselContainer>
    );
};

const CardContainer = styled.div`
    height: 40rem;
    width: 100%;
    background-size: cover;
    background-position: center;
`;

const CarouselContainer = styled(AntCarousel)`
    height: 40rem;
`;
