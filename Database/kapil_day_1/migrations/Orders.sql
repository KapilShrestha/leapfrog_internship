CREATE TABLE Orders(
	OrderID int,
	CustomerID int,
	EmployeeID int,
	OrderDate timestamp,
	ShipperID int,
	PRIMARY KEY(OrderId),
	FOREIGN KEY(CustomerID) REFERENCES Customers (CustomerId) ON DELETE CASCADE,
    FOREIGN KEY(EmployeeID) REFERENCES Employees (EmployeeID) ON DELETE CASCADE,
    FOREIGN KEY(ShipperID) REFERENCES Shippers (ShipperID) ON DELETE CASCADE
);