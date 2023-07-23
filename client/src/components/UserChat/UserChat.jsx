import PropTypes from 'prop-types';
import { Stack } from 'react-bootstrap';

import useRecipient from '../../hooks/useRecipient';
import avatar from '../../assets/imgs/avatar.svg';

function UserChat({ chat, user }) {
    const { recipientUser } = useRecipient(chat, user);

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
        >
            <div className="d-flex">
                <img src={avatar} style={{ display: 'block', height: '35px' }} />
                <div className="text-content">
                    <div className="name">{recipientUser?.at(0)?.name}</div>
                    <div className="text">Text message</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">12/12/2022</div>
                <div className="this-user-notifications">2</div>
                <span className="user-online"></span>
            </div>
        </Stack>
    );
}

UserChat.propTypes = {
    chat: PropTypes.object,
    user: PropTypes.object,
};

export default UserChat;
