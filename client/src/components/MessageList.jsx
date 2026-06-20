import React, { useEffect, useRef, useContext } from "react";
import '../styles/Components.css';
import { AuthContext } from "../context/AuthContext";

export default function MessageList({ messages }) {
    const { user: currentUser } = useContext(AuthContext)
    const messagesEndRef = useRef(null)
    const wrapperRef = useRef(null)
    const prevLengthRef = useRef(messages.length)

    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return
        const isAtBottom =
            Math.abs(
                wrapper.scrollHeight -
                wrapper.scrollTop -
                wrapper.clientHeight
            ) < 5
        if (
            messages.length > prevLengthRef.current &&
            isAtBottom
        ) {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            })
        }
        prevLengthRef.current = messages.length
    }, [messages])

    if (!messages?.length) {
        return <p className="text-muted">No messages yet.</p>;
    }
    return (
        <div className="messages-wrapper" ref={wrapperRef}>
            {messages.map((msg, idx) => {
                const isSelf = currentUser?._id === msg.sender?._id
                return (
                    <div key={msg._id || idx} className={`message-row ${isSelf ? 'self-row' : 'other-row'}`}>
                        <div className="message-meta">
                            <span className="message-sender">{msg.sender?.username ?? 'Unknown'}</span>
                            <span className="message-timestamp">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            </span>
                        </div>
                        <div className={`message-item ${isSelf ? 'self' : 'other'}`}>
                            <span className="message-content">{msg.content}</span>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}