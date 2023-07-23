import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import { baseUrl, getRequest, postRequest } from '../../utils/httpRequests';

function ChatBox({ messages, addMessage }) {
    const userInfo = useSelector((state) => state.userInfo);
    const userChats = useSelector((state) => state.userChats);
    // const { recipientUser } = useRecipient(userChats.info.currentChat, userInfo.info);
    const [recipientUser, setRecipientUser] = useState(null);
    const [textMessage, setTextMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const recipientId = userChats.info.currentChat?.members?.find((id) => id !== userInfo.info?._id);

    const sendMessage = async (senderId, currentChatId) => {
        if (!textMessage) {
            return console.log('You must type something...');
        }

        const response = await postRequest(
            `${baseUrl}/message`,
            JSON.stringify({
                chatId: currentChatId,
                senderId,
                text: textMessage,
            }),
        );

        setNewMessage(response);
        setTextMessage('');
        addMessage(response);
    };

    useEffect(() => {
        const getUser = async () => {
            const response = await getRequest(`${baseUrl}/api/find/${recipientId}`);
            setRecipientUser(response);
        };

        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo, userChats]);

    if (!recipientUser) {
        return <p style={{ textAlign: 'center', width: '100%' }}>No conversation selected yet</p>;
    }

    if (messages?.isMegssageLoading) {
        return <p style={{ textAlign: 'center', width: '100%' }}>Loading messages....</p>;
    }

    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{recipientUser[0]?.name}</strong>
            </div>
            <Stack gap={3} className="messages">
                {messages &&
                    messages.info?.map((message, index) => (
                        <Stack
                            key={index}
                            className={
                                message?.senderId === userInfo.info?._id
                                    ? 'message self align-self-end flex-grow-0'
                                    : 'message align-self-start flex-grow-0'
                            }
                        >
                            <span>{message.text}</span>
                            <span className="message-footer">{moment(message.createAt).calendar()}</span>
                        </Stack>
                    ))}
            </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmoji
                    value={textMessage}
                    onChange={setTextMessage}
                    fontFamily="nunito"
                    borderColor="rgba(72, 112, 223, 0.2)"
                />
                <button
                    className="send-btn"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onClick={() => {
                        sendMessage(userInfo.info?._id, userChats.info?.currentChat?._id);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-send"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg>
                </button>
            </Stack>
        </Stack>
    );
}

ChatBox.propTypes = {
    messages: PropTypes.object,
    addMessage: PropTypes.func,
};

export default ChatBox;