// bookingnotification/response.go
package bookingnotification

type NotificationResponse struct {
    ID        string `json:"id"`
    BookingID string `json:"booking_id"`
    Message   string `json:"message"`
    CreatedAt string `json:"created_at"`
}
