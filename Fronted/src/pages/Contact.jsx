import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/xvoellpp', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Message sent successfully!');
                setErrorMessage('');
                setFormData({ name: '', email: '', message: '' });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'There was a problem sending your message.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Network error. Please try again later.');
            setSuccessMessage('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10" style={{ paddingTop: '80px' }}> {/* Adjust the padding */}
            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
            <p className="text-gray-600 text-center mb-6">
                We would love to hear from you! Whether you have a question, feedback, or need support, please reach out to us using the form below.
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-800 mb-2">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800 mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-800 mb-2">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        rows="4" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]" 
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="bg-[#6A38C2] text-white py-2 px-6 rounded-lg hover:bg-[#F83002] transition duration-300 w-full">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>            </form>

            {/* Success and Error Messages */}
            {successMessage && <p className="mt-4 text-green-600 text-center">{successMessage}</p>}
            {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
        </div>
    );
};

export default Contact;
