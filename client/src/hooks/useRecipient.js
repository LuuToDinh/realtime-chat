import { useEffect, useState } from 'react';

import { getRequest, baseUrl } from '../utils/httpRequests';
import { chatSlice } from '../redux/slices'
import { useDispatch } from 'react-redux';

export default function useRecipient(chat, user) {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState();

    const recipientId = chat?.members?.find((id) => id !== user?._id);
    const dispatch = useDispatch()

    useEffect(() => {
        const getUser = async () => {
            const response = await getRequest(`${baseUrl}/api/find/${recipientId}`);

            if (response.error) {
                setError(response);
            }

            setRecipientUser(response);
            dispatch(chatSlice.actions.getAllUsers(response[0]))
        };

        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { recipientUser, error };
}
