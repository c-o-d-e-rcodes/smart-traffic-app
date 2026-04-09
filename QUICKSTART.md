#!/bin/bash
# Emergency Response Center - Quick Start Guide

## 🚀 Setup & Run Instructions

### Step 1: Install Dependencies (First Time Only)
```bash
cd dashboard
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The dashboard will be available at: **http://localhost:5173**

---

## ✨ What You'll See

1. **Header** - "Emergency Response Center" with animated title
2. **Quick Actions** - 3 buttons with infinite pulse animations:
   - 🚑 Ambulance (Red)
   - 👮 Police (Blue)
   - 📞 Helpline (Yellow)
3. **Live Incident Feed** - Real-time updating incident list
4. **Stats Dashboard** - Response times, active units, success rates
5. **Dispatch Activity Log** - Track all dispatched services

---

## 🎯 Interactive Features to Test

### Button Interactions
- ✨ **Hover** - Buttons scale up and glow
- 👆 **Click** - Opens dispatch modal
- 📱 **Mobile** - Buttons stack vertically on small screens

### Modal Features
- 📋 Shows service details (ETA, available units)
- ✅ Confirm dispatch button
- 🎉 Success screen with unit tracking
- ⏱️ Auto-closes after confirmation

### Live Feed
- 📊 Updates every 2 seconds with new incidents
- 🎨 Color-coded by severity (Low/Medium/High/Critical)
- 📍 Shows location and response time

---

## 🛠️ Build for Production
```bash
npm run build
```

Output will be in `dashboard/dist/`

---

## 📝 File Structure
```
dashboard/
├── src/
│   ├── components/
│   │   └── EmergencyResponseCenter.jsx  ← Main Component
│   ├── App.jsx                          ← Updated Entry Point
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

---

## 🎨 Customization Quick Tips

### Change Colors
Open `EmergencyResponseCenter.jsx`, find the `colorStyles` in `QuickActionButton` component.

### Adjust Animation Speed
Look for `transition={{ duration: 1.5 }}` and change the number (in seconds).

### Modify Button Texts
Search for `"Ambulance"`, `"Police"`, `"Helpline"` in the component and change them.

### Update Incident Data
The `LiveIncidentChart` component auto-generates incidents. Modify the arrays:
- `incidentTypes`
- `severities`
- `locations`

---

## 🐛 Troubleshooting

### Styles not showing?
Make sure Tailwind CSS is configured:
```bash
npm run dev  # Vite handles PostCSS automatically
```

### Animations not smooth?
Check that Framer Motion is version 12.38.0+:
```bash
npm list framer-motion
```

### Port 5173 already in use?
Vite will auto-use the next available port. Check the terminal output.

---

## 📦 Dependencies Summary
- React 19.2.4
- Framer Motion 12.38.0
- Tailwind CSS 4.2.2
- Lucide React 1.7.0
- Vite 8.0.4

---

## 🎓 Learn More
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Docs](https://react.dev/)

---

💡 **Pro Tip**: Open browser DevTools (F12) → Console to see any errors or warnings.

Generated: April 9, 2026 | Emergency Response Center v1.0
