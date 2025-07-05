FROM golang:1.20

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go install github.com/swaggo/swag/cmd/swag@v1.8.1
RUN swag init

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]
