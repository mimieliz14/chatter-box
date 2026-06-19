import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessagesByChannel, getChannelDetails, subscribeChannel, unsubscribeChannel } from "../services/authService"
import { AuthContext } from "../context/AuthContext";
import MessageList from "../components/MessageList"
import SendMessageForm from "../components/SendMessageForm"
import '../styles/Channel.css'


export default function Channel() {
     console.log("CHANNEL COMPONENT MOUNTED");
    const { channelId } = useParams()
    console.log("channelId", channelId);   
    const { user: currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [channel, setChannel] = useState(null)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState([])
    const [isMember, setIsMember] = useState(false)
    const [notFound, setNotFound] = useState(false)


    const fetchChannel = async () => {
        setLoading(true)
        setNotFound(false)
        try {
            const response = await getChannelDetails(channelId)
            if (!response.data?.data) {
                setNotFound(false)
                setChannel(null)
                return
            }
            setChannel(response.data.data)
            const members = response.data.data.members || []
            const membersId = members.map(m => m._id)
            setIsMember(Boolean(currentUser && membersId.includes(currentUser._id)))

        } catch (error) {
            if (error.response?.status === 404) {
                setNotFound(true);
                setChannel(null);
            } else {
                console.error(error);
                alert('Failed to load channel. Please try again later.');
            }

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (!currentUser) return
        fetchChannel()
    },
        [channelId, currentUser?._id]
    )

    const loadMessages = async () => {
        try {
            const response = await getMessagesByChannel(channelId)
            const msgs = response.data?.data || []
            if (Array.isArray(msgs)) {
                setMessage(msgs)
            } else {
                console.warn('API returned invalid messages, skipping update');
            }

        } catch (error) {
            console.error('Failed to load messages:', error);
        }

    }

    const handleJoin = async () => {
        try {
            await subscribeChannel(channelId)
            await fetchChannel()
            //await loadMessages()

        } catch (error) {
            console.error(error);
            alert('Failed to join the channel.');
        }
    }

    const handleLeave = async () => {
        try {
            await unsubscribeChannel(channelId)
            setIsMember(false)
            setMessage([])
            await fetchChannel()
        } catch (error) {
            console.error(error);
            alert('Failed to leave the channel.')
        }
    }

    useEffect(() => {
        if (!isMember) return
        loadMessages()
        const interval = setInterval(loadMessages, 3000)
        return () => { clearInterval(interval) }

    }, [isMember, channelId])


    return (
        <div className="channel-container">
            <div className="channel-header">
                <h2 className="channel-title">{channel?.name}</h2>
                <p className="channel-description">{channel?.description}</p>

                <div className="header-buttons">
                    <button className="back-button" onClick={() => navigate("/")}>Back</button>
                    {isMember && (
                        <button className="exit-button" onClick={handleLeave} >Unsuscribe</button>)}
                </div>
            </div>
            {!isMember ? (
                <button className="join-button" onClick={handleJoin}>Subscribe</button>
            ) : (
                <>
                    <MessageList messages={message || []} />

                    <div className="send-form">
                        <SendMessageForm channelId={channelId}
                            onNewMessage={message => setMessage(prev => [...prev, message])} />
                    </div>

                </>

            )}
        </div>


    )
}