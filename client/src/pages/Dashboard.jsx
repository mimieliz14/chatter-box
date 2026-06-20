import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MessageList from "../components/MessageList";
import SendMessageForm from "../components/SendMessageForm";
import {
  getPublicChannels,
  getMessagesByChannel,
  subscribeChannel,
  createChannel
} from "../services/authService";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user: currentUser } = useContext(AuthContext);

  const [currentView, setCurrentView] = useState("explore");
  const [publicChannels, setPublicChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messagesList, setMessagesList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDesc, setNewChannelDesc] = useState("");

  const fetchChannelsData = async () => {
    try {
      const response = await getPublicChannels();
      const channels = response.data?.data || response.data || [];
      setPublicChannels(Array.isArray(channels) ? channels : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChannelsData();
  }, []);

  useEffect(() => {
    if (currentView !== "chat" || !activeChannel) return;

    const loadChatHistory = async () => {
      try {
        const channelId = activeChannel._id || activeChannel.id;
        const response = await getMessagesByChannel(channelId);
        const rawMessages = response.data?.data || response.data?.messages || response.data;
        setMessagesList(Array.isArray(rawMessages) ? rawMessages : []);
      } catch (error) {
        console.error(error);
        setMessagesList([]);
      }
    };

    loadChatHistory();
  }, [activeChannel, currentView]);

  const handleJoinChannel = async (channel) => {
    try {
      const channelId = channel._id || channel.id;
      await subscribeChannel(channelId);
      setActiveChannel(channel);
      setCurrentView("chat");
      fetchChannelsData();
    } catch (error) {
      console.error(error);
      alert("Could not join the channel.");
    }
  };

  const handleCreateChannelSubmit = async (e) => {
    e.preventDefault();
    if (!newChannelName.trim()) return;

    try {
      await createChannel({
        name: newChannelName,
        description: newChannelDesc
      });
      setShowModal(false);
      setNewChannelName("");
      setNewChannelDesc("");
      await fetchChannelsData();
    } catch (error) {
      console.error(error);
      alert("Failed to create the channel.");
    }
  };

  const myChannels = publicChannels.filter(ch => {
    const members = ch.members || [];
    return members.some(m => (m._id || m) === currentUser?._id);
  });

  return (
    <div className="dashboard-layout">

      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>ChatterBox</h2>
          <div className="user-badge" title={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>

        <div className="sidebar-menu">
          <div
            className={`menu-item ${currentView === "explore" ? "active" : ""}`}
            onClick={() => setCurrentView("explore")}
          >
            🌐 Explore channels
          </div>

          <div className="menu-section-title">My channels</div>
          {myChannels.length > 0 ? (
            myChannels.map((ch) => (
              <div
                key={ch._id || ch.id}
                className={`menu-item ${currentView === "chat" && activeChannel?._id === ch._id ? "active" : ""}`}
                onClick={() => {
                  setActiveChannel(ch);
                  setCurrentView("chat");
                }}
              >
                # {ch.name}
              </div>
            ))
          ) : (
            <p style={{ paddingLeft: "12px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              You haven't joined any channel yet.
            </p>
          )}
        </div>
      </aside>

      <main className="main-content">

        <header className="content-header">
          <h3>
            {currentView === "explore" ? "Explore channels" : `# ${activeChannel?.name}`}
          </h3>
          {currentView === "explore" && (
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              + Create channel
            </button>
          )}
        </header>

        <div className="view-container">

          {currentView === "explore" && (
            <div>
              <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                Join a public channel to start talking with your team.
              </p>
              <div className="channels-grid">
                {publicChannels.map((ch) => {
                  const isAlreadyMember = (ch.members || []).some(m => (m._id || m) === currentUser?._id);
                  return (
                    <div key={ch._id || ch.id} className="channel-explore-card">
                      <div className="channel-info">
                        <h4># {ch.name}</h4>
                        <p>{ch.description || "No description provided."}</p>
                      </div>
                      {isAlreadyMember ? (
                        <button
                          className="btn-secondary"
                          onClick={() => { setActiveChannel(ch); setCurrentView("chat"); }}
                        >
                          Open chat
                        </button>
                      ) : (
                        <button className="btn-primary" onClick={() => handleJoinChannel(ch)}>
                          Join
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentView === "chat" && activeChannel && (
            <div className="view-container">
              <div className="messages-wrapper">
                <MessageList messages={messagesList} />
              </div>
              <div className="chat-input-area">
                <SendMessageForm
                  channelId={activeChannel._id || activeChannel.id}
                  onNewMessage={(newMsg) => setMessagesList(prev => [...prev, newMsg])}
                />
              </div>
            </div>
          )}

        </div>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create a new channel</h3>
            <form onSubmit={handleCreateChannelSubmit}>
              <div className="form-group">
                <label>Channel name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. react-development"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="What is this channel about?"
                  value={newChannelDesc}
                  onChange={(e) => setNewChannelDesc(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}