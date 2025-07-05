package main

import "CreateBooking/docs"

// @title Create Booking API
// @version 1.0
// @description API to create bookings using Go and SQL Server
// @host localhost:8086
// @BasePath /api
func init() {
    docs.SwaggerInfo.Title = "Create Booking API"
    docs.SwaggerInfo.Description = "API to create bookings using Go and SQL Server"
    docs.SwaggerInfo.Version = "1.0"
    docs.SwaggerInfo.Host = "localhost:8086"
    docs.SwaggerInfo.BasePath = "/api"
}
