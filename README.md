# 📐 Geometry Playground

An interactive educational web application designed to help 6th-grade students learn geometry through engaging visualizations and practice quizzes.

## 🎯 Overview

Geometry Playground is a kid-friendly learning platform that makes geometry fun and accessible. Students can explore six core geometry topics through interactive manipulatives, clear explanations, and immediate feedback quizzes.

## ✨ Features

### 6 Interactive Topics

1. **Points, Lines & Rays** - Explore the building blocks of geometry
2. **Angles** - Interactive slider to understand acute, right, obtuse, and straight angles
3. **Triangles** - Drag points to create triangles and learn about different types
4. **Perimeter & Area of Rectangles** - Adjust dimensions and see calculations in real-time
5. **Area of Triangles** - Visualize the formula with interactive base and height sliders
6. **Circles** - Understand radius, diameter, and circumference relationships

### Educational Design

- **Kid-Friendly Content**: Written specifically for 11-12 year olds
- **Interactive Visualizations**: SVG-based graphics that respond to user input
- **Practice Quizzes**: 3-5 questions per topic with immediate feedback
- **Visual Learning**: Color-coded explanations and dynamic calculations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Graphics**: SVG for interactive visualizations

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Site header with navigation
│   ├── Footer.tsx      # Site footer
│   ├── Layout.tsx      # Page layout wrapper
│   └── Quiz.tsx        # Reusable quiz component
├── pages/              # Route-level pages
│   ├── HomePage.tsx    # Landing page with topic cards
│   └── TopicPage.tsx   # Topic detail page wrapper
├── topics/             # Individual topic components
│   ├── LinesAndRays.tsx
│   ├── Angles.tsx
│   ├── Triangles.tsx
│   ├── PerimeterAreaRectangles.tsx
│   ├── AreaTriangles.tsx
│   └── Circles.tsx
├── data/
│   └── topics.ts       # Topic configuration
├── App.tsx             # Main app with routing
└── main.tsx           # Application entry point
```

## 🎓 Educational Approach

### Learning Objectives

Each topic follows a structured learning path:

1. **Conceptual Introduction**: Simple, clear explanation of the concept
2. **Interactive Exploration**: Hands-on manipulation of visual elements
3. **Practice & Assessment**: Quiz questions with explanations
4. **Immediate Feedback**: Reinforce correct understanding

### Age-Appropriate Design

- Simple, conversational language
- Visual emphasis over text-heavy explanations
- Encouraging feedback messages
- Clear color coding and visual hierarchy
- Touch-friendly interface elements

## 🧩 Adding New Topics

To add a new geometry topic:

1. Create a new component in `src/topics/YourTopic.tsx`
2. Follow the existing pattern with explanation, visualization, and quiz
3. Add topic to `src/data/topics.ts`:

```typescript
{
  id: 'your-topic',
  title: 'Your Topic',
  description: 'Kid-friendly description',
  icon: '📊',
  component: YourTopic,
}
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build to check for type errors
npm run build
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Development Notes

### Key Design Decisions

- **Client-side only**: No backend required, perfect for static hosting
- **SVG over Canvas**: Better accessibility and scaling
- **Inline state management**: React hooks instead of Redux for simplicity
- **Component co-location**: Types and data near their usage for maintainability

### Performance Optimizations

- Code splitting via React Router
- Tailwind CSS purging for minimal CSS bundle
- SVG for resolution-independent graphics
- Minimal dependencies

## 🤝 Contributing

This project is designed for educational purposes. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing code style
4. Test on multiple devices
5. Submit a pull request

## 📄 License

This project is intended for educational use.

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Modifying Quiz Questions

Each topic component contains its quiz questions. Edit the `quizQuestions` array in the respective topic file.

## 🐛 Known Issues

- Triangle dragging currently mouse-only (touch support coming soon)
- No progress persistence across page refreshes

## 🚧 Future Enhancements

- [ ] Touch event support for mobile dragging
- [ ] Progress tracking with localStorage
- [ ] Additional topics (3D shapes, coordinate geometry)
- [ ] Printable worksheets
- [ ] Achievement system
- [ ] Teacher dashboard
- [ ] Multi-language support

## 📞 Support

For issues or questions, please file an issue in the GitHub repository.

---

**Made for 6th-grade geometry practice** 🎓
