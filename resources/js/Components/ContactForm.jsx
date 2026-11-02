import { useState } from 'react';
import FormField, { inputClass } from './FormField';

const emptyValues = { name: '', email: '', subject: '', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
    const [values, setValues] = useState(emptyValues);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

    const submit = (event) => {
        event.preventDefault();
        setStatus('');
        const nextErrors = {};
        if (values.name.trim().length < 2) nextErrors.name = 'Enter your name (at least 2 characters).';
        if (!emailPattern.test(values.email.trim())) nextErrors.email = 'Enter a valid email, like name@example.com.';
        if (!values.subject) nextErrors.subject = 'Choose what this is about.';
        if (values.message.trim().length < 10) nextErrors.message = 'Write a message of at least 10 characters.';
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
            document.getElementById(Object.keys(nextErrors)[0])?.focus();
            return;
        }
        setStatus(`Thanks, ${values.name.trim()}! Your message is ready (this demo does not send it).`);
        setValues(emptyValues);
    };

    return (
        <form id="contact-form" noValidate onSubmit={submit} className="rounded-2xl border border-white/10 bg-panel p-6 sm:p-8">
            <FormField id="name" label="Your name" error={errors.name}>
                <input id="name" type="text" autoComplete="name" placeholder="e.g. Dj Villar" value={values.name} onChange={update('name')} aria-invalid={!!errors.name} aria-describedby="name-error" className={inputClass(errors.name)} />
            </FormField>
            <FormField id="email" label="Your email" error={errors.email}>
                <input id="email" type="email" autoComplete="email" placeholder="dj@company.com" value={values.email} onChange={update('email')} aria-invalid={!!errors.email} aria-describedby="email-error" className={inputClass(errors.email)} />
            </FormField>
            <FormField id="subject" label="Subject / opportunity type" error={errors.subject}>
                <select id="subject" value={values.subject} onChange={update('subject')} aria-invalid={!!errors.subject} aria-describedby="subject-error" className={inputClass(errors.subject)}>
                    <option value="">Choose one</option>
                    <option>Freelance Project</option>
                    <option>Collaboration</option>
                    <option>Just saying hi</option>
                </select>
            </FormField>
            <FormField id="message" label="Your message" error={errors.message}>
                <textarea id="message" rows="5" placeholder="Tell me about your vision, company, or project requirements..." value={values.message} onChange={update('message')} aria-invalid={!!errors.message} aria-describedby="message-error" className={inputClass(errors.message)} />
            </FormField>
            <button type="submit" className="w-full rounded-lg bg-linear-to-r from-coral to-peach px-6 py-3.5 font-bold text-deep hover:opacity-90">Send Message</button>
            <p role="status" className="mt-4 font-bold text-peach">{status}</p>
        </form>
    );
}
