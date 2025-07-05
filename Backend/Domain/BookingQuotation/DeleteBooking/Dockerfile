FROM golang:1.20

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN go build -o main .

# Copiamos el script
COPY wait-for-mssql.sh /wait-for-mssql.sh
RUN chmod +x /wait-for-mssql.sh

EXPOSE 8080

# Esperamos a SQL Server y luego ejecutamos el servicio
CMD ["/wait-for-mssql.sh", "sqlserver", "1433", "./main"]
