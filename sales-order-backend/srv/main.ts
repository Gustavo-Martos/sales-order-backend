import { Service } from '@sap/cds';
// 1. Adicione o SalesOrderHeaders na sua importação
import { Customers, SalesOrderHeaders } from '@models/sales'; 

export default (service: Service) => {
    // 2. Tire as aspas de 'SalesOrderHeaders'
    service.after('READ', SalesOrderHeaders, (results: Customers) => {
        
        // Sua lógica aqui dentro

    });
}