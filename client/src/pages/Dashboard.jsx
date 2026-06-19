import React, { useState, useEffect } from "react";
import ChannelList from '../components/ChannelList';
import MessageList from "../components/MessageList";
import SendMessageForm from "../components/SendMessageForm";
import { getMessagesByChannel, subscribeChannel } from "../services/authService";

export default function Dashboard() {
  const [activeChannel, setActiveChannel] = useState(null);
  const [messagesList, setMessagesList] = useState([]);

  // 1. Efecto automático para unirse al canal y traer el historial
  useEffect(() => {
    if (!activeChannel) return;

    const setupChannel = async () => {
      try {
        const channelId = activeChannel._id || activeChannel.id;
        
        // Unirse al canal de forma automática (Evita error 403)
        try {
          await subscribeChannel(channelId);
        } catch (subError) {
          console.log("Suscripción activa o automática realizada.");
        }

        // Cargar los mensajes guardados en el Backend
        const response = await getMessagesByChannel(channelId);
        const rawMessages = response.data?.data || response.data?.messages || response.data;
        
        // Escudo de seguridad anti-errores de iteración
        if (Array.isArray(rawMessages)) {
          setMessagesList(rawMessages);
        } else {
          setMessagesList([]);
        }

      } catch (error) {
        console.error("Error al inicializar canal:", error);
        setMessagesList([]); // Mantenemos el array a salvo en caso de desconexión
      }
    };

    setupChannel();
  }, [activeChannel]);

  // 2. Función que recibe el mensaje nuevo enviado por el formulario hijo
  const handleIncomingMessage = (newMsg) => {
    setMessagesList((prevMessages) => {
      // Si por alguna razón el estado se corrompe, lo sanamos inmediatamente
      if (!Array.isArray(prevMessages)) {
        return [newMsg];
      }
      return [...prevMessages, newMsg];
    });
  };

  // Obtenemos el ID limpio del canal activo
  const activeChannelId = activeChannel ? (activeChannel._id || activeChannel.id) : null;

  return (
    <div className="dashboard-container">
      {/* Barra de canales públicos */}
      <aside className="dashboard-sidebar">
        <ChannelList onSelectChannel={setActiveChannel} activeChannel={activeChannel} />
      </aside>

      {/* Ventana de Conversación */}
      <main className="dashboard-chat-window">
        {activeChannel ? (
          <div className="chat-content">
            <div className="chat-header">
              <h2># {activeChannel.name}</h2>
              <p className="channel-description">
                {activeChannel.description || "No description provided."}
              </p>
            </div>

            {/* 📜 COMPONENTE HIJO: Lista los mensajes en pantalla de forma dinámica */}
            <MessageList messages={messagesList || []} />

            {/* 📝 COMPONENTE HIJO: Formulario de envío de mensajes conectado a Axios */}
            <div className="send-form">
              <SendMessageForm 
                channelId={activeChannelId}
                onNewMessage={handleIncomingMessage} 
              />
            </div>

          </div>
        ) : (
          <div className="no-channel-selected">
            <div className="welcome-box">
              <h3>👋 Welcome to ChatterBox!</h3>
              <p>Select a public channel from the sidebar to start chatting with your team.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}