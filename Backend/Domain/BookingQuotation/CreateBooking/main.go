// Backend/Domain/BookingQuotation/CreateBooking/main.go
package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/denisenkom/go-mssqldb"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	docs "CreateBooking/docs" // Ruta al paquete generado por swag
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// Booking represents a booking request
type Booking struct {
	ID       int    `json:"id"`       // optional
	Customer string `json:"customer"` // required
	Date     string `json:"date"`     // required
	Item     string `json:"item"`     // required
}

// @title Create Booking API
// @version 1.0
// @description This microservice creates a booking in SQL Server.
// @termsOfService http://example.com/terms/

// @contact.name API Support
// @contact.url http://www.example.com/support
// @contact.email support@example.com

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8086
// @BasePath /api
// @schemes http
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Configurar Swagger Info
	docs.SwaggerInfo.Title = "Create Booking API"
	docs.SwaggerInfo.Description = "This microservice creates a booking in SQL Server."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.BasePath = "/api"

	router := gin.Default()

	// Endpoints
	router.POST("/api/bookings", createBooking)
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8086" // fallback
	}
	log.Println("Server running on port " + port)
	router.Run(":" + port)
}

// createBooking godoc
// @Summary Create a new booking
// @Description Create a new booking with customer, date and item
// @Tags bookings
// @Accept  json
// @Produce  json
// @Param booking body Booking true "Booking Data"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /bookings [post]
func createBooking(c *gin.Context) {
	var b Booking
	if err := c.ShouldBindJSON(&b); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db, err := sql.Open("sqlserver", os.Getenv("SQLSERVER_CONN"))
	if err != nil {
		log.Println("Database connection error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection error"})
		return
	}
	defer db.Close()

	query := "INSERT INTO Bookings (Customer, Date, Item) VALUES (@p1, @p2, @p3)"
	_, err = db.Exec(query, b.Customer, b.Date, b.Item)
	if err != nil {
		log.Println("Error executing insert query:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Booking created successfully"})
}
