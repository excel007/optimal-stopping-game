export class OptimalStoppingGame {
    constructor(totalItems = 10) {
        this.totalItems = totalItems;
        this.items = [];
        this.currentIndex = 0;
        this.bestValue = 0;
        this.gameOver = false;
        this.result = null; // 'win' | 'lose'
        this.pickedValue = null;
        this.history = [];

        // Statistics
        this.stats = {
            gamesPlayed: 0,
            wins: 0,
            history: [], // { result, picked, best, pickedIndex, bestIndex, values }
            // Aggregated Stats
            bestFoundCount: 0,
            totalOptimalityGap: 0 // Sum of (Best - Picked)
        };

        this.init();
    }

    init() {
        // Generate unique random values (1-1000)
        const values = new Set();
        while (values.size < this.totalItems) {
            values.add(Math.floor(Math.random() * 1000) + 1);
        }
        this.items = Array.from(values);

        // Shuffle
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }

        this.bestValue = Math.max(...this.items);
        this.currentIndex = 0;
        this.gameOver = false;
        this.result = null;
        this.pickedValue = null;
        this.history = [];
    }

    getCurrentItem() {
        if (this.currentIndex >= this.totalItems) return null;
        return this.items[this.currentIndex];
    }

    pass() {
        if (this.gameOver) return false;
        if (this.currentIndex >= this.totalItems - 1) return false; // Cannot pass the last item

        this.history.push({
            value: this.items[this.currentIndex],
            action: 'pass',
            index: this.currentIndex
        });

        this.currentIndex++;
        return true;
    }

    pick() {
        if (this.gameOver) return false;

        const value = this.items[this.currentIndex];
        this.pickedValue = value;

        this.history.push({
            value: value,
            action: 'pick',
            index: this.currentIndex
        });

        const isBest = value === this.bestValue;
        this.endGame(isBest ? 'win' : 'lose');
        return true;
    }

    endGame(result) {
        this.gameOver = true;
        this.result = result;

        // Find index of the best value
        const bestIndex = this.items.indexOf(this.bestValue);
        const pickedIndex = this.currentIndex;
        const gap = this.bestValue - (this.pickedValue || 0);

        // Update Stats
        this.stats.gamesPlayed++;
        if (result === 'win') this.stats.wins++;
        this.stats.totalOptimalityGap += gap;

        this.stats.history.push({
            result,
            picked: this.pickedValue,
            best: this.bestValue,
            pickedIndex: pickedIndex, // 0-based
            bestIndex: bestIndex,     // 0-based
            gap: gap
        });
    }

    reset() {
        this.init();
    }

    // Helper for AI/Algorithm
    getHistoryValues() {
        return this.history.map(h => h.value);
    }
}
