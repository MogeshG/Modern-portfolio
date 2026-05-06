# 🕹️ MOGESH | Modern Portfolio

A high-impact, dual-themed portfolio featuring a radical shift between **Retro Arcade** and **Modern Brutalist** aesthetics. Built with high-performance React and tailored for a unique user experience.

## 🚀 Live Features

### 1. Dual-Theme Engine
Switch seamlessly between two distinct digital worlds:
- **Pixel/Retro Mode**: 8-bit typography, CRT scanline overlays, neon accents, and nostalgic arcade vibes.
- **Brutalist Mode**: Raw geometry, high-contrast monochrome layouts, heavy shadows, and bold typography inspired by architectural brutalism.

### 2. Interactive Applets
The hero section features a dynamic dashboard that changes based on your theme:
- **GAME.EXE (Retro)**: A fully playable flappy-bird style mini-game with custom physics and particle trails.
- **SKETCH.SYS (Brutalist)**: A raw, geometric drawing canvas with multiple brush modes (Block, Wire, Dots) and a responsive toolbar.

### 3. Mission Archive (Projects)
A dedicated page documenting digital artifacts and deployed systems, featuring:
- Theme-aware project cards.
- Smooth Framer Motion transitions.
- Global "Scroll to Top" navigation logic.

### 4. Data Transmission (Contact)
A secure contact hub integrated with **EmailJS**:
- **Rate Limiting**: Built-in 5-minute cooldown safety feature using `localStorage`.
- **System Feedback**: Real-time transmission status updates (Transmitting, Success, Error).
- **Social Integration**: Custom SVG icons for GitHub, LinkedIn, and Instagram.

## 🛠️ Tech Stack

- **Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom SVGs
- **Email Service**: EmailJS Browser SDK
- **Routing**: React Router 7

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MogeshG/Modern-portfolio.git
   cd Modern-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---

**Designed & Developed by [MOGESH G](https://github.com/MogeshG)**  
*Expression through raw geometry and pixel-perfect logic.*
