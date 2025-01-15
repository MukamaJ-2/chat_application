import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/')
        return
      }
      setUser(user)
    }
    checkAuth()
    fetchMessages()

    const channel = supabase
      .channel('messages')
      .on('INSERT', (payload) => {
        setMessages(current => [...current, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [navigate])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })

    if (!error) setMessages(data)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    await supabase
      .from('messages')
      .insert([
        {
          content: newMessage,
          user_id: user.id,
          username: user.email
        }
      ])

    setNewMessage('')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="chat-container">
      <header>
        <h2>Chat</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      
      <div className="messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.user_id === user?.id ? 'sent' : 'received'}`}
          >
            <strong>{message.username}:</strong> {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Send a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat