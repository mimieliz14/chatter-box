import React, { useState } from "react";
import { createMessage } from "../services/authService"
import '../styles/Components.css'

export default function SendMessageForm({ channelId, onNewMessage }) {

    const [content, setContent] = useState('')
    const [sending, setSending] = useState(false)

    const send = async (e) => {
        e.preventDefault()
        if (!content.trim()) return
        setSending(true)
        try {
            const response = await createMessage(channelId, { content: content.trim() });
            const newMessage = response?.data?.data
            if (newMessage) {
                onNewMessage?.(newMessage)
                setContent("")
            } else {
                console.warn('API returned empty message');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Failed to send message.');

        } finally {
            setSending(false)
        }
    }
    return (
        <form className="send-form" onSubmit={send}>
            <input
                className="send-input"
                placeholder="Type a message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={sending}
                required
            />
            <button className="send-button" type="submit" disabled={sending || !content.trim()}>
                {sending ? 'Sending...' : 'Send'}
            </button>
        </form>
    )
}