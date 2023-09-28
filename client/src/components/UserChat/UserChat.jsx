import PropTypes from 'prop-types';
import { Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';

import useRecipient from '../../hooks/useRecipient';
import avatar from '../../assets/imgs/avatar.svg';
import { unreadNotications } from '../../utils/unreadNotications';
import { chatSlice } from '../../redux/slices'
import { baseUrl, getRequest } from '../../utils/httpRequests';

function UserChat({ chat, user, newMessage }) {
    const dispatch = useDispatch()
    const userChats = useSelector((state) => state.userChats);

    const [latestMessage, setLatestMessage] = useState(null)

    const { recipientUser } = useRecipient(chat, user);

    const unreadNotis = unreadNotications(userChats.info.notifications)
    const thisUserNotifications = unreadNotis?.filter(notification => notification.senderId === recipientUser?.at(0)?._id )

    const isOnline = userChats.info.onlineUsers?.some((user) => user?.userId === recipientUser?.at(0)?._id )

    const markThisUserNotificationsAsRead = (thisUserNotifications, notifications) => {
        if(thisUserNotifications?.length > 0) {
            const mNotifications = notifications.map(element => {
                let notification = element
    
                thisUserNotifications?.forEach(thisNoti => {
                    if(thisNoti.senderId === element.senderId) {
                        notification = { ...thisNoti, isRead: true }
                    }
                })
    
                return notification
            })
    
            dispatch(chatSlice.actions.updateNotifications(mNotifications))
        }
    }

    const truncateText = (text) => {
        let sortedText = text.substring(0, 20)

        if(text.length > 20) {
            sortedText = sortedText + '...'
        }

        return sortedText
    }

    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(`${baseUrl}/message/${chat._id}`);

            if(response.error) {
                return console.log(response.error)
            }

            const lastMessage = response[response?.length - 1]

            setLatestMessage(lastMessage)
        }

        getMessages();
    }, [newMessage, userChats.info.notifications])

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
            onClick={() => markThisUserNotificationsAsRead(thisUserNotifications, userChats.info.notifications)}
        >
            <div className="d-flex">
                <img src={avatar} style={{ display: 'block', height: '35px' }} />
                <div className="text-content">
                    <div className="name">{recipientUser?.at(0)?.name}</div>
                    <div className="text">{latestMessage?.text && (
                        <span>{truncateText(latestMessage?.text)}</span>
                    )}</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
                <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
                    {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ''}
                </div>
                <span className={isOnline ? "user-online" : ""}></span>
            </div>
        </Stack>
    );
}

UserChat.propTypes = {
    chat: PropTypes.object,
    user: PropTypes.object,
    newMessage: PropTypes.object,
};

export default UserChat;
