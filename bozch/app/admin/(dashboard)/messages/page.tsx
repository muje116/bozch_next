"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trash2, Mail, MailOpen, Eye } from "lucide-react"
import type { ContactSubmission } from "@/lib/db"

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null)

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/contact-submissions")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: isRead }),
      })
      if (response.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchMessages()
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
      }
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  const openMessage = (message: ContactSubmission) => {
    setSelectedMessage(message)
    if (!message.is_read) {
      handleMarkAsRead(message.id, true)
    }
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <div>
      <AdminHeader title="Messages" description={`${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`} />

      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No messages yet. Messages from your contact form will appear here.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${!message.is_read ? "border-primary/50 bg-primary/5" : ""}`}
                onClick={() => openMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${!message.is_read ? "bg-primary/10" : "bg-muted"}`}
                    >
                      {!message.is_read ? (
                        <Mail className="h-5 w-5 text-primary" />
                      ) : (
                        <MailOpen className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${!message.is_read ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {message.name}
                        </span>
                        {!message.is_read && <Badge>New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                      <p className={`text-sm mt-1 truncate ${!message.is_read ? "font-medium" : ""}`}>
                        {message.subject || "No subject"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openMessage(message)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedMessage?.subject || "No subject"}</DialogTitle>
              <DialogDescription>
                From {selectedMessage?.name} ({selectedMessage?.email})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Received: {selectedMessage && new Date(selectedMessage.created_at).toLocaleString()}
              </div>
              <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap">{selectedMessage?.message}</div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <a href={`mailto:${selectedMessage?.email}`}>Reply via Email</a>
                </Button>
                <Button variant="destructive" onClick={() => selectedMessage && handleDelete(selectedMessage.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
