package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/denisenkom/go-mssqldb"
	_ "deletebooking/docs"
	ginSwagger "github.com/swaggo/gin-swagger"
	swaggerFiles "github.com/swaggo/files"
)

var db *sql.DB

// @title Delete Booking API
// @version 1.0
// @description API to delete bookings from SQL Server
// @host localhost:8080
// @BasePath /api/bookings
func main() {
	var err error
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	port := os.Getenv("PORT")

	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%s;database=%s",
		dbHost, dbUser, dbPassword, dbPort, dbName)

	db, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool:", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatal("Cannot connect to SQL Server:", err)
	}

	router := gin.Default()

	router.DELETE("/api/bookings/:id", deleteBooking)
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Printf("Server running on port %s", port)
	router.Run(":" + port)
}

// @Summary Delete booking
// @Description Delete a booking by ID
// @Param id path int true "Booking ID"
// @Success 200 {string} string "Booking deleted"
// @Failure 500 {string} string "Internal server error"
// @Router /api/bookings/{id} [delete]
func deleteBooking(c *gin.Context) {
	id := c.Param("id")

	query := `DELETE FROM bookings WHERE id = @p1`
	_, err := db.Exec(query, id)
	if err != nil {
		log.Println("Delete failed:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Delete failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Booking deleted"})
}
