import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Safety feature: 5 minute cooldown
    const lastSent = localStorage.getItem('last_email_sent');
    const now = Date.now();
    if (lastSent && now - parseInt(lastSent) < 300000) {
      const timeLeft = Math.ceil((300000 - (now - parseInt(lastSent))) / 60000);
      setStatus({
        type: 'error',
        message: `SYSTEM COOLING DOWN. RETRY IN ${timeLeft} MINUTE${timeLeft > 1 ? 'S' : ''}.`
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: null, message: '' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ type: 'success', message: 'DATA TRANSMITTED SUCCESSFULLY. CONNECTION STABLE.' });
      setFormData({ name: '', title: '', message: '' });
      localStorage.setItem('last_email_sent', Date.now().toString());
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ type: 'error', message: 'TRANSMISSION FAILED. CHECK SYSTEM CONFIGURATION.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          className={`p-6 sm:p-12 transition-all duration-500 ${theme === 'brutalist'
            ? 'bg-primary border-[12px] border-black shadow-[25px_25px_0px_#000]'
            : 'pixel-box-yellow bg-black'
            }`}
        >
          <h2 className={`mb-8 transition-all duration-500 ${theme === 'brutalist' ? 'font-sans text-black italic text-6xl text-black' : 'text-2xl sm:text-3xl font-pixel'
            }`}>
            {theme === 'brutalist' ? 'CONNECT' : <>SEND A <span className="text-neon-pink">SIGNAL</span></>}
          </h2>
          <p className={`mb-12 max-w-xl mx-auto transition-all duration-500 ${theme === 'brutalist' ? 'font-sans text-black text-2xl uppercase' : 'font-retro text-xl sm:text-2xl text-gray-400'
            }`}>
            {theme === 'brutalist' ? 'FEEDBACK LOOP IS OPEN. DATA TRANSMISSION READY.' : 'COMMUNICATION CHANNEL IS OPEN. SEND YOUR MESSAGE TO THE SERVER.'}
          </p>

          <div className="flex flex-col items-center justify-center gap-6 mb-12">
            <a
              href="mailto:gmogesh2003@gmail.com"
              className={`transition-all duration-500 ${theme === 'brutalist'
                ? 'bg-black text-white px-6 py-3 font-sans text-black italic text-xl hover:bg-white hover:text-black border-4 border-black'
                : 'pixel-button text-[10px] sm:text-xs break-all px-4'
                }`}
            >
              EMAIL: gmogesh2003@gmail.com
            </a>
          </div>

          <form ref={formRef} className="max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="PLAYER NAME"
                className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-4 border-black font-sans font-bold text-xl text-black outline-none transition-all ${theme === 'brutalist' ? 'placeholder:text-black/30' : 'placeholder:text-gray-500'
                  }`}
              />
              <input
                type="email"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="COMMUNICATION ID (EMAIL)"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-4 border-black font-sans font-bold text-xl text-black outline-none transition-all"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="YOUR MESSAGE..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-4 border-black font-sans font-bold text-xl text-black outline-none transition-all resize-none"
            />

            {status.type && (
              <div className={`p-4 border-4 font-bold text-center ${status.type === 'success' ? 'bg-success/20 border-success text-success' : 'bg-error/20 border-error text-error'
                }`}>
                {status.message}
              </div>
            )}

            <button
              disabled={isSending}
              className={`w-full mt-4 transition-all duration-500 disabled:opacity-50 ${theme === 'brutalist'
                ? 'bg-secondary text-white py-4 font-sans text-black italic text-3xl border-4 border-black shadow-[10px_10px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1'
                : 'pixel-button scale-110 sm:scale-125'
                }`}>
              {isSending ? 'TRANSMITTING...' : (theme === 'brutalist' ? 'TRANSMIT' : 'SEND DATA')}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
