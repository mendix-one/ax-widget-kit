import { type ReactElement, useEffect, useRef, useState } from 'react'

import { cn } from '@ax/shared'

interface ChatMessage {
  id: number
  role: 'user' | 'agent'
  text: string
  time: string
}

interface AgentChatProps {
  title?: string
  welcomeMessage?: string
  onSendMessage?: (text: string) => void
}

const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const sampleMessages: ChatMessage[] = [
  { id: 1, role: 'agent', text: "Hi! I'm your aPlanner assistant. How can I help you today?", time: '09:00' },
  { id: 2, role: 'user', text: 'What is the current yield on Line 3?', time: '09:01' },
  {
    id: 3,
    role: 'agent',
    text: "Line 3 is currently running at 87.2% yield, which is below the 90% target. The drop started approximately 4 hours ago. I've identified a potential correlation with the CMP tool calibration drift on CMP-04. Would you like me to generate a detailed root cause analysis?",
    time: '09:01',
  },
  { id: 4, role: 'user', text: 'Yes, please generate the analysis and also check if any lots are affected.', time: '09:02' },
  {
    id: 5,
    role: 'agent',
    text: "I've initiated the root cause analysis. Here's what I found so far:\n\n1. CMP-04 removal rate variance increased by 12% since last calibration\n2. 3 lots currently in process may be affected: W-4821, W-4822, W-4825\n3. Lot W-4821 has already been flagged and placed on hold\n\nI recommend scheduling immediate calibration for CMP-04 and reviewing the other two lots at the next measurement step.",
    time: '09:03',
  },
]

export function AgentChat({ title = 'AI Assistant', welcomeMessage, onSendMessage }: AgentChatProps): ReactElement {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (welcomeMessage) {
      return [{ id: 1, role: 'agent', text: welcomeMessage, time: timestamp() }]
    }
    return sampleMessages
  })
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    const userMsg: ChatMessage = { id: Date.now(), role: 'user', text, time: timestamp() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    onSendMessage?.(text)

    // Simulate agent reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'agent',
          text: "Thanks for your message. I'm analyzing your production data — I'll have an answer shortly.",
          time: timestamp(),
        },
      ])
    }, 800)
  }

  return (
    <div className="ax-agent-chat">
      {/* Header */}
      <div className="ax-agent-chat-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3f51b5">
          <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z" />
        </svg>
        <span className="ax-agent-chat-title">{title}</span>
      </div>

      {/* Messages */}
      <div className="ax-agent-chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={cn('ax-agent-chat-msg', `ax-agent-chat-msg--${msg.role}`)}>
            <div className="ax-agent-chat-msg-row">
              {msg.role === 'agent' && <span className="ax-agent-chat-avatar">AI</span>}
              <div className={cn('ax-agent-chat-bubble', `ax-agent-chat-bubble--${msg.role}`)}>
                {msg.text}
              </div>
            </div>
            <div className={cn('ax-agent-chat-time', `ax-agent-chat-time--${msg.role}`)}>{msg.time}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="ax-agent-chat-input">
        <input
          className="ax-agent-chat-field"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <button
          className="ax-agent-chat-send"
          onClick={handleSend}
          disabled={!input.trim()}
          type="button"
          aria-label="Send"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
