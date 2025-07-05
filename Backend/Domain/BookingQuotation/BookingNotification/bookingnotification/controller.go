package bookingnotification

import (
    "context"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
)

// @Summary Create notification
// @Tags Notifications
// @Accept json
// @Produce json
// @Param notification body Notification true "Notification data"
// @Success 200 {object} bookingnotification.NotificationResponse
// @Failure 400 {object} bookingnotification.NotificationResponse
// @Failure 500 {object} bookingnotification.NotificationResponse
// @Router /notifications [post]
func CreateNotification(c *gin.Context) {
    var notif Notification
    if err := c.ShouldBindJSON(&notif); err != nil {
        c.JSON(http.StatusBadRequest, NotificationResponse{Message: err.Error()})
        return
    }

    notif.CreatedAt = time.Now()

    _, err := notificationCollection.InsertOne(context.Background(), notif)
    if err != nil {
        c.JSON(http.StatusInternalServerError, NotificationResponse{Message: "Error saving notification"})
        return
    }

    c.JSON(http.StatusOK, NotificationResponse{Message: "Notification stored successfully"})
}

// @Summary Get all notifications
// @Tags Notifications
// @Produce json
// @Success 200 {array} bookingnotification.NotificationResponse
// @Router /notifications [get]
func GetAllNotifications(c *gin.Context) {
    cursor, err := notificationCollection.Find(context.Background(), map[string]interface{}{})
    if err != nil {
        c.JSON(http.StatusInternalServerError, NotificationResponse{Message: "Error fetching notifications"})
        return
    }
    defer cursor.Close(context.Background())

    var notifs []Notification
    for cursor.Next(context.Background()) {
        var n Notification
        if err := cursor.Decode(&n); err != nil {
            continue
        }
        notifs = append(notifs, n)
    }

    // Convert to response objects
    var responses []NotificationResponse
    for _, n := range notifs {
        responses = append(responses, NotificationResponse{
            ID:        n.ID,
            BookingID: n.BookingID,
            Message:   n.Message,
            CreatedAt: n.CreatedAt.Format(time.RFC3339),
        })
    }

    c.JSON(http.StatusOK, responses)
}
