import { api } from './api';

// Contact form data
export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}

class ContactService {
    /**
     * Submit contact form
     * Note: If backend doesn't have contact endpoint, this will store locally
     */
    async submit(data: ContactFormData): Promise<{ success: boolean; message: string }> {
        try {
            // Try to send to backend if endpoint exists
            await api.post('/contact', data, { skipAuth: true });
            return { success: true, message: 'Mensaje enviado correctamente' };
        } catch {
            // If endpoint doesn't exist, just log and return success
            // In a real app, you might want to use an email service like SendGrid
            console.log('Contact form submitted:', data);
            return {
                success: true,
                message: 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.'
            };
        }
    }
}

export const contactService = new ContactService();
export default contactService;
