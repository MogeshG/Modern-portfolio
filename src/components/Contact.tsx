import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="pixel-box-yellow p-6 sm:p-12 bg-black text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-pixel mb-8">SEND A <span className="text-neon-pink">SIGNAL</span></h2>
          <p className="font-retro text-xl sm:text-2xl text-gray-400 mb-12 max-w-xl mx-auto">
            COMMUNICATION CHANNEL IS OPEN. SEND YOUR MESSAGE TO THE MOGESH SERVER.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 mb-12">
            <a
              href="mailto:gmogesh2003@gmail.com"
              className="pixel-button text-[10px] sm:text-xs break-all px-4"
            >
              EMAIL: gmogesh2003@gmail.com
            </a>
          </div>

          <form className="max-w-md mx-auto space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="PLAYER NAME"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black border-4 border-white font-retro text-xl sm:text-2xl text-white focus:border-secondary outline-none transition-all"
              />
              <input
                type="email"
                placeholder="COMMUNICATION ID (EMAIL)"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black border-4 border-white font-retro text-xl sm:text-2xl text-white focus:border-secondary outline-none transition-all"
              />
            </div>
            <textarea
              rows={4}
              placeholder="YOUR MESSAGE..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black border-4 border-white font-retro text-xl sm:text-2xl text-white focus:border-secondary outline-none transition-all resize-none"
            />
            <button className="pixel-button scale-110 sm:scale-125 w-full mt-4">
              SEND DATA
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
