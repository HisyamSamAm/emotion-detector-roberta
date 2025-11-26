# Emotion Detector RoBERTa

Proyek ini adalah aplikasi deteksi emosi berbasis sentimen menggunakan model RoBERTa dari Hugging Face. Aplikasi terdiri dari backend Python dengan FastAPI yang menjalankan model AI, dan frontend Next.js untuk antarmuka pengguna.

## Fitur
- Analisis sentimen teks dalam bahasa Inggris
- Menampilkan probabilitas untuk tiga kategori: negative, neutral, dan positive
- Antarmuka web sederhana untuk input teks dan tampilan hasil

## Teknologi
- **Backend**: Python, FastAPI, Transformers (Hugging Face), Torch
- **Frontend**: Next.js, React, Tailwind CSS
- **Model**: cardiffnlp/twitter-roberta-base-sentiment-latest

## Instalasi dan Menjalankan

### Backend
1. Masuk ke folder backend: `cd backend_python`
2. Install dependencies: `pip install -r requirements.txt`
3. Jalankan server: `uvicorn main:app --reload --host 0.0.0.0 --port 8000`

### Frontend
1. Masuk ke folder frontend: `cd frontend_nextjs`
2. Jalankan development server: `npm run dev`

Akses aplikasi di `http://localhost:3000`. Backend berjalan di `http://localhost:8000`.

## Cara Penggunaan
1. Buka aplikasi di browser.
2. Masukkan teks yang ingin dianalisis.
3. Klik "Analyze Sentiment".
4. Lihat hasil probabilitas untuk negative, neutral, dan positive.

## API Endpoint
- `POST /analyze-sentiment`: Kirim JSON `{"text": "your text"}`, dapatkan probabilities untuk ketiga sentimen.