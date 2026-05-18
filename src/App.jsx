import { useState, useEffect, useRef, useCallback } from 'react'

const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

export default function App() {
  const params     = new URLSearchParams(window.location.search)
  const urlSession = params.get('session_id')
  const [screen, setScreen]   = useState(urlSession ? 'result' : 'upload')
  const [sessionId, setId]    = useState(urlSession || null)

  if (screen === 'result' && sessionId) {
    return <ResultScreen sessionId={sessionId} />
  }
  return <UploadScreen onSession={(id) => { setId(id); setScreen('result') }} />
}

// ─── Upload Ekranı ────────────────────────────────────────────────────────────

function UploadScreen({ onSession }) {
  const [photos, setPhotos]       = useState([])
  const [plan, setPlan]           = useState('15s')
  const [tracks, setTracks]       = useState([])
  const [track, setTrack]         = useState(null)
  const [prompt, setPrompt]       = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [tracksLoading, setTL]    = useState(true)
  const fileRef  = useRef()
  const audioRef = useRef()

  useEffect(() => {
    fetch(`${API}/api/music/trending`)
      .then(r => r.json())
      .then(d => { setTracks(d.tracks || []); setTL(false) })
      .catch(() => setTL(false))
  }, [])

  const addFiles = useCallback((files) => {
    const imgs = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, 5)
    setPhotos(p => [...p, ...imgs].slice(0, 5))
  }, [])

  const playTrack = (t) => {
    setTrack(t)
    if (audioRef.current && t.previewUrl) {
      audioRef.current.src = t.previewUrl
      audioRef.current.play().catch(() => {})
    }
  }

  const submit = async () => {
    setError('')
    if (photos.length < 2) return setError('En az 2 fotoğraf ekleyin.')
    if (!track)            return setError('Müzik seçin.')
    setLoading(true)
    try {
      const form = new FormData()
      photos.forEach(f => form.append('photos', f))
      form.append('plan', plan)
      form.append('musicTrackId', track.id)
      form.append('prompt', prompt)

      const res  = await fetch(`${API}/api/session`, { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Sunucu hatası')

      const returnUrl   = `${window.location.origin}?session_id=${data.sessionId}`
      const fullCheckout = `${data.checkoutUrl}&checkout[redirect_url]=${encodeURIComponent(returnUrl)}`
      window.location.href = fullCheckout
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <audio ref={audioRef} style={{ display: 'none' }} />
      <Header />
      <div style={s.main}>
        <h1 style={s.h1}>Yeni reel oluştur</h1>
        <p style={s.sub}>Fotoğraflarını yükle, müzik seç, ödemeyi yap — reelin 2–4 dakikada hazır.</p>

        {/* ADIM 1 — Fotoğraflar */}
        <Card step="1" title="Fotoğrafları yükle" desc="2–5 fotoğraf. İlk fotoğraf referans çerçeve olur.">
          <div
            style={{ ...s.drop, borderColor: photos.length ? '#1a7f5a' : '#ccc' }}
            onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files) }}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileRef.current.click()}
          >
            <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: 'none' }}
              onChange={e => addFiles(e.target.files)} />
            {photos.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#aaa' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
                <div style={{ fontSize: 14 }}>Sürükle bırak veya tıkla</div>
                <div style={{ fontSize: 12, marginTop: 4, color: '#ccc' }}>JPG, PNG · Maks 15 MB · 5 fotoğrafa kadar</div>
              </div>
            ) : (
              <div style={s.thumbRow}>
                {photos.map((f, i) => (
                  <div key={i} style={s.thumb}>
                    <img src={URL.createObjectURL(f)} alt="" style={s.thumbImg} />
                    {i === 0 && <span style={s.refTag}>Referans</span>}
                    <button style={s.xBtn} onClick={e => { e.stopPropagation(); setPhotos(p => p.filter((_, j) => j !== i)) }}>✕</button>
                  </div>
                ))}
                {photos.length < 5 && (
                  <div style={s.addBtn}><span style={{ fontSize: 24, color: '#ccc' }}>+</span></div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* ADIM 2 — Plan */}
        <Card step="2" title="Plan seç" desc="Her sipariş ayrı ücretlendirilir. KDV dahil.">
          <div style={s.planRow}>
            {[
              { id: '15s', label: '15 saniye', price: '499 ₺', note: 'Tek Seedance 2.0 üretimi' },
              { id: '30s', label: '30 saniye', price: '799 ₺', note: 'Çift Seedance 2.0 üretimi' },
            ].map(p => (
              <button key={p.id} style={{ ...s.planBtn, ...(plan === p.id ? s.planActive : {}) }} onClick={() => setPlan(p.id)}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#0d3d26', marginBottom: 4 }}>{p.price}</div>
                <div style={{ fontSize: 12, color: '#aaa' }}>{p.note}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* ADIM 3 — Müzik */}
        <Card step="3" title="Müzik seç" desc="Telif temizlenmiş, Instagram & TikTok güvenli. Önizlemek için tıkla.">
          {tracksLoading ? (
            <div style={{ color: '#aaa', fontSize: 14, padding: '1rem 0' }}>Müzikler yükleniyor…</div>
          ) : tracks.length === 0 ? (
            <div style={{ color: '#aaa', fontSize: 14 }}>Müzik listesi yüklenemedi.</div>
          ) : (
            <div style={s.trackList}>
              {tracks.map(t => (
                <button key={t.id} style={{ ...s.trackBtn, ...(track?.id === t.id ? s.trackActive : {}) }} onClick={() => playTrack(t)}>
                  <div style={s.cover}>
                    {t.coverUrl
                      ? <img src={t.coverUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
                      : <span style={{ fontSize: 20 }}>🎵</span>}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{t.artist}{t.bpm ? ` · ${t.bpm} BPM` : ''}</div>
                  </div>
                  {track?.id === t.id && <span style={{ color: '#1a7f5a', fontSize: 13 }}>▶ Çalıyor</span>}
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* ADIM 4 — Prompt */}
        <Card step="4" title="Açıklama (isteğe bağlı)" desc="Videonun nasıl görünmesini istediğini yaz. Boş bırakabilirsin.">
          <textarea
            style={s.textarea}
            rows={3}
            placeholder="Örn: Güneşli bir akşam, sıcak ışık, mutlu müşteriler…"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </Card>

        {error && <div style={s.errorBox}>{error}</div>}

        <button style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }} onClick={submit} disabled={loading}>
          {loading ? 'Hazırlanıyor…' : `Ödemeye geç — ${plan === '30s' ? '799 ₺' : '499 ₺'}`}
        </button>
        <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 8 }}>
          Lemon Squeezy güvenli ödeme sayfasına yönlendirileceksin.
        </p>
      </div>
    </div>
  )
}

// ─── Sonuç Ekranı ─────────────────────────────────────────────────────────────

function ResultScreen({ sessionId }) {
  const [status, setStatus]     = useState('queued')
  const [progress, setProgress] = useState(0)
  const [url, setUrl]           = useState(null)
  const [err, setErr]           = useState(null)
  const timer = useRef()

  useEffect(() => {
    const poll = async () => {
      try {
        const res  = await fetch(`${API}/api/session/${sessionId}`)
        const data = await res.json()
        setStatus(data.status || 'queued')
        setProgress(data.progress || 0)
        if (data.downloadUrl) setUrl(data.downloadUrl)
        if (data.error)       setErr(data.error)
        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(timer.current)
        }
      } catch {}
    }
    poll()
    timer.current = setInterval(poll, 5000)
    return () => clearInterval(timer.current)
  }, [sessionId])

  const labels = {
    pending_payment: 'Ödeme bekleniyor…',
    queued:          'Sıraya alındı…',
    processing:      'Reel üretiliyor…',
    completed:       'Reelin hazır! 🎉',
    failed:          'Bir hata oluştu',
  }
  const subs = {
    pending_payment: 'Ödeme tamamlanınca üretim otomatik başlayacak.',
    queued:          'Kuyruğa alındı, birkaç dakika içinde başlayacak.',
    processing:      'Seedance 2.0 videoyu oluşturuyor, lütfen bekle.',
    completed:       'MP4 dosyan indirmeye hazır.',
    failed:          err || 'Lütfen destek ile iletişime geç.',
  }

  return (
    <div style={s.page}>
      <Header />
      <div style={{ ...s.main, textAlign: 'center', paddingTop: '3rem' }}>
        <div style={{ fontSize: 56, marginBottom: '1rem' }}>
          {status === 'completed' ? '✅' : status === 'failed' ? '❌' : '⏳'}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d3d26', marginBottom: 8 }}>
          {labels[status] || 'İşleniyor…'}
        </h2>
        <p style={{ fontSize: 14, color: '#666', marginBottom: '2rem' }}>{subs[status]}</p>

        {status !== 'completed' && status !== 'failed' && (
          <>
            <div style={{ height: 8, background: '#e5e5e5', borderRadius: 4, maxWidth: 360, margin: '0 auto 8px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#1a7f5a', borderRadius: 4, transition: 'width 0.5s' }} />
            </div>
            <p style={{ fontSize: 13, color: '#aaa' }}>{progress}%</p>
          </>
        )}

        {url && (
          <a href={url} download="esnafajan_reel.mp4" style={s.downloadBtn}>
            ⬇ Reeli İndir (MP4)
          </a>
        )}

        {(status === 'completed' || status === 'failed') && (
          <button style={s.newBtn} onClick={() => window.location.href = '/'}>
            Yeni reel oluştur
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Yardımcı Bileşenler ──────────────────────────────────────────────────────

function Header() {
  return (
    <header style={s.header}>
      <div style={s.logo}>
        <div style={s.logoBox}>📢</div>
        <span style={s.logoName}>Esnaf<span style={{ color: '#1565c0' }}>Ajan</span></span>
      </div>
    </header>
  )
}

function Card({ step, title, desc, children }) {
  return (
    <div style={s.card}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: '1rem' }}>
        <div style={s.stepBadge}>{step}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 13, color: '#888' }}>{desc}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

// ─── Stiller ──────────────────────────────────────────────────────────────────

const s = {
  page:      { minHeight: '100vh', background: '#f7f7f5', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#1a1a1a' },
  header:    { background: '#fff', borderBottom: '0.5px solid #e5e5e5', padding: '1rem 2rem', display: 'flex', alignItems: 'center' },
  logo:      { display: 'flex', alignItems: 'center', gap: 10 },
  logoBox:   { width: 36, height: 36, background: '#1a7f5a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 },
  logoName:  { fontSize: 20, fontWeight: 700, color: '#0d5c3a' },
  main:      { maxWidth: 680, margin: '0 auto', padding: '2rem 1.5rem 4rem' },
  h1:        { fontSize: 24, fontWeight: 700, color: '#0d3d26', marginBottom: 6 },
  sub:       { fontSize: 14, color: '#666', marginBottom: '2rem', lineHeight: 1.6 },

  card:      { background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' },
  stepBadge: { width: 28, height: 28, minWidth: 28, background: '#e3f2fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#1565c0', marginTop: 1 },

  drop:      { border: '2px dashed', borderRadius: 10, padding: '1.5rem', cursor: 'pointer', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' },
  thumbRow:  { display: 'flex', flexWrap: 'wrap', gap: 10 },
  thumb:     { position: 'relative', width: 88, height: 88 },
  thumbImg:  { width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 },
  refTag:    { position: 'absolute', bottom: 4, left: 4, background: '#1a7f5a', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 4 },
  xBtn:      { position: 'absolute', top: -6, right: -6, width: 20, height: 20, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 },
  addBtn:    { width: 88, height: 88, border: '2px dashed #e5e5e5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },

  planRow:   { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  planBtn:   { background: '#fff', border: '1.5px solid #e5e5e5', borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s' },
  planActive:{ border: '2px solid #1a7f5a', background: '#f0faf5' },

  trackList: { display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 320, overflowY: 'auto' },
  trackBtn:  { display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', transition: 'border-color 0.15s', width: '100%' },
  trackActive:{ border: '2px solid #1a7f5a', background: '#f0faf5' },
  cover:     { width: 40, height: 40, borderRadius: 6, background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 },

  textarea:  { width: '100%', border: '0.5px solid #e5e5e5', borderRadius: 8, padding: '0.75rem', fontSize: 14, fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box' },
  errorBox:  { background: '#fef2f2', border: '0.5px solid #fca5a5', borderRadius: 8, padding: '0.75rem 1rem', fontSize: 14, color: '#dc2626', marginBottom: '1rem' },
  submitBtn: { width: '100%', background: '#1a7f5a', color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 8 },

  downloadBtn: { display: 'inline-block', background: '#1a7f5a', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 15, fontWeight: 700, marginBottom: '1rem' },
  newBtn:    { display: 'block', margin: '0 auto', background: 'none', border: '1.5px solid #1a7f5a', color: '#1a7f5a', borderRadius: 10, padding: '10px 24px', fontSize: 14, cursor: 'pointer' },
}
