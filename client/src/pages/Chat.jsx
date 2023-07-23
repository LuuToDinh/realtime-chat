// import PropTypes from 'prop-types';
import { Container, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import UserChat from '../components/UserChat/UserChat';
import PotentialUserChats from '../components/UserChat/PotentialUserChat';
import { chatSlice } from '../redux/slices';
import { useState } from 'react';
import { baseUrl, getRequest } from '../utils/httpRequests';
import ChatBox from '../components/UserChat/ChatBox';

function Chat() {
    const [messages, setMessages] = useState({
        isMegssageLoading: false,
        info: [],
    });

    const userChats = useSelector((state) => state.userChats);
    const userInfo = useSelector((state) => state.userInfo);

    const dispatch = useDispatch();

    const handleGetCurrentMessages = async (chatId) => {
        setMessages((pre) => ({ ...pre, isMegssageLoading: true }));
        const response = await getRequest(`${baseUrl}/message/${chatId}`);
        setMessages({ isMegssageLoading: false, info: response });
    };

    const addMessage = (message) => {
        setMessages((pre) => {
            return {
                isMegssageLoading: false,
                info: [...pre.info, message],
            };
        });
    };

    return (
        <Container>
            <PotentialUserChats />
            {userChats.info?.userChats?.length > 0 && (
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {userChats?.status.info === 'pending' && <p>Loading chat...</p>}
                        {userChats?.info?.userChats.map((chat, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        dispatch(chatSlice.actions.updateCurrentChat(chat));
                                        handleGetCurrentMessages(chat._id);
                                    }}
                                >
                                    <UserChat chat={chat} user={userInfo.info} />
                                </div>
                            );
                        })}
                    </Stack>
                    <ChatBox messages={messages} addMessage={addMessage} />
                </Stack>
            )}
        </Container>
    );
}

export default Chat;
