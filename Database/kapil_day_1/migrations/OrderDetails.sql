CREATE TABLE OrderDetails(
	OrderDetailID int,
	OrderID int,
	ProductID int,
	Quantity int,
	PRIMARY KEY(OrderDetailID),
	FOREIGN KEY(OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
	FOREIGN KEY(ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);