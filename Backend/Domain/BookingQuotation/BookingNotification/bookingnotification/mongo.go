package bookingnotification

import (
    "context"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var notificationCollection *mongo.Collection

func ConnectMongo() {
    client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://notary-mongo:27017"))
    if err != nil {
        log.Fatal("Error creating MongoDB client:", err)
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    err = client.Connect(ctx)
    if err != nil {
        log.Fatal("Error connecting to MongoDB:", err)
    }

    notificationCollection = client.Database("bookingdb").Collection("notifications")
}
