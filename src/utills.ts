const hardcodedWordsArray: string[] = [
    "this", "that", "with", "from", "like", "just", "what", "some", "have", "into",
    "time", "look", "more", "been", "come", "than", "were", "they", "them", "then",
    "make", "much", "over", "such", "back", "well", "down", "want", "good", "very",
    "even", "only", "most", "ever", "give", "life", "take", "help", "must", "tell",
    "show", "know", "done", "said", "need", "keep", "went", "same", "year", "kind",
    "long", "soon", "play", "name", "call", "next", "last", "ever", "home", "away",
    "hard", "sure", "real", "read", "best", "high", "open", "free", "live", "full",
    "both", "fine", "mean", "born", "dead", "easy", "form", "dark", "wide", "deep",
    "rich", "fast", "soft", "fair", "true", "clear", "wide", "dead", "clear", "full",
    "fast", "high", "soft", "wide", "free", "wind", "blue", "cold", "dark", "deep",
    "fast", "full", "high", "late", "loud", "near", "rich", "slow", "thin", "wild",
    "wood", "pure", "rare", "rich", "safe", "slow", "soft", "weak", "wet", "wild"
];
export function getRandomWordsFromArray( n: number): string[] {
    const randomWords: string[] = [];
    
    if (n <= 0 || hardcodedWordsArray.length === 0) {
        return randomWords;
    }

    const maxIndex = hardcodedWordsArray.length - 1;

    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
        randomWords.push(hardcodedWordsArray[randomIndex]);
    }

    return randomWords;
}