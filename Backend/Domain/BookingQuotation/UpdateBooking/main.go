package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/denisenkom/go-mssqldb"
	_ "updatebooking/docs"
	ginSwagger "github.com/swaggo/gin-swagger"
	swaggerFiles "github.com/swaggo/files"
)

var db *sql.DB

// @title Update Booking API
// @version 1.0
// @description API to update booking entries in SQL Server
// @host localhost:8080
// @BasePath /api/bookings
func main() {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	port := os.Getenv("PORT")

	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%s;database=%s",
		dbHost, dbUser, dbPassword, dbPort, dbName)

	var err error
	db, err = connectWithRetry(connString, 20, 6*time.Second)
	if err != nil {
		log.Fatal("❌ Failed to connect to SQL Server after retries:", err)
	}
	log.Println("✅ Connected to SQL Server!")

	router := gin.Default()
	router.PUT("/api/bookings/:id", updateBooking)
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Printf("🚀 Server running on port %s", port)
	router.Run(":" + port)
}

func connectWithRetry(connStr string, retries int, delay time.Duration) (*sql.DB, error) {
	var db *sql.DB
	var err error

	for i := 0; i < retries; i++ {
		db, err = sql.Open("sqlserver", connStr)
		if err == nil && db.Ping() == nil {
			return db, nil
		}
		log.Printf("🔁 Attempt %d: Waiting for SQL Server...\n", i+1)
		time.Sleep(delay)
	}
	return nil, err
}

// @Summary Update booking
// @Description Update an existing booking by ID
// @Param id path int true "Booking ID"
// @Param booking body Booking true "Booking info"
// @Success 200 {string} string "Booking updated"
// @Failure 500 {string} string "Internal server error"
// @Router /api/bookings/{id} [put]
func updateBooking(c *gin.Context) {
	id := c.Param("id")
	var booking Booking
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `UPDATE bookings SET client_name = @p1, service = @p2, date = @p3 WHERE id = @p4`
	_, err := db.Exec(query, booking.ClientName, booking.Service, booking.Date, id)
	if err != nil {
		log.Println("Update failed:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Update failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Booking updated"})
}

type Booking struct {
	ClientName string `json:"client_name"`
	Service    string `json:"service"`
	Date       string `json:"date"`
}
