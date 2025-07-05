package main

import (
    "bookingnotification/bookingnotification"
    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
    _ "bookingnotification/docs"
)


func main() {
    r := gin.Default()

    bookingnotification.ConnectMongo()

    api := r.Group("/api")
    {
        api.POST("/notifications", bookingnotification.CreateNotification)
        api.GET("/notifications", bookingnotification.GetAllNotifications)
    }

    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
    r.Run(":8092")
}
