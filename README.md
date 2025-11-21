# 🎮 Optimal Stopping Game

An interactive educational game that teaches the **Optimal Stopping Algorithm** (also known as the **Secretary Problem** or **37% Rule**) through engaging gameplay.

## 📖 About the Game

The Optimal Stopping Game challenges players to find the best choice among a sequence of random values (1-100). You can either **pass** on a value or **pick** it - but once you pass, you can never go back!

### Game Rules

1. You'll see 10 random numbers, one at a time
2. For each number, you must decide:
   - **Pass**: Skip this number and see the next one (you can't go back!)
   - **Pick**: Choose this number and end the game
3. **Win Condition**: Pick the highest number in the sequence
4. **Lose Condition**: Pick any number that isn't the highest

## 🧮 The Optimal Stopping Algorithm (37% Rule)

The Optimal Stopping Algorithm is a mathematical strategy that maximizes your chances of picking the best option when:
- You must evaluate options sequentially
- You can't go back to previous options
- You don't know how many options remain

### How It Works

The algorithm has **two phases**:

#### Phase 1: **Look** (First 37%)
- **Observe** the first ~37% of options (≈4 out of 10 items)
- **Don't pick anything** - just remember the best value you see
- This is your "learning phase"

#### Phase 2: **Leap** (Remaining 63%)
- **Pick the first option** that's better than the best you saw in Phase 1
- If nothing better appears, pick the last option

### Why 37%?

The number 37% comes from **1/e** (where e ≈ 2.718, Euler's number). Mathematically, this strategy gives you approximately a **37% chance** of picking the absolute best option - which is remarkably high for this type of problem!

### Real-World Applications

This algorithm applies to many real-life decisions:
- 🏠 **House hunting**: How many houses should you view before making an offer?
- 💼 **Hiring**: How many candidates should you interview before making a decision?
- 💑 **Dating**: The famous "marriage problem" - when should you commit?
- 🚗 **Parking**: How long should you search for a better parking spot?

## 🎯 Game Features

### 🤖 AI Assistant
- Toggle the AI Assistant to see real-time recommendations
- Based on the 37% Rule strategy
- Explains why it suggests "Pass" or "Pick"

### 📊 Statistics Tracking
- **Games Played**: Total number of rounds
- **Wins**: How many times you picked the best value
- **Win Rate**: Your success percentage
- **Avg. Gap**: Average difference between your pick and the best value
- **Avg. Passes**: Average position where you make your choice
- **Game History**: Detailed log of recent games

### 🌐 Bilingual Support
- **English** and **Thai** language options
- Switch languages with the 🇬🇧/🇹🇭 button

### 📱 Mobile-Friendly Design
- Responsive layout optimized for both mobile and desktop
- Touch-friendly buttons and cards
- Collapsible statistics panel

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd optimal-stopping-game

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Technology Stack

- **Vite**: Fast build tool and dev server
- **Vanilla JavaScript**: Pure ES6+ JavaScript
- **CSS3**: Modern responsive design with Vanilla theme
- **No frameworks**: Lightweight and fast

## 🎨 Design Philosophy

The game uses a **Vanilla theme** with warm, earthy tones:
- Clean, minimalist interface
- Smooth animations and transitions
- Focus on educational value and user experience

## 📚 Learning Outcomes

By playing this game, you'll learn:
1. **Strategic thinking**: When to explore vs. when to commit
2. **Probability theory**: Understanding optimal decision-making
3. **Mathematical intuition**: Why 37% is the magic number
4. **Real-world application**: How algorithms apply to daily life

## 🎓 Educational Context

This game was designed for teaching algorithms and decision theory in computer science courses. It demonstrates:
- **Greedy algorithms**: Making locally optimal choices
- **Dynamic programming**: Breaking problems into phases
- **Probability**: Calculating expected outcomes
- **Game theory**: Strategic decision-making under uncertainty

## 🏆 Tips for Success

1. **Use the AI Assistant** to learn the optimal strategy
2. **Track your statistics** to see improvement over time
3. **Experiment** with different strategies to understand why 37% works
4. **Think about real-life** applications while playing

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve documentation
- Add translations

---

**Have fun learning about optimal stopping! 🎉**

Remember: Sometimes the best strategy is knowing when to stop looking and commit to your choice. 🎯
