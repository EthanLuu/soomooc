import { BreadCrumb } from 'components/breadcrumb';
import { FullPageLoading } from 'components/lib';
import { RouteComponentProps } from 'react-router-dom';
import { useCourseById } from 'utils/course';
import styled from '@emotion/styled';
import { ChatRoom } from './chat-room';
import { LivePlayer } from './live-player';

export const LiveRoomScreen: React.FC<
    RouteComponentProps<{ courseId: string }>
> = (props) => {
    const courseId = props.match.params.courseId;
    const { data: course, loading } = useCourseById(courseId);
    const LiveStatus = course?.roomStatus;
    const liveSrc = `http://localhost:8080/live/${courseId}.flv`;

    if (loading) return <FullPageLoading />;
    return (
        <>
            <BreadCrumb />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "auto"
                }}
            >
                <h1>{course?.title}</h1>
                <Container>
                    <LivePlayer
                        url={liveSrc}
                        type="flv"
                        isLive={LiveStatus?.isLive || false}
                    />
                    <ChatRoom />
                </Container>
            </div>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    height: 60vh;
`;
