package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/denisenkom/go-mssqldb"
	_ "GetBooking/docs"
	ginSwagger "github.com/swaggo/gin-swagger"
	swaggerFiles "github.com/swaggo/files"
)

var db *sql.DB

// @title Get Booking API
// @version 1.0
// @description API to get bookings from SQL Server
// @host localhost:8080
// @BasePath /api/bookings
func main() {
	connString := os.Getenv("SQLSERVER_CONN")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	var err error
	db, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Println("⚠️ Connection error:", err)
	}
	if err = db.Ping(); err != nil {
		log.Println("⚠️ SQL Server not ready:", err)
	}

	router := gin.Default()

	// ✅ Middleware manual de CORS
router.Use(func(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}

	c.Next()
})

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "GetBooking service running"})
	})

	router.GET("/api/bookings/:id", getBooking)
	router.GET("/api/bookings", getBookingsByCustomer)
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Printf("🚀 Server running on port %s", port)
	router.Run(":" + port)
}

// @Summary Get booking by ID
// @Description Retrieve booking details from SQL Server
// @Param id path int true "Booking ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {string} string "Booking not found"
// @Failure 500 {string} string "Server error"
// @Router /api/bookings/{id} [get]
func getBooking(c *gin.Context) {
	id := c.Param("id")

	var customerName, service string
	var date string

	query := `SELECT Customer, Item, Date FROM bookings WHERE id = @p1`
    err := db.QueryRow(query, id).Scan(&customerName, &service, &date)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		} else {
			log.Println("❌ Error querying booking:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Query error"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":            id,
		"customer": customerName,
		"item":       service,
		"date":  date,
	})
}

// @Summary Get bookings by customer name
// @Description Retrieve all bookings for a specific customer
// @Param customer query string true "Customer Name"
// @Success 200 {array} map[string]interface{}
// @Failure 500 {string} string "Server error"
// @Router /api/bookings [get]
func getBookingsByCustomer(c *gin.Context) {
	customer := c.Query("customer")
	if customer == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing customer parameter"})
		return
	}

	rows, err := db.Query(`SELECT id, Customer, Item, Date FROM bookings WHERE Customer = @p1`, customer)
	if err != nil {
		log.Println("❌ Error querying bookings:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Query error"})
		return
	}
	defer rows.Close()

	var bookings []map[string]interface{}
	for rows.Next() {
		var id int
		var name, service, date string
		if err := rows.Scan(&id, &name, &service, &date); err != nil {
			log.Println("❌ Error scanning row:", err)
			continue
		}
		bookings = append(bookings, gin.H{
			"id":            id,
			"customer": name,
			"item":       service,
			"date":  date,
		})
	}

	c.JSON(http.StatusOK, bookings)
}
