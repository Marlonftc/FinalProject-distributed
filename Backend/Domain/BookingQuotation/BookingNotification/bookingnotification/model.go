package bookingnotification

import "time"

type Notification struct {
    ID         string    `json:"id" bson:"_id,omitempty"`
    BookingID  string    `json:"booking_id" bson:"booking_id"`
    Message    string    `json:"message" bson:"message"`
    CreatedAt  time.Time `json:"created_at" bson:"created_at"`
}
