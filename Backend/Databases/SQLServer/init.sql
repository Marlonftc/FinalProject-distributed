CREATE DATABASE bookingdb;
GO

USE bookingdb;
GO

CREATE TABLE Bookings (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Customer NVARCHAR(100),
    Date DATE,
    Item NVARCHAR(100)
);
GO
