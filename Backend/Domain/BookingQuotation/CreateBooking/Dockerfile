# Backend/Domain/BookingQuotation/CreateBooking/Dockerfile
FROM golang:1.20

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go install github.com/swaggo/swag/cmd/swag@latest


RUN go build -o main .

EXPOSE 8086

CMD ["./main"]
