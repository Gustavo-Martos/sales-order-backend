using {managed} from '@sap/cds/common';

namespace sales;

entity SalesOrderHeaders: managed {
    key ID: UUID;
        customer: Association to Customers;
        totalAmount: Decimal(16,2);
        name: String(100);
        items: Composition of many SalesOrderItems on items.Header = $self;
}

entity SalesOrderItems: managed {
    key ID: UUID;
        Header: Association to SalesOrderHeaders;
        product: Association to Products;
        quantity: Integer;
        price: Decimal(16,2);
}

entity Customers {
    key ID: UUID;
        firstName: String(100);
        lastName: String(100);
        email: String(100);
}

entity Products {
    key ID: UUID;
        name: String(100);
        price: Decimal(16,2);
}