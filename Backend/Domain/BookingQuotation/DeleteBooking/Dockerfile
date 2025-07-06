FROM golang:1.20

WORKDIR /app

# Instala netcat (funcional en Debian base)
RUN apt-get update && apt-get install -y netcat-openbsd

COPY go.mod ./
RUN go mod download

COPY . .

RUN go build -o main .

COPY wait-for-mssql.sh /wait-for-mssql.sh
RUN chmod +x /wait-for-mssql.sh

EXPOSE 8080

CMD ["/wait-for-mssql.sh", "sqlserver", "1433", "./main"]


