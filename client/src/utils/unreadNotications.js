const unreadNotications = (notifications) => {
    return notifications.filter(notification => notification.isRead === false)
}

export { unreadNotications }