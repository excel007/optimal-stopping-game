# Optimal Stopping Game - Walkthrough

## Overview
"The Best Choice" is an interactive educational game designed to teach the optimal stopping theory (Secretary Problem).

## Features Implemented

### 1. Core Gameplay
- **Randomized Values**: Each game generates a new sequence of 10 diamond values.
- **Pick/Pass Mechanics**: Players must decide immediately whether to keep or discard the current diamond.
- **Win/Lose Logic**: The game correctly identifies if the picked diamond was indeed the absolute best in the sequence.

### 2. Educational Tools
- **Progress Indicators**: Visual dots show the current position in the sequence (1-10).
- **AI Assistant (37% Rule)**: An optional helper that uses the optimal strategy:
    - **Look Phase**: Observes the first 37% (4 items) to set a benchmark.
    - **Leap Phase**: Recommends picking the next item that beats the benchmark.
    - **Real-time Advice**: Shows "Pass" or "Pick" with reasoning.

### 3. UI/UX Polish
- **Premium Dark Mode**: Glassmorphism effects and neon accents.
- **Animations**: Smooth card dealing and result screen transitions.
- **Language Switcher**: Full support for English and Thai (TH/EN).

## How to Run
1. Open the terminal in the project directory.
2. Run `npm run dev`.
3. Open the provided localhost URL in your browser.
