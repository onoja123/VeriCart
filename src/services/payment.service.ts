import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import ProfileService from "./profile.service";


const PAYSTACK_API_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_API_URL = process.env.PAYSTACK_API_URL || ''; 


export default class PaymentService {

    private static readonly BANKS_URL = `${PAYSTACK_API_URL}/bank`;
    private static readonly INITIALIZE_URL = `${PAYSTACK_API_URL}/transaction/initialize`;
    private static readonly PAYSTACK_TRANSFER = `${PAYSTACK_API_URL}/transfer`;
    private static readonly PAYSTACK_TRANSFER_RECIPIENT = `${PAYSTACK_API_URL}/transferrecipient`;


    static async getBanks(): Promise<any> {
        try {
            const response = await axios.get(PaymentService.BANKS_URL, {
                headers: {
                    'Authorization': `Bearer ${PAYSTACK_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            
            return response.data;
        } catch (error) {
            console.error('Error getting banks:', error);
            throw new Error('Error getting banks');
        }
    }

    static async verifyBank(
        account_number: string, 
        bank_code: string
    ): Promise<any> {
        try {
            const bankDetails = {
                account_number: account_number,
                bank_code: bank_code,
            };

            const response = await axios.get(`${PAYSTACK_API_URL}/bank/resolve`, {
                params: bankDetails,
                headers: {
                    'Authorization': `Bearer ${PAYSTACK_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error verifying bank:', error);
            throw new Error('Error verifying bank');
        }
    } 

    static async initializePaystackPayment(
        amount: number, 
        userId: string,
        callbackUrl:string
    ): Promise<{ authorizationUrl: string; paymentReference: string }> {
        const user = await ProfileService.getProfile(userId);
        const response = await axios.post(
            PaymentService.INITIALIZE_URL,
            {
                amount: amount * 100,
                email: user?.email,
                reference: uuidv4(), 
                callback_url: callbackUrl,
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
                
        return {
            authorizationUrl: response.data.data.authorization_url,
            paymentReference: response.data.data.reference,
        };
    }
    

    static async verifyTransaction(
        reference: string
    ): Promise<any> {

        const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
        const response = await axios.get(verifyUrl, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_API_KEY}`,
            },
        });
        return response.data;
    }



    static async createTransferRecipient(
        name: string, 
        accountNumber: string, 
        bankCode: string
    ): Promise<string> {
        try {
            const response = await axios.post(
                PaymentService.PAYSTACK_TRANSFER_RECIPIENT,
                {
                    type: "nuban",
                    name,
                    account_number: accountNumber,
                    bank_code: bankCode,
                    currency: "NGN"
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data.data.recipient_code;
        } catch (error: any) {
            console.error('Error creating transfer recipient:', error.response?.data || error.message);
            throw new Error('Error creating transfer recipient');
        }
    }

    static async initiateTransfer(
        amount: number, 
        recipientCode: string, 
        reason: string
    ): Promise<any> {
        try {
            const response = await axios.post(
                PaymentService.PAYSTACK_TRANSFER,
                {
                    source: "balance",
                    amount: amount * 100,
                    recipient: recipientCode,
                    reason
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data.data;
        } catch (error: any) {
            console.error('Error initiating transfer:', error.response?.data || error.message);
            throw new Error('Error initiating transfer');
        }
    }
}
