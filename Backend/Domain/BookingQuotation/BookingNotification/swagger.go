package main

import "bookingnotification/docs"

// @title Booking Notification API
// @version 1.0
// @description Microservicio para notificar eventos de reservas
// @host localhost:8092
// @BasePath /api
func init() {
	docs.SwaggerInfo.Title = "Booking Notification API"
	docs.SwaggerInfo.Description = "Microservicio para notificar eventos de reservas"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "localhost:8092"
	docs.SwaggerInfo.BasePath = "/api"
}

