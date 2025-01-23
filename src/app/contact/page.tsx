"use client";

import { FormEvent } from 'react';

export default function Contact() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Comment out until used
    // const formData = new FormData(e.currentTarget);
    // Add your form submission logic here
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">We&apos;d love to hear from you!</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={5} 
            required
          ></textarea>
        </div>
        <button type="submit" className="cta">Send Message</button>
      </form>
    </div>
  );
} 