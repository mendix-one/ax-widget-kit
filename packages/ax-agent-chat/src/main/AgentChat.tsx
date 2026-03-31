import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { type ReactElement, useEffect, useRef, useState } from 'react'

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
  {
    id: 4,
    role: 'user',
    text: 'Yes, please generate the analysis and also check if any lots are affected.',
    time: '09:02',
  },
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

  const canSend = input.trim().length > 0

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    const userMsg: ChatMessage = { id: Date.now(), role: 'user', text, time: timestamp() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    onSendMessage?.(text)

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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          minHeight: 48,
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderBottom: '2px solid',
          borderColor: 'divider',
        }}
      >
        <SmartToyIcon color="primary" sx={{ fontSize: 20 }} />
        <Typography variant="subtitle2" sx={{ flex: 1, ml: 0.5 }} noWrap>
          {title}
        </Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }}>
        {messages.map((msg) => {
          const isUser = msg.role === 'user'
          return (
            <Box key={msg.id} sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  maxWidth: '85%',
                  flexDirection: isUser ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                }}
              >
                {!isUser && (
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', flexShrink: 0, mt: 0.5 }}>
                    <SmartToyIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                )}
                <Box sx={{ minWidth: 0 }}>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: isUser ? 'primary.main' : 'background.paper',
                      color: isUser ? 'primary.contrastText' : 'text.primary',
                      border: !isUser ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {msg.text}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ mt: 0.5, display: 'block', textAlign: isUser ? 'right' : 'left', px: 0.5 }}
                  >
                    {msg.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
        <div ref={bottomRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          px: 1.5,
          py: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0.5,
          flexShrink: 0,
        }}
      >
        <TextField
          fullWidth
          size="small"
          multiline
          maxRows={4}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          sx={{ flex: 1, '& .MuiOutlinedInput-root': { py: 0.75, fontSize: 14 } }}
        />
        <IconButton size="small" onClick={handleSend} disabled={!canSend} sx={{ mb: 0.5 }}>
          <SendIcon fontSize="small" color={canSend ? 'primary' : 'disabled'} />
        </IconButton>
      </Box>
    </Box>
  )
}
