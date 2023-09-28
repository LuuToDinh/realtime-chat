import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { unreadNotications } from "../../utils/unreadNotications";
import { chatSlice } from '../../redux/slices'

function Notification() {
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    const userChats = useSelector((state) => state.userChats);
    const userInfo = useSelector((state) => state.userInfo);

    const unreadNotis = unreadNotications(userChats.info.notifications)
    const modifiedNotifications = userChats.info.notifications.map(notification => {
        const sender = userChats.info.allUsers.find(user => user._id === notification.senderId)

        return {
            ...notification,
            senderName: sender?.name,
        }
    })

    console.log({unreadNotis})
    console.log({modifiedNotifications})
    console.log(userChats)

    const markAllNotificationsAsRead = useCallback(() => {
        const mNotifications = userChats.info.notifications.map(notification => {
            return {
                ...notification,
                isRead: true
            }
        })

        dispatch(chatSlice.actions.updateNotifications(mNotifications))
    }, [userChats])

    const markNotificationAsRead = (currentNoti, userChats, user, notifications) => {
        console.log({currentNoti, userChats, user, notifications})
        // Find chat and open when clicking notification
        const desiredChat = userChats.find(chat => {
            const chatMembers = [user._id, currentNoti.senderId]
            const isDesiredChat = chat?.members.every(member => chatMembers.includes(member))

            return isDesiredChat
        })

        // Mark notification as read
        const mNotifications = notifications.map(el => {
            if(currentNoti.senderId === el.senderId) {
                return { ...el, isRead: true }
            } else {
                return el
            }
        })

        console.log(desiredChat)

        // Handle go to chat desired chat room
        dispatch(chatSlice.actions.updateDesiredChatByNoti({ chat: desiredChat, notifications: mNotifications }))
        setIsOpen(false)
    }
    
    return (
        <div className="notifications">
            <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                </svg>
                {unreadNotis?.length > 0 && (<span className="notification-count">
                    <span>{unreadNotis?.length}</span>
                </span>)}
            </div>
            {isOpen && <div className="notifications-box">
                <div className="notifications-header">
                    <h3>Notifications</h3>
                    <div className="mark-as-read" onClick={markAllNotificationsAsRead}>
                        Mark all as read
                    </div>
                </div>
                {modifiedNotifications?.length === 0 ? <span>No notification yet...</span> : null}
                {modifiedNotifications && modifiedNotifications.map((notification, index) => {
                    return (
                        <div key={index} className={notification.isRead ? "notification" : "notification not-read"} onClick={() => markNotificationAsRead(notification, userChats.info.userChats, userInfo.info, userChats.info.notifications)}>
                            <span>{`${notification.senderName} sent to you a new message`}</span>
                            <span className="notification-time">{moment(notification.date).calendar()}</span>
                        </div>
                    )
                })}
            </div>}
        </div>
    );
}

export default Notification;