package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/denisenkom/go-mssqldb"
	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "Quotation/docs"
)

var db *sql.DB

// @title Quotation API
// @version 1.0
// @description Microservicio para manejar cotizaciones de reservas

// @host localhost:8080
// @BasePath /

type Quotation struct {
	ID         int     `json:"id"`
	ClientName string  `json:"clientName"`
	Amount     float64 `json:"amount"`
	Currency   string  `json:"currency"`
}

func main() {
	var err error
	connStr := os.Getenv("SQLSERVER_CONN")
	db, err = sql.Open("sqlserver", connStr)
	if err != nil {
		log.Fatal("Error opening connection: ", err)
	}
	defer db.Close()

	router := gin.Default()

	router.GET("/quotations", getQuotations)
	router.POST("/quotation", createQuotation)

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	router.Run(":" + port)
}

// @Summary Obtener todas las cotizaciones
// @Produce json
// @Success 200 {array} Quotation
// @Router /quotations [get]
func getQuotations(c *gin.Context) {
	rows, err := db.Query("SELECT id, clientName, amount, currency FROM quotations")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	defer rows.Close()

	var quotations []Quotation
	for rows.Next() {
		var q Quotation
		if err := rows.Scan(&q.ID, &q.ClientName, &q.Amount, &q.Currency); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Scan error"})
			return
		}
		quotations = append(quotations, q)
	}
	c.JSON(http.StatusOK, quotations)
}

// @Summary Crear una nueva cotización
// @Accept json
// @Produce json
// @Param quotation body Quotation true "Quotation info"
// @Success 200 {string} string "Cotización creada correctamente"
// @Router /quotation [post]
func createQuotation(c *gin.Context) {
	var q Quotation
	if err := c.ShouldBindJSON(&q); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}
	_, err := db.Exec("INSERT INTO quotations (clientName, amount, currency) VALUES (?, ?, ?)",
		q.ClientName, q.Amount, q.Currency)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al insertar en la base"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Cotización creada correctamente"})
}
