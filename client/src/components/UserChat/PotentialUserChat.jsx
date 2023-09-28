import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPotentialUserChats, createUserChat } from '../../redux/slices/chatSlice';

function PotentialUserChats() {
    const dispatch = useDispatch();

    const isDispatched = useRef(false);

    const userInfo = useSelector((state) => state.userInfo);
    const userChats = useSelector((state) => state.userChats);

    const handleCreateUserChat = (firstId, secondId, indexRemove) => {
        dispatch(createUserChat({ firstId, secondId, indexRemove }));
    };

    useEffect(() => {
        if (!isDispatched.current && userInfo?.info?._id && userChats?.info?.userChats?.length > 0) {
            isDispatched.current = true;
            dispatch(getPotentialUserChats({ user: userInfo.info, userChats: userChats.info.userChats }));
        }
    }, [userChats]);

    const potentialUserChats = userChats?.info?.potentialUserChats;

    return (
        <div className="all-users">
            {potentialUserChats?.map((user, index) => (
                <div
                    className="single-user"
                    key={index}
                    onClick={() => handleCreateUserChat(userInfo.info._id, user._id, index)}
                >
                    {user.name}
                    <span className={userChats.info.onlineUsers?.some((onlineUser) => onlineUser?.userId === user._id ) ? "user-online" : ""}></span>
                </div>
            ))}
        </div>
    );
}

export default PotentialUserChats;
