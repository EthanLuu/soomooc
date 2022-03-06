import { Carousel as AntCarousel } from 'antd';
import { Link } from 'react-router-dom';
import { CourseProps } from 'type/course';
import styled from '@emotion/styled';

export const Carousel: React.FC<{ courses: CourseProps[] }> = ({ courses }) => {
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
