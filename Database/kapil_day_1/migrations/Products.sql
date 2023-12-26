CREATE TABLE Products(
	ProductID int,
	ProductName varchar(255),
	SupplierID int,
	CategoryID int,
	Unit varchar,
	Price numeric,
	PRIMARY KEY(ProductID),
	FOREIGN KEY(SupplierID) REFERENCES Suppliers(SupplierID) ON DELETE CASCADE,
    FOREIGN KEY(CategoryID) REFERENCES Categories(CategoryID) ON DELETE CASCADE
);