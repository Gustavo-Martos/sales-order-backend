import cds, { Service, Request } from '@sap/cds';
import { SalesOrderHeaders } from '@models/sales'; 

export default (service: Service) => {
    
    // Lógica original do READ
    service.after('READ', SalesOrderHeaders, (results: any) => {
        const records = Array.isArray(results) ? results : [results];
        records.forEach(customer => {
            if (customer.email && !customer.email.includes('@')) {
                customer.email = `${customer.email}@gmail.com`;
            }
        });
    });

    // Lógica original do CREATE (Mantendo a restrição pedida)
    service.before('CREATE', SalesOrderHeaders, async (request: Request) => {
        const params = request.data;
        
        // Mantendo sua lógica: Rejeita se o customer_ID FOR fornecido
        if (params.customer_ID) {
            return request.reject(400, 'Customer ID should not be provided when creating a sales order header.');
        }
        
        // Consulta ao banco usando a sintaxe CQL
        const customerQuery = SELECT.one.from('sales.Customers').where({ ID: params.customer_ID });
        const customer = await cds.run(customerQuery);
        if (!customer) {
            return request.reject(404, `Customer with ID ${params.customer_ID} not found.`);    
        }
    });
}