'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ negative: number; neutral: number; positive: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/analyze-sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ negative: 0, neutral: 0, positive: 0 });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-zinc-50">
          Emotion Detector
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze sentiment..."
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            rows={4}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </form>
        {result && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">Sentiment Analysis:</h2>
            <p className="text-lg text-black dark:text-zinc-50">
              Negative: <span className="font-bold">{(result.negative * 100).toFixed(2)}%</span>
            </p>
            <p className="text-lg text-black dark:text-zinc-50">
              Neutral: <span className="font-bold">{(result.neutral * 100).toFixed(2)}%</span>
            </p>
            <p className="text-lg text-black dark:text-zinc-50">
              Positive: <span className="font-bold">{(result.positive * 100).toFixed(2)}%</span>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
