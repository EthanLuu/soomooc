import { Button, Form, Input, List, message as AntdMessage } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { User } from '@/type/user';
import styled from '@emotion/styled';

interface Message {
    user: User | undefined | null;
    content: String;
    time?: Date;
}

export const ChatRoom = () => {
    const socketUrl = process.env.SOCKET_URL || "https://socket.ethanloo.cn";
    const [socket, setSocket] = useState<typeof Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [form] = useForm();
    const { user } = useAuth();

    useEffect(() => {
        setSocket(io(socketUrl));
        return () => {
            socket?.close();
        };
        // eslint-disable-next-line
    }, [socketUrl]);

    useEffect(() => {
        if (!socket) return;
        socket.on("connect", () => {
            console.log("connected");
            socket.emit("join", user?.username);
        });
        socket.on("connect_error", (error: any) => {
            console.log(error);
            socket.close();
        });
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
        socket.on("reconnect", function () {
            console.log("reconnect");
        });
        socket.on("msgToClient", (message: Message) => {
            if (!user) {
                AntdMessage.error("请登录后尝试发送消息");
                return;
            }
            setMessages((messages) => [...messages, message]);
        });
    }, [socket, user]);

    const sendMessage = (values: { content: string }) => {
        const message = {
            user,
            content: values.content
        };
        if (socket) {
            socket.emit("msgToServer", message);
        }
        form.resetFields();
    };

    const handleEnter: React.KeyboardEventHandler<HTMLTextAreaElement> = (
        e
    ) => {
        const message = {
            user,
            content: e.currentTarget.value
        };
        if (socket) {
            socket.emit("msgToServer", message);
        }
        form.resetFields();
    };

    return (
        <Container>
            <List
                id={"box"}
                itemLayout="horizontal"
                dataSource={messages}
                style={{ height: "100%", border: "1px solid #ddd" }}
                locale={{ emptyText: "暂无消息" }}
                renderItem={(message: Message) => (
                    <List.Item
                        style={{
                            paddingLeft: "1rem"
                        }}
                    >
                        <List.Item.Meta
                            style={{ whiteSpace: "nowrap" }}
                            title={<a href="/">{message.user?.username}</a>}
                            description={<p>{message.content}</p>}
                        />
                    </List.Item>
                )}
            />

            <Form form={form} onFinish={sendMessage}>
                <InputContainer>
                    <Form.Item name={"content"} style={{ margin: 0, flex: 3 }}>
                        <Input.TextArea
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            placeholder={"有什么要和大家分享的吗"}
                            onPressEnter={handleEnter}
                            autoFocus={true}
                        />
                    </Form.Item>
                    <div style={{ flex: 1 }}>
                        <Button
                            htmlType={"submit"}
                            style={{ height: "100%", width: "100%" }}
                            type={"primary"}
                        >
                            发送
                        </Button>
                    </div>
                </InputContainer>
            </Form>
        </Container>
    );
};

const Container = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const InputContainer = styled.div`
    display: flex;
`;
