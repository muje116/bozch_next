"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trash2, Mail, MailOpen, Eye, UserPlus } from "lucide-react"
import type { InterestSubmission } from "@/lib/db"
import { useToast } from "@/hooks/use-toast"

export default function InterestSubmissionsPage() {
  const [submissions, setSubmissions] = useState<InterestSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<InterestSubmission | null>(null)
  const { toast } = useToast()

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/interest-submissions")
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error("Error fetching interest submissions:", error)
      toast({
        title: "Error",
        description: "Failed to load interest submissions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/interest-submissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: isRead }),
      })
      if (response.ok) {
        fetchSubmissions()
        toast({
          title: "Success",
          description: isRead ? "Marked as read" : "Marked as unread",
        })
      }
    } catch (error) {
      console.error("Error updating submission:", error)
      toast({
        title: "Error",
        description: "Failed to update submission",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/interest-submissions/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchSubmissions()
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null)
        }
        toast({
          title: "Success",
          description: "Submission deleted successfully",
        })
      }
    } catch (error) {
      console.error("Error deleting submission:", error)
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive",
      })
    }
  }

  const openSubmission = (submission: InterestSubmission) => {
    setSelectedSubmission(submission)
    if (!submission.is_read) {
      handleMarkAsRead(submission.id, true)
    }
  }

  const unreadCount = submissions.filter((s) => !s.is_read).length

  return (
    <div>
      <AdminHeader
        title="Interest Submissions"
        description={`${unreadCount} unread submission${unreadCount !== 1 ? "s" : ""}`}
      />

      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No interest submissions yet. Submissions from your get-involved form will appear here.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {submissions.map((submission) => (
              <Card
                key={submission.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${!submission.is_read ? "border-primary/50 bg-primary/5" : ""}`}
                onClick={() => openSubmission(submission)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${!submission.is_read ? "bg-primary/10" : "bg-muted"}`}
                    >
                      {!submission.is_read ? (
                        <UserPlus className="h-5 w-5 text-primary" />
                      ) : (
                        <MailOpen className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${!submission.is_read ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {submission.name}
                        </span>
                        {!submission.is_read && <Badge>New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{submission.email}</p>
                      {submission.phone && (
                        <p className="text-sm text-muted-foreground truncate">Phone: {submission.phone}</p>
                      )}
                      <p className={`text-sm mt-1 truncate ${!submission.is_read ? "font-medium" : ""}`}>
                        Interest: {submission.interest}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(submission.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openSubmission(submission)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(submission.id)}
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

        <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Interest: {selectedSubmission?.interest}</DialogTitle>
              <DialogDescription>
                From {selectedSubmission?.name} ({selectedSubmission?.email})
                {selectedSubmission?.phone && ` - ${selectedSubmission.phone}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Received: {selectedSubmission && new Date(selectedSubmission.created_at).toLocaleString()}
              </div>
              <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap">{selectedSubmission?.message}</div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <a href={`mailto:${selectedSubmission?.email}`}>Reply via Email</a>
                </Button>
                <Button variant="destructive" onClick={() => selectedSubmission && handleDelete(selectedSubmission.id)}>
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

