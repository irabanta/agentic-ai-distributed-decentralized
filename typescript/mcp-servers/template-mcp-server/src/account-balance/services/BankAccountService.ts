import { AccountBalanceModel } from "../../types/AccountBalanceModel.js";

export class BankAccountService{
    async getAccountBalance(customer_id: string, account_number: string): Promise<AccountBalanceModel> {
        // Simulate a database call to get the account balance
        return new Promise((resolve) => {
            const balance = Math.floor(Math.random() * 10000); // Random balance for demo
            const balanceData = {
                balance,
                currency: 'USD',
                account_number: account_number,
                customer_id: customer_id
            };
            resolve(balanceData);
        });
    }
}