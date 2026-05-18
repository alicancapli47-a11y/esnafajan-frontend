import { useState, useEffect, useRef } from 'react'

const API = import.meta.env.VITE_API_BASE || 'https://esnafajan-backend-production.up.railway.app'

// ─── Routing ──────────────────────────────────────────────────────────────────

export default function App() {
  const path       = window.location.pathname
  const params     = new URLSearchParams(window.location.search)
  const sessionId  = params.get('session_id')

  if (sessionId)       return <SonucEkrani sessionId={sessionId} />
  if (path === '/app') return <UploadEkrani />
  return <LandingPage />
}

// ─── 1. LANDING PAGE ──────────────────────────────────────────────────────────

function LandingPage() {
  return (
    <div style={g.sayfa}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={g.nav}>
        <Logo />
        <button style={g.navBtn} onClick={() => window.location.href = '/app'}>
          Reel Oluştur
        </button>
      </nav>

      {/* HERO */}
      <div style={g.hero}>
        <div style={g.heroBg} />
        <div style={g.heroIc}>
          <div style={g.badge}>
            <span style={g.badgeDot} />
            Yapay Zeka Destekli İçerik Üretimi
          </div>
          <h1 style={g.h1}>
            5 dk ile 30 dk arasında<br />
            <span style={{ color: '#1a7f5a' }}>KOBİnizin Reels'i Hazır</span>
          </h1>
          <p style={g.heroP}>
            Fotoğraflarınızı yükleyin, planınızı seçin. Yapay zeka sizin için
            profesyonel reels, ses ve post metni üretsin.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={g.btnYesil} onClick={() => window.location.href = '/app'}>
              Ücretsiz Başla →
            </button>
            <button style={g.btnBeyaz} onClick={() => document.getElementById('planlar').scrollIntoView({ behavior: 'smooth' })}>
              Planları Gör ↓
            </button>
          </div>
          <div style={g.heroStats}>
            <div style={g.stat}><div style={g.statN}>5 dk</div><div style={g.statL}>En hızlı teslim</div></div>
            <div style={g.stat}><div style={g.statN}>9:16</div><div style={g.statL}>Instagram & TikTok</div></div>
            <div style={g.stat}><div style={g.statN}>3</div><div style={g.statL}>Plan seçeneği</div></div>
          </div>
        </div>
      </div>

      {/* NASIL ÇALIŞIR */}
      <div style={{ background: '#0e1c14', padding: '5rem 2rem' }}>
        <div style={g.kap}>
          <p style={{ ...g.etiket, color: '#6ee6a8' }}>Nasıl Çalışır</p>
          <h2 style={{ ...g.h2, color: '#fff', marginBottom: '2.5rem' }}>3 adımda profesyonel içerik</h2>
          <div style={g.adimGrid}>
            {[
              { n: '01', ikon: '📷', baslik: 'Fotoğraf Yükle', aciklama: '2–5 ürün veya mekan fotoğrafı yeterli. İlk fotoğraf referans çerçeve olur.' },
              { n: '02', ikon: '🎵', baslik: 'Müzik & Plan Seç', aciklama: 'Planınıza uygun seçenekleri belirleyin. Müzik kütüphanemizden trend sesleri seçin.' },
              { n: '03', ikon: '🚀', baslik: 'İçerik Hazır', aciklama: 'Reels videonuz 5–30 dakika içinde hazır. İndirin veya paylaşın.' },
            ].map((a, i) => (
              <div key={i} style={g.adimKart}>
                <div style={g.adimN}>{a.n}</div>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{a.ikon}</div>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{a.baslik}</h3>
                <p style={{ color: '#7a8a80', fontSize: 13, lineHeight: 1.6 }}>{a.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PLANLAR */}
      <div style={{ padding: '5rem 2rem' }} id="planlar">
        <div style={g.kap}>
          <p style={g.etiket}>Planlar</p>
          <h2 style={g.h2}>İşletmenize uygun planı seçin</h2>
          <p style={g.altBaslik}>Ücretsiz planla hemen başlayın, büyüdükçe yükseltin.</p>
          <div style={g.planGrid}>

            <PlanKart
              renk="yesil"
              rozet="🌱 Ücretsiz"
              fiyat="0 ₺"
              sure="/ ay"
              aciklama="Kayıt olmadan, kart gerekmez."
              ozellikler={[
                '5 adet AI fotoğraf profesyonelleştirme',
                '1 adet anlatıcı ses dosyası (15–20 sn)',
                'Sınırsız post metni üretimi',
                'Instagram & TikTok formatı',
              ]}
              butonYazi="Ücretsiz Başla"
              onClick={() => window.location.href = '/app'}
            />

            <PlanKart
              renk="mavi"
              rozet="💎 Premium"
              fiyat="699 ₺"
              sure="/ ay"
              aciklama="Küçük işletmeler için ideal."
              popular={true}
              ozellikler={[
                'Sınırsız post metni üretimi',
                '2 adet 15 saniyelik Reels video',
                '2 adet anlatıcı ses dosyası',
                '5 adet AI fotoğraf profesyonelleştirme',
              ]}
              butonYazi="Premium'a Geç"
              onClick={() => window.location.href = '/app'}
            />

            <PlanKart
              renk="altin"
              rozet="🏆 Gold"
              fiyat="1.399 ₺"
              sure="/ ay"
              aciklama="Büyüyen işletmeler için."
              ozellikler={[
                'Sınırsız post metni üretimi',
                '4 adet haftalık 15 saniyelik Reels',
                '2 adet işletmenize özel müzik',
                '10 adet AI fotoğraf profesyonelleştirme',
                '3 adet anlatıcı ses dosyası',
              ]}
              butonYazi="Gold'a Geç"
              onClick={() => window.location.href = '/app'}
            />

          </div>

          {/* Tek seferlik */}
          <div style={g.tekSeferlik}>
            <span style={{ fontSize: 20 }}>💡</span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: 14, color: '#0d5c3a' }}>Tek seferlik sipariş de verebilirsiniz</strong>
              <p style={{ fontSize: 13, color: '#888', marginTop: 2 }}>15 saniyelik reel 499 ₺ · 30 saniyelik reel 799 ₺ · Abonelik gerekmez</p>
            </div>
            <button style={{ ...g.btnYesil, padding: '9px 18px', fontSize: 13 }} onClick={() => window.location.href = '/app'}>
              Sipariş Ver →
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 2rem 5rem' }}>
        <div style={g.kap}>
          <div style={g.ctaBanner}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              Bugün başlayın, farkı hissedin
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
              Ücretsiz planla kart bilgisi girmeden deneyin.
            </p>
            <button style={{ ...g.btnYesil, background: '#fff', color: '#0d5c3a', padding: '14px 32px', fontSize: 15 }}
              onClick={() => window.location.href = '/app'}>
              Hemen Başla →
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={g.footer}>
        <Logo />
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="/sozlesme" style={g.footerLink}>Kullanım Sözleşmesi</a>
          <a href="/gizlilik" style={g.footerLink}>Gizlilik</a>
          <a href="mailto:tvarzmedya@gmail.com" style={g.footerLink}>İletişim</a>
        </div>
        <span style={{ fontSize: 13, color: '#aaa' }}>© 2025 EsnafAjan</span>
      </div>
    </div>
  )
}

function PlanKart({ renk, rozet, fiyat, sure, aciklama, ozellikler, butonYazi, onClick, popular }) {
  const renkler = {
    yesil: { border: '#dce8e0', rozet: { bg: '#e8f5ee', color: '#0d5c3a' }, btn: { bg: '#e8f5ee', color: '#0d5c3a' } },
    mavi:  { border: '#1a4fff', rozet: { bg: '#e8eeff', color: '#1a4fff' }, btn: { bg: '#1a4fff', color: '#fff'    } },
    altin: { border: '#c9980a', rozet: { bg: '#fdf4dc', color: '#c9980a' }, btn: { bg: '#c9980a', color: '#fff'    } },
  }
  const r = renkler[renk]
  return (
    <div style={{ ...g.planKart, borderColor: r.border, boxShadow: popular ? `0 0 0 3px ${r.border}33` : 'none', position: 'relative' }}>
      {popular && <div style={g.popularTag}>⭐ En Popüler</div>}
      <span style={{ ...g.planRozet, background: r.rozet.bg, color: r.rozet.color }}>{rozet}</span>
      <div style={g.planFiyat}>{fiyat} <span style={{ fontSize: 14, fontWeight: 400, color: '#888' }}>{sure}</span></div>
      <p style={{ fontSize: 13, color: '#888', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>{aciklama}</p>
      <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
        {ozellikler.map((o, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: '#444', padding: '5px 0', borderBottom: '0.5px solid #f5f5f5' }}>
            <span style={{ color: '#1a7f5a' }}>✓</span> {o}
          </li>
        ))}
      </ul>
      <button style={{ ...g.planBtn, background: r.btn.bg, color: r.btn.color }} onClick={onClick}>
        {butonYazi}
      </button>
    </div>
  )
}

// ─── 2. UPLOAD EKRANI ─────────────────────────────────────────────────────────

function UploadEkrani() {
  const [photos, setPhotos]   = useState([])
  const [plan, setPlan]       = useState('15s')
  const [muzikler, setMuzikler] = useState([])
  const [muzik, setMuzik]     = useState(null)
  const [prompt, setPrompt]   = useState('')
  const [yukleniyor, setYuk]  = useState(false)
  const [hata, setHata]       = useState('')
  const [muzikYukl, setMY]    = useState(true)
  const dosyaRef = useRef()
  const audioRef = useRef()

  useEffect(() => {
    fetch(`${API}/api/music/trending`)
      .then(r => r.json())
      .then(d => { setMuzikler(d.tracks || []); setMY(false) })
      .catch(() => setMY(false))
  }, [])

  const fotoDosyaEkle = (dosyalar) => {
    const gecerli = Array.from(dosyalar).filter(f => f.type.startsWith('image/')).slice(0, 5)
    setPhotos(p => [...p, ...gecerli].slice(0, 5))
  }

  const muzikCal = (m) => {
    setMuzik(m)
    if (audioRef.current && m.previewUrl) {
      audioRef.current.src = m.previewUrl
      audioRef.current.play().catch(() => {})
    }
  }

  const gonder = async () => {
    setHata('')
    if (photos.length < 2) return setHata('En az 2 fotoğraf ekleyin.')
    if (!muzik)            return setHata('Müzik seçin.')
    setYuk(true)
    try {
      const form = new FormData()
      photos.forEach(f => form.append('photos', f))
      form.append('plan', plan)
      form.append('musicTrackId', muzik.id)
      form.append('prompt', prompt)

      const res  = await fetch(`${API}/api/session`, { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Sunucu hatası')

      const geriDon = `${window.location.origin}/app?session_id=${data.sessionId}`
      window.location.href = `${data.checkoutUrl}&checkout[redirect_url]=${encodeURIComponent(geriDon)}`
    } catch (err) {
      setHata(err.message)
      setYuk(false)
    }
  }

  return (
    <div style={g.sayfa}>
      <audio ref={audioRef} style={{ display: 'none' }} />
      <nav style={g.nav}>
        <Logo onClick={() => window.location.href = '/'} />
        <button style={g.navBtn} onClick={() => window.location.href = '/'}>← Ana Sayfa</button>
      </nav>

      <div style={{ ...g.kap, padding: '2rem 1.5rem 4rem' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0d3d26', marginBottom: 6 }}>Yeni reel oluştur</h1>
        <p style={{ fontSize: 14, color: '#888', marginBottom: '2rem' }}>Fotoğraflarını yükle, müzik seç, ödemeyi yap — reelin 2–4 dakikada hazır.</p>

        {/* ADIM 1 */}
        <Kart adim="1" baslik="Fotoğrafları yükle" aciklama="2–5 fotoğraf. İlk fotoğraf referans çerçeve olur.">
          <div
            style={{ ...g.dropzone, borderColor: photos.length ? '#1a7f5a' : '#ddd' }}
            onDrop={e => { e.preventDefault(); fotoDosyaEkle(e.dataTransfer.files) }}
            onDragOver={e => e.preventDefault()}
            onClick={() => dosyaRef.current.click()}
          >
            <input ref={dosyaRef} type="file" multiple accept="image/*" style={{ display: 'none' }}
              onChange={e => fotoDosyaEkle(e.target.files)} />
            {photos.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#bbb' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
                <div style={{ fontSize: 14 }}>Sürükle bırak veya tıkla</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>JPG, PNG · Max 10MB · 5 fotoğrafa kadar</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {photos.map((f, i) => (
                  <div key={i} style={{ position: 'relative', width: 88, height: 88 }}>
                    <img src={URL.createObjectURL(f)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                    {i === 0 && <span style={g.refEtiketi}>Referans</span>}
                    <button style={g.silBtn} onClick={e => { e.stopPropagation(); setPhotos(p => p.filter((_, j) => j !== i)) }}>✕</button>
                  </div>
                ))}
                {photos.length < 5 && <div style={g.ekleBtn}><span style={{ color: '#ccc', fontSize: 24 }}>+</span></div>}
              </div>
            )}
          </div>
        </Kart>

        {/* ADIM 2 */}
        <Kart adim="2" baslik="Plan seç" aciklama="Her sipariş ayrı ücretlendirilir. KDV dahil.">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { id: '15s', sure: '15 saniye', fiyat: '499 ₺', not: 'Tek Seedance 2.0 üretimi' },
              { id: '30s', sure: '30 saniye', fiyat: '799 ₺', not: 'Çift Seedance 2.0 üretimi' },
            ].map(p => (
              <button key={p.id}
                style={{ ...g.planSecBtn, ...(plan === p.id ? g.planSecAktif : {}) }}
                onClick={() => setPlan(p.id)}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{p.sure}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#0d3d26', marginBottom: 4 }}>{p.fiyat}</div>
                <div style={{ fontSize: 12, color: '#aaa' }}>{p.not}</div>
              </button>
            ))}
          </div>
        </Kart>

        {/* ADIM 3 */}
        <Kart adim="3" baslik="Müzik seç" aciklama="Telif temizlenmiş müzikler. Önizlemek için tıkla.">
          {muzikYukl ? (
            <div style={{ color: '#aaa', fontSize: 14 }}>Yükleniyor...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 280, overflowY: 'auto' }}>
              {muzikler.map(m => (
                <button key={m.id}
                  style={{ ...g.muzikBtn, ...(muzik?.id === m.id ? g.muzikAktif : {}) }}
                  onClick={() => muzikCal(m)}>
                  <div style={g.muzikKapak}>🎵</div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{m.title}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{m.artist}{m.bpm ? ` · ${m.bpm} BPM` : ''}</div>
                  </div>
                  {muzik?.id === m.id && <span style={{ color: '#1a7f5a', fontSize: 12 }}>▶ Seçildi</span>}
                </button>
              ))}
            </div>
          )}
        </Kart>

        {/* ADIM 4 */}
        <Kart adim="4" baslik="Açıklama (isteğe bağlı)" aciklama="Boş bırakabilirsin.">
          <textarea
            style={g.textarea}
            rows={3}
            placeholder="Örn: Güneşli bir akşam, sıcak ışık, mutlu müşteriler…"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </Kart>

        {hata && <div style={g.hataKutu}>{hata}</div>}

        <button style={{ ...g.gonderBtn, opacity: yukleniyor ? 0.7 : 1 }} onClick={gonder} disabled={yukleniyor}>
          {yukleniyor ? 'Hazırlanıyor...' : `Ödemeye geç — ${plan === '30s' ? '799 ₺' : '499 ₺'}`}
        </button>
        <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 8 }}>
          Lemon Squeezy güvenli ödeme sayfasına yönlendirileceksin.
        </p>
      </div>
    </div>
  )
}

// ─── 3. SONUÇ EKRANI ──────────────────────────────────────────────────────────

function SonucEkrani({ sessionId }) {
  const [durum, setDurum]       = useState('queued')
  const [ilerleme, setIlerleme] = useState(0)
  const [indirUrl, setIndirUrl] = useState(null)
  const [hata, setHata]         = useState(null)
  const timer = useRef()

  useEffect(() => {
    const sorgula = async () => {
      try {
        const res  = await fetch(`${API}/api/session/${sessionId}`)
        const data = await res.json()
        setDurum(data.status || 'queued')
        setIlerleme(data.progress || 0)
        if (data.downloadUrl) setIndirUrl(data.downloadUrl)
        if (data.error)       setHata(data.error)
        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(timer.current)
        }
      } catch {}
    }
    sorgula()
    timer.current = setInterval(sorgula, 5000)
    return () => clearInterval(timer.current)
  }, [sessionId])

  const etiketler = {
    pending_payment: 'Ödeme bekleniyor...',
    queued:          'Sıraya alındı...',
    processing:      'Reel üretiliyor...',
    completed:       'Reelin hazır! 🎉',
    failed:          'Bir hata oluştu',
  }

  return (
    <div style={g.sayfa}>
      <nav style={g.nav}><Logo /></nav>
      <div style={{ ...g.kap, textAlign: 'center', paddingTop: '4rem' }}>
        <div style={{ fontSize: 56, marginBottom: '1rem' }}>
          {durum === 'completed' ? '✅' : durum === 'failed' ? '❌' : '⏳'}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d3d26', marginBottom: 8 }}>
          {etiketler[durum] || 'İşleniyor...'}
        </h2>

        {durum !== 'completed' && durum !== 'failed' && (
          <div style={{ maxWidth: 360, margin: '1.5rem auto' }}>
            <div style={{ height: 8, background: '#e5e5e5', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${ilerleme}%`, background: '#1a7f5a', borderRadius: 4, transition: 'width 0.5s' }} />
            </div>
            <p style={{ fontSize: 13, color: '#aaa', marginTop: 8 }}>{ilerleme}%</p>
          </div>
        )}

        {indirUrl && (
          <a href={indirUrl} download="esnafajan_reel.mp4" style={g.indirBtn}>
            ⬇ Reeli İndir (MP4)
          </a>
        )}

        {(durum === 'completed' || durum === 'failed') && (
          <button style={{ ...g.gonderBtn, maxWidth: 300, margin: '1rem auto 0', display: 'block' }}
            onClick={() => window.location.href = '/app'}>
            Yeni Reel Oluştur
          </button>
        )}

        {hata && <div style={{ ...g.hataKutu, maxWidth: 400, margin: '1rem auto 0' }}>{hata}</div>}
      </div>
    </div>
  )
}

// ─── YARDIMCI BİLEŞENLER ─────────────────────────────────────────────────────

function Logo({ onClick }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <div style={{ width: 36, height: 36, background: '#1a7f5a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📢</div>
      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 19, color: '#0d5c3a' }}>
        Esnaf<span style={{ color: '#1a4fff' }}>Ajan</span>
      </span>
    </div>
  )
}

function Kart({ adim, baslik, aciklama, children }) {
  return (
    <div style={g.kart}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: '1rem' }}>
        <div style={g.adimRozetKucuk}>{adim}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{baslik}</div>
          <div style={{ fontSize: 13, color: '#888' }}>{aciklama}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

// ─── STİLLER ──────────────────────────────────────────────────────────────────

const g = {
  sayfa:      { minHeight: '100vh', background: '#fafdf9', fontFamily: "'DM Sans', sans-serif", color: '#0e1c14' },
  nav:        { position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: 64, background: 'rgba(250,253,249,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #dce8e0' },
  navBtn:     { background: '#1a7f5a', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  kap:        { maxWidth: 960, margin: '0 auto', padding: '0 1.5rem' },

  hero:       { position: 'relative', padding: '5rem 2rem 4rem', textAlign: 'center', overflow: 'hidden' },
  heroBg:     { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% -10%, #c8f0dc, transparent 70%), radial-gradient(ellipse 40% 30% at 90% 80%, #dce8ff, transparent 60%)' },
  heroIc:     { position: 'relative', zIndex: 1 },
  badge:      { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e8f5ee', border: '1px solid #a8dcc0', borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 600, color: '#0d5c3a', marginBottom: '1.5rem' },
  badgeDot:   { width: 6, height: 6, background: '#1a7f5a', borderRadius: '50%' },
  h1:         { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' },
  heroP:      { fontSize: 'clamp(1rem,2vw,1.1rem)', color: '#3a4a40', maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.7 },
  heroStats:  { display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '3rem', flexWrap: 'wrap' },
  stat:       { textAlign: 'center' },
  statN:      { fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#0d5c3a' },
  statL:      { fontSize: 13, color: '#7a8a80', marginTop: 2 },

  btnYesil:   { background: '#1a7f5a', color: '#fff', border: 'none', borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  btnBeyaz:   { background: '#fff', color: '#0e1c14', border: '1.5px solid #dce8e0', borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 500, cursor: 'pointer' },

  etiket:     { fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#1a7f5a', display: 'block', marginBottom: 6 },
  h2:         { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, marginBottom: '.5rem' },
  altBaslik:  { fontSize: 15, color: '#7a8a80', marginBottom: '2.5rem' },

  adimGrid:   { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 2, background: '#2a3a30', border: '2px solid #2a3a30', borderRadius: 14, overflow: 'hidden' },
  adimKart:   { background: '#131e17', padding: '2rem 1.75rem' },
  adimN:      { fontFamily: 'Syne, sans-serif', fontSize: '3rem', fontWeight: 800, color: '#2a3a30', lineHeight: 1, marginBottom: 10 },

  planGrid:   { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 20, marginBottom: '1.5rem' },
  planKart:   { background: '#fff', border: '1.5px solid #dce8e0', borderRadius: 14, padding: '2rem' },
  planRozet:  { display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, marginBottom: '1rem' },
  planFiyat:  { fontFamily: 'Syne, sans-serif', fontSize: '2.4rem', fontWeight: 800, marginBottom: 6 },
  planBtn:    { width: '100%', border: 'none', borderRadius: 8, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  popularTag: { position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: '#1a7f5a', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 999, whiteSpace: 'nowrap' },

  tekSeferlik: { background: '#e8f5ee', border: '1px solid #a8dcc0', borderRadius: 8, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },

  ctaBanner:  { background: 'linear-gradient(135deg, #0d5c3a, #0a3d5c)', borderRadius: 16, padding: '3.5rem 2rem', textAlign: 'center' },

  footer:     { borderTop: '1px solid #dce8e0', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', maxWidth: 960, margin: '0 auto' },
  footerLink: { fontSize: 13, color: '#7a8a80', textDecoration: 'none' },

  // Upload ekranı
  kart:         { background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' },
  adimRozetKucuk: { width: 28, height: 28, minWidth: 28, background: '#e3f2fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#1565c0' },
  dropzone:     { border: '2px dashed', borderRadius: 10, padding: '1.5rem', cursor: 'pointer', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  refEtiketi:   { position: 'absolute', bottom: 4, left: 4, background: '#1a7f5a', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 4 },
  silBtn:       { position: 'absolute', top: -6, right: -6, width: 20, height: 20, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', fontSize: 10, cursor: 'pointer' },
  ekleBtn:      { width: 88, height: 88, border: '2px dashed #e5e5e5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  planSecBtn:   { background: '#fff', border: '1.5px solid #e5e5e5', borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left' },
  planSecAktif: { border: '2px solid #1a7f5a', background: '#f0faf5' },
  muzikBtn:     { display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', width: '100%' },
  muzikAktif:   { border: '2px solid #1a7f5a', background: '#f0faf5' },
  muzikKapak:   { width: 40, height: 40, borderRadius: 6, background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 },
  textarea:     { width: '100%', border: '0.5px solid #e5e5e5', borderRadius: 8, padding: '0.75rem', fontSize: 14, fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box' },
  hataKutu:     { background: '#fef2f2', border: '0.5px solid #fca5a5', borderRadius: 8, padding: '0.75rem 1rem', fontSize: 14, color: '#dc2626', marginBottom: '1rem' },
  gonderBtn:    { width: '100%', background: '#1a7f5a', color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
  indirBtn:     { display: 'inline-block', background: '#1a7f5a', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 15, fontWeight: 700, marginBottom: '1rem' },
}
