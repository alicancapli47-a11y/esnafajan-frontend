import { useState, useEffect, useRef } from 'react'

const API = import.meta.env.VITE_API_BASE || 'https://esnafajan-backend-production.up.railway.app'

// ─── ROUTING ─────────────────────────────────────────────────────────────────

export default function App() {
  const path   = window.location.pathname
  const params = new URLSearchParams(window.location.search)
  const sid    = params.get('session_id')

  if (sid)                    return <Sonuc sessionId={sid} />
  if (path === '/yorum')      return <YorumEkrani />
  if (path === '/reels')      return <ReelsEkrani />
  return <Landing />
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────

function Landing() {
  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <nav style={s.nav}><Logo /></nav>

      {/* HERO */}
      <div style={s.hero}>
        <div style={s.heroBg}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={s.badge}><span style={s.dot}/>Yapay Zeka Destekli İçerik Üretimi</div>
          <h1 style={s.h1}>KOBİniz için<br/><span style={{color:'#1a7f5a'}}>Profesyonel Video İçerik</span></h1>
          <p style={s.heroP}>Google yorumlarınızı videoya dönüştürün veya fotoğraflarınızdan otomatik reels üretin. 5 dakikada hazır.</p>

          {/* İKİ ANA BUTON */}
          <div style={s.cardGrid}>
            <div style={s.productCard} onClick={() => window.location.href='/yorum'}>
              <div style={s.productIcon}>⭐</div>
              <h2 style={s.productTitle}>Google Yorum Videosu</h2>
              <p style={s.productDesc}>Müşteri yorumunu yapıştır, yapay zeka videoya dönüştürsün. Ses, arka plan, watermark — hepsi dahil.</p>
              <div style={s.productPrice}>150 ₺ / video</div>
              <button style={{...s.btnGreen, width:'100%', marginTop:'1rem'}}>Başla →</button>
            </div>

            <div style={{...s.productCard, borderColor:'#1a4fff'}} onClick={() => window.location.href='/reels'}>
              <div style={{...s.productIcon, background:'#e8eeff'}}>🎬</div>
              <h2 style={s.productTitle}>Otomatik Reels</h2>
              <p style={s.productDesc}>Fotoğraflarını yükle, müzik seç. Seedance 2.0 ile 9:16 formatında sinematik reels üret.</p>
              <div style={{...s.productPrice, color:'#1a4fff'}}>499 ₺ / 15sn</div>
              <button style={{...s.btnBlue, width:'100%', marginTop:'1rem'}}>Başla →</button>
            </div>
          </div>
        </div>
      </div>

      {/* NASIL ÇALIŞIR */}
      <div style={{background:'#0e1c14', padding:'5rem 2rem'}}>
        <div style={s.container}>
          <p style={{...s.tag, color:'#6ee6a8'}}>Nasıl Çalışır</p>
          <h2 style={{...s.h2, color:'#fff', marginBottom:'2.5rem'}}>Birkaç adımda profesyonel içerik</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, background:'#2a3a30', border:'2px solid #2a3a30', borderRadius:14, overflow:'hidden'}}>
            <div style={{background:'#131e17', padding:'2rem'}}>
              <div style={{fontSize:32, marginBottom:16}}>⭐</div>
              <h3 style={{color:'#6ee6a8', fontSize:14, fontWeight:700, marginBottom:12, textTransform:'uppercase', letterSpacing:1}}>Google Yorum Videosu</h3>
              {['Google yorumunu yapıştır','Ses karakterini seç (Kadın/Erkek)','Mekan fotoğraflarını yükle','Video 5 dakikada hazır'].map((t,i)=>(
                <div key={i} style={{display:'flex', gap:10, marginBottom:10}}>
                  <span style={{color:'#1a7f5a', fontWeight:700, minWidth:20}}>{i+1}.</span>
                  <span style={{color:'#8a9a90', fontSize:14}}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{background:'#131e17', padding:'2rem', borderLeft:'2px solid #2a3a30'}}>
              <div style={{fontSize:32, marginBottom:16}}>🎬</div>
              <h3 style={{color:'#93b4ff', fontSize:14, fontWeight:700, marginBottom:12, textTransform:'uppercase', letterSpacing:1}}>Otomatik Reels</h3>
              {['2-5 ürün/mekan fotoğrafı yükle','Plan seç (15sn veya 30sn)','Müzik seç','Seedance 2.0 videoyu üretir'].map((t,i)=>(
                <div key={i} style={{display:'flex', gap:10, marginBottom:10}}>
                  <span style={{color:'#1a4fff', fontWeight:700, minWidth:20}}>{i+1}.</span>
                  <span style={{color:'#8a9a90', fontSize:14}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FİYATLAR */}
      <div style={{padding:'5rem 2rem'}}>
        <div style={s.container}>
          <p style={s.tag}>Fiyatlandırma</p>
          <h2 style={s.h2}>Net fiyat, sürpriz yok</h2>
          <p style={{fontSize:15, color:'#7a8a80', marginBottom:'2.5rem'}}>Abonelik yok. Her içerik ayrı ücretlendirilir.</p>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:16}}>
            {[
              {baslik:'Google Yorum Videosu', fiyat:'150 ₺', alt:'Tek video', renk:'#1a7f5a', bg:'#e8f5ee'},
              {baslik:'3\'lü Yorum Paketi',   fiyat:'399 ₺', alt:'133 ₺/video', renk:'#1a7f5a', bg:'#e8f5ee'},
              {baslik:'10\'lu Yorum Paketi',  fiyat:'999 ₺', alt:'99 ₺/video',  renk:'#c9980a', bg:'#fdf4dc'},
              {baslik:'Reels 15 saniye',      fiyat:'499 ₺', alt:'Tek reel',    renk:'#1a4fff', bg:'#e8eeff'},
              {baslik:'Reels 30 saniye',      fiyat:'799 ₺', alt:'Tek reel',    renk:'#1a4fff', bg:'#e8eeff'},
            ].map((p,i)=>(
              <div key={i} style={{background:'#fff', border:`1.5px solid ${p.renk}22`, borderRadius:12, padding:'1.5rem'}}>
                <span style={{display:'inline-block', background:p.bg, color:p.renk, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, marginBottom:10}}>{p.baslik}</span>
                <div style={{fontFamily:'Syne, sans-serif', fontSize:'2rem', fontWeight:800, color:'#0e1c14'}}>{p.fiyat}</div>
                <div style={{fontSize:13, color:'#888', marginTop:4}}>{p.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{padding:'0 2rem 5rem'}}>
        <div style={s.container}>
          <div style={{background:'linear-gradient(135deg, #0d5c3a, #0a3d5c)', borderRadius:16, padding:'3.5rem 2rem', textAlign:'center'}}>
            <h2 style={{fontFamily:'Syne, sans-serif', fontSize:24, fontWeight:800, color:'#fff', marginBottom:8}}>Bugün başlayın</h2>
            <p style={{color:'rgba(255,255,255,0.7)', marginBottom:'1.5rem'}}>Sosyal medya ajansına gerek yok.</p>
            <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
              <button style={{...s.btnGreen, background:'#fff', color:'#0d5c3a', padding:'13px 28px'}} onClick={()=>window.location.href='/yorum'}>Google Yorum Videosu →</button>
              <button style={{...s.btnBlue, background:'rgba(255,255,255,0.15)', color:'#fff', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px'}} onClick={()=>window.location.href='/reels'}>Otomatik Reels →</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{...s.footer, maxWidth:960, margin:'0 auto'}}>
        <Logo/>
        <div style={{display:'flex', gap:'1.5rem'}}>
          <a href="/sozlesme" style={s.footerLink}>Kullanım Sözleşmesi</a>
          <a href="/gizlilik" style={s.footerLink}>Gizlilik</a>
          <a href="mailto:tvarzmedya@gmail.com" style={s.footerLink}>İletişim</a>
        </div>
        <span style={{fontSize:13, color:'#aaa'}}>© 2025 EsnafAjan</span>
      </div>
    </div>
  )
}

// ─── GOOGLE YORUM EKRANI ──────────────────────────────────────────────────────

function YorumEkrani() {
  const params = new URLSearchParams(window.location.search)
  const [photos, setPhotos]   = useState([])
  const [yorum, setYorum]     = useState('')
  const [ses, setSes]         = useState('kadin')
  const [isletme, setIsletme] = useState('')
  const [paket, setPaket]     = useState(params.get('paket') || 'yorum_tek')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const ref = useRef()

  const fotoEkle = (f) => setPhotos(p => [...p, ...Array.from(f).filter(x=>x.type.startsWith('image/')).slice(0,5)].slice(0,5))

  const gonder = async () => {
    setError('')
    if (!photos.length)           return setError('En az 1 fotoğraf ekleyin.')
    if (yorum.trim().length < 10) return setError('Yorum çok kısa.')
    setLoading(true)
    try {
      const form = new FormData()
      photos.forEach(f => form.append('photos', f))
      form.append('yorum', yorum)
      form.append('sesSecimi', ses)
      form.append('isletme', isletme)
      form.append('paket', paket)
      const res  = await fetch(`${API}/api/session/yorum`, { method:'POST', body:form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      const geri = `${location.origin}/yorum?session_id=${data.sessionId}`
      window.location.href = `${data.checkoutUrl}&checkout[redirect_url]=${encodeURIComponent(geri)}`
    } catch(e) { setError(e.message); setLoading(false) }
  }

  const fiyatlar = {yorum_tek:'150 ₺', yorum_uc:'399 ₺', yorum_on:'999 ₺'}

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <Logo onClick={()=>window.location.href='/'}/>
        <button style={s.backBtn} onClick={()=>window.location.href='/'}>← Geri</button>
      </nav>
      <div style={{...s.container, padding:'2rem 1.5rem 4rem'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
          <span style={{fontSize:28}}>⭐</span>
          <h1 style={{fontSize:22, fontWeight:700, color:'#0d3d26'}}>Google Yorum Videosu</h1>
        </div>
        <p style={{fontSize:14, color:'#888', marginBottom:'2rem'}}>Müşteri yorumunu yapıştır, sesi seç, fotoğraf ekle — 5 dakikada video hazır.</p>

        <Step n="1" title="Paket seç" desc="Kaç video üretmek istiyorsunuz?">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10}}>
            {[{id:'yorum_tek',label:'Tek Video',fiyat:'150 ₺',alt:'1 yorum'},{id:'yorum_uc',label:"3'lü Paket",fiyat:'399 ₺',alt:'133 ₺/video'},{id:'yorum_on',label:"10'lu Paket",fiyat:'999 ₺',alt:'99 ₺/video'}].map(p=>(
              <button key={p.id} style={{...s.selBtn, ...(paket===p.id?s.selActive:{})}} onClick={()=>setPaket(p.id)}>
                <div style={{fontSize:12,color:'#888',marginBottom:4}}>{p.label}</div>
                <div style={{fontSize:20,fontWeight:700,color:'#0d3d26'}}>{p.fiyat}</div>
                <div style={{fontSize:11,color:'#aaa',marginTop:2}}>{p.alt}</div>
              </button>
            ))}
          </div>
        </Step>

        <Step n="2" title="Google yorumunu yapıştır" desc="Yapay zeka yorumu işletme ağzından düzenleyecek.">
          <textarea style={{...s.textarea, minHeight:110}} placeholder={'"Muhteşem bir mekan, personel çok ilgili. Yemekler harika! ⭐⭐⭐⭐⭐"'} value={yorum} onChange={e=>setYorum(e.target.value)}/>
          {yorum.length>0 && <p style={{fontSize:11,color:'#aaa',marginTop:4}}>{yorum.length} karakter</p>}
        </Step>

        <Step n="3" title="İşletme adı (isteğe bağlı)" desc="Daha kişiselleştirilmiş metin için ekleyin.">
          <input style={s.input} placeholder="Örn: Cafe Bosphorus, Kebapçı Usta..." value={isletme} onChange={e=>setIsletme(e.target.value)}/>
        </Step>

        <Step n="4" title="Ses karakteri seç" desc="Yorumu okuyacak ses.">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10}}>
            {[{id:'kadin',label:'Kadın',icon:'👩'},{id:'gencErkek',label:'Genç Erkek',icon:'👨'},{id:'yasliErkek',label:'Olgun Erkek',icon:'🧔'}].map(v=>(
              <button key={v.id} style={{...s.selBtn, ...(ses===v.id?s.selActive:{}), textAlign:'center'}} onClick={()=>setSes(v.id)}>
                <div style={{fontSize:28,marginBottom:6}}>{v.icon}</div>
                <div style={{fontSize:13,fontWeight:600}}>{v.label}</div>
              </button>
            ))}
          </div>
        </Step>

        <Step n="5" title="Mekan fotoğrafları yükle" desc="1–5 fotoğraf. Arka plan videosu bu fotoğraflardan üretilir.">
          <Dropzone photos={photos} onAdd={fotoEkle} onRemove={i=>setPhotos(p=>p.filter((_,j)=>j!==i))} inputRef={ref}/>
        </Step>

        {error && <div style={s.errorBox}>{error}</div>}
        <button style={{...s.submitBtn, opacity:loading?0.7:1}} onClick={gonder} disabled={loading}>
          {loading ? 'Hazırlanıyor...' : `Ödemeye geç — ${fiyatlar[paket]}`}
        </button>
        <p style={{fontSize:12,color:'#aaa',textAlign:'center',marginTop:8}}>Lemon Squeezy güvenli ödeme · KDV dahil</p>
      </div>
    </div>
  )
}

// ─── REELS EKRANI ─────────────────────────────────────────────────────────────

function ReelsEkrani() {
  const [photos, setPhotos]   = useState([])
  const [plan, setPlan]       = useState('reels_15s')
  const [muzikler, setMuzikler] = useState([])
  const [muzik, setMuzik]     = useState(null)
  const [prompt, setPrompt]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [mLoading, setML]     = useState(true)
  const ref   = useRef()
  const audio = useRef()

  useEffect(()=>{
    fetch(`${API}/api/music`).then(r=>r.json()).then(d=>{setMuzikler(d.tracks||[]);setML(false)}).catch(()=>setML(false))
  },[])

  const fotoEkle = (f) => setPhotos(p => [...p, ...Array.from(f).filter(x=>x.type.startsWith('image/')).slice(0,5)].slice(0,5))

  const calMuzik = (m) => {
    setMuzik(m)
    if (audio.current && m.previewUrl) { audio.current.src = m.previewUrl; audio.current.play().catch(()=>{}) }
  }

  const gonder = async () => {
    setError('')
    if (photos.length < 2) return setError('En az 2 fotoğraf ekleyin.')
    if (!muzik)            return setError('Müzik seçin.')
    setLoading(true)
    try {
      const form = new FormData()
      photos.forEach(f=>form.append('photos',f))
      form.append('plan', plan)
      form.append('musicTrackId', muzik.id)
      form.append('prompt', prompt)
      const res  = await fetch(`${API}/api/session/reels`, { method:'POST', body:form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      const geri = `${location.origin}/reels?session_id=${data.sessionId}`
      window.location.href = `${data.checkoutUrl}&checkout[redirect_url]=${encodeURIComponent(geri)}`
    } catch(e) { setError(e.message); setLoading(false) }
  }

  return (
    <div style={s.page}>
      <audio ref={audio} style={{display:'none'}}/>
      <nav style={s.nav}>
        <Logo onClick={()=>window.location.href='/'}/>
        <button style={s.backBtn} onClick={()=>window.location.href='/'}>← Geri</button>
      </nav>
      <div style={{...s.container, padding:'2rem 1.5rem 4rem'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
          <span style={{fontSize:28}}>🎬</span>
          <h1 style={{fontSize:22, fontWeight:700, color:'#0d3d26'}}>Otomatik Reels</h1>
        </div>
        <p style={{fontSize:14, color:'#888', marginBottom:'2rem'}}>Fotoğraflarını yükle, müzik seç — Seedance 2.0 ile 9:16 reel hazır.</p>

        <Step n="1" title="Fotoğrafları yükle" desc="2–5 fotoğraf. İlk fotoğraf referans çerçeve olur.">
          <Dropzone photos={photos} onAdd={fotoEkle} onRemove={i=>setPhotos(p=>p.filter((_,j)=>j!==i))} inputRef={ref} minLabel="En az 2 fotoğraf"/>
        </Step>

        <Step n="2" title="Plan seç" desc="Her sipariş ayrı ücretlendirilir. KDV dahil.">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            {[{id:'reels_15s',sure:'15 saniye',fiyat:'499 ₺'},{id:'reels_30s',sure:'30 saniye',fiyat:'799 ₺'}].map(p=>(
              <button key={p.id} style={{...s.selBtn, ...(plan===p.id?{...s.selActive,borderColor:'#1a4fff',background:'#f0f4ff'}:{})}} onClick={()=>setPlan(p.id)}>
                <div style={{fontSize:13,color:'#888',marginBottom:4}}>{p.sure}</div>
                <div style={{fontSize:24,fontWeight:700,color:'#0d3d26'}}>{p.fiyat}</div>
              </button>
            ))}
          </div>
        </Step>

        <Step n="3" title="Müzik seç" desc="Önizlemek için tıkla.">
          {mLoading ? <p style={{color:'#aaa',fontSize:14}}>Yükleniyor...</p> : (
            <div style={{display:'flex',flexDirection:'column',gap:6,maxHeight:260,overflowY:'auto'}}>
              {muzikler.map(m=>(
                <button key={m.id} style={{...s.trackBtn, ...(muzik?.id===m.id?s.trackActive:{})}} onClick={()=>calMuzik(m)}>
                  <div style={s.trackCover}>🎵</div>
                  <div style={{flex:1,textAlign:'left'}}>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{m.title}</div>
                    <div style={{fontSize:12,color:'#888'}}>{m.artist}{m.bpm?` · ${m.bpm} BPM`:''}</div>
                  </div>
                  {muzik?.id===m.id && <span style={{color:'#1a7f5a',fontSize:12}}>▶ Seçildi</span>}
                </button>
              ))}
            </div>
          )}
        </Step>

        <Step n="4" title="Açıklama (isteğe bağlı)" desc="Boş bırakabilirsin.">
          <textarea style={s.textarea} rows={3} placeholder="Örn: Güneşli bir akşam, sıcak ışık..." value={prompt} onChange={e=>setPrompt(e.target.value)}/>
        </Step>

        {error && <div style={s.errorBox}>{error}</div>}
        <button style={{...s.submitBtnBlue, opacity:loading?0.7:1}} onClick={gonder} disabled={loading}>
          {loading ? 'Hazırlanıyor...' : `Ödemeye geç — ${plan==='reels_30s'?'799 ₺':'499 ₺'}`}
        </button>
        <p style={{fontSize:12,color:'#aaa',textAlign:'center',marginTop:8}}>Lemon Squeezy güvenli ödeme · KDV dahil</p>
      </div>
    </div>
  )
}

// ─── SONUÇ EKRANI ─────────────────────────────────────────────────────────────

function Sonuc({ sessionId }) {
  const [durum, setDurum]   = useState('queued')
  const [ilerleme, setIl]   = useState(0)
  const [asama, setAsama]   = useState('')
  const [url, setUrl]       = useState(null)
  const [metin, setMetin]   = useState(null)
  const [hata, setHata]     = useState(null)
  const timer = useRef()

  useEffect(()=>{
    const poll = async () => {
      try {
        const r = await fetch(`${API}/api/session/${sessionId}`)
        const d = await r.json()
        setDurum(d.status||'queued')
        setIl(d.progress||0)
        if (d.asama) setAsama(d.asama)
        if (d.downloadUrl) setUrl(d.downloadUrl)
        if (d.temizMetin)  setMetin(d.temizMetin)
        if (d.error)       setHata(d.error)
        if (d.status==='completed'||d.status==='failed') clearInterval(timer.current)
      } catch {}
    }
    poll(); timer.current = setInterval(poll, 5000)
    return ()=>clearInterval(timer.current)
  },[sessionId])

  const etiket = {pending_payment:'Ödeme bekleniyor...',queued:'Sıraya alındı...',processing:asama||'Video üretiliyor...',completed:'Videon hazır! 🎉',failed:'Bir hata oluştu'}
  const icon   = durum==='completed'?'✅':durum==='failed'?'❌':'⏳'

  return (
    <div style={s.page}>
      <nav style={s.nav}><Logo/></nav>
      <div style={{...s.container, textAlign:'center', paddingTop:'4rem'}}>
        <div style={{fontSize:56, marginBottom:'1rem'}}>{icon}</div>
        <h2 style={{fontSize:22, fontWeight:700, color:'#0d3d26', marginBottom:8}}>{etiket[durum]||'İşleniyor...'}</h2>

        {durum!=='completed'&&durum!=='failed'&&(
          <div style={{maxWidth:360, margin:'1.5rem auto'}}>
            <div style={{height:8, background:'#e5e5e5', borderRadius:4, overflow:'hidden'}}>
              <div style={{height:'100%', width:`${ilerleme}%`, background:'#1a7f5a', borderRadius:4, transition:'width 0.5s'}}/>
            </div>
            <p style={{fontSize:13, color:'#aaa', marginTop:8}}>{asama||`%${ilerleme}`}</p>
          </div>
        )}

        {metin&&(
          <div style={{background:'#f0faf5', border:'1px solid #a8dcc0', borderRadius:10, padding:'1rem 1.5rem', maxWidth:480, margin:'1rem auto', textAlign:'left'}}>
            <p style={{fontSize:11, fontWeight:700, color:'#1a7f5a', marginBottom:6, textTransform:'uppercase', letterSpacing:1}}>AI düzenlenmiş metin</p>
            <p style={{fontSize:14, color:'#0d3d26', lineHeight:1.6}}>{metin}</p>
          </div>
        )}

        {url&&<a href={url} download="esnafajan.mp4" style={{...s.btnGreen, display:'inline-block', textDecoration:'none', padding:'14px 32px', fontSize:15, fontWeight:700, borderRadius:10, marginTop:'1.5rem'}}>⬇ Videoyu İndir (MP4)</a>}

        {(durum==='completed'||durum==='failed')&&(
          <button style={{...s.submitBtn, maxWidth:280, margin:'1rem auto 0', display:'block'}} onClick={()=>window.location.href='/'}>
            Ana Sayfaya Dön
          </button>
        )}

        {hata&&<div style={{...s.errorBox, maxWidth:400, margin:'1rem auto 0'}}>{hata}</div>}
      </div>
    </div>
  )
}

// ─── YARDIMCI BİLEŞENLER ─────────────────────────────────────────────────────

function Logo({onClick}) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, cursor:onClick?'pointer':'default'}} onClick={onClick}>
      <div style={{width:36, height:36, background:'#1a7f5a', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18}}>📢</div>
      <span style={{fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:19, color:'#0d5c3a'}}>Esnaf<span style={{color:'#1a4fff'}}>Ajan</span></span>
    </div>
  )
}

function Step({n, title, desc, children}) {
  return (
    <div style={s.card}>
      <div style={{display:'flex', alignItems:'flex-start', gap:12, marginBottom:'1rem'}}>
        <div style={s.stepBadge}>{n}</div>
        <div><div style={{fontSize:15, fontWeight:600, marginBottom:2}}>{title}</div><div style={{fontSize:13, color:'#888'}}>{desc}</div></div>
      </div>
      {children}
    </div>
  )
}

function Dropzone({photos, onAdd, onRemove, inputRef, minLabel}) {
  return (
    <div style={{border:'2px dashed', borderColor:photos.length?'#1a7f5a':'#ddd', borderRadius:10, padding:'1.5rem', cursor:'pointer', minHeight:110, display:'flex', alignItems:'center', justifyContent:'center'}}
      onDrop={e=>{e.preventDefault();onAdd(e.dataTransfer.files)}} onDragOver={e=>e.preventDefault()} onClick={()=>inputRef.current.click()}>
      <input ref={inputRef} type="file" multiple accept="image/*" style={{display:'none'}} onChange={e=>onAdd(e.target.files)}/>
      {photos.length===0?(
        <div style={{textAlign:'center', color:'#bbb'}}>
          <div style={{fontSize:36, marginBottom:8}}>📷</div>
          <div style={{fontSize:14}}>Sürükle bırak veya tıkla</div>
          <div style={{fontSize:12, marginTop:4}}>{minLabel||'JPG, PNG · Max 10MB'}</div>
        </div>
      ):(
        <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
          {photos.map((f,i)=>(
            <div key={i} style={{position:'relative', width:88, height:88}}>
              <img src={URL.createObjectURL(f)} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:8}}/>
              {i===0&&<span style={{position:'absolute', bottom:4, left:4, background:'#1a7f5a', color:'#fff', fontSize:9, fontWeight:700, padding:'2px 5px', borderRadius:4}}>Ref</span>}
              <button style={s.removeBtn} onClick={e=>{e.stopPropagation();onRemove(i)}}>✕</button>
            </div>
          ))}
          {photos.length<5&&<div style={{width:88, height:88, border:'2px dashed #e5e5e5', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center'}}><span style={{color:'#ccc', fontSize:24}}>+</span></div>}
        </div>
      )}
    </div>
  )
}

// ─── STİLLER ──────────────────────────────────────────────────────────────────

const s = {
  page:      {minHeight:'100vh', background:'#fafdf9', fontFamily:"'DM Sans', sans-serif", color:'#0e1c14'},
  nav:       {position:'sticky', top:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 2rem', height:64, background:'rgba(250,253,249,0.92)', backdropFilter:'blur(16px)', borderBottom:'1px solid #dce8e0'},
  backBtn:   {background:'transparent', color:'#1a7f5a', border:'1px solid #1a7f5a', borderRadius:8, padding:'8px 16px', fontSize:14, cursor:'pointer'},
  container: {maxWidth:720, margin:'0 auto', padding:'0 1.5rem'},
  hero:      {position:'relative', padding:'5rem 2rem 4rem', textAlign:'center', overflow:'hidden'},
  heroBg:    {position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% -10%, #c8f0dc, transparent 70%), radial-gradient(ellipse 40% 30% at 90% 80%, #dce8ff, transparent 60%)'},
  badge:     {display:'inline-flex', alignItems:'center', gap:6, background:'#e8f5ee', border:'1px solid #a8dcc0', borderRadius:999, padding:'5px 14px', fontSize:12, fontWeight:600, color:'#0d5c3a', marginBottom:'1.5rem'},
  dot:       {width:6, height:6, background:'#1a7f5a', borderRadius:'50%'},
  h1:        {fontFamily:'Syne, sans-serif', fontSize:'clamp(1.8rem,4vw,3rem)', fontWeight:800, lineHeight:1.2, marginBottom:'1rem'},
  heroP:     {fontSize:'clamp(1rem,2vw,1.1rem)', color:'#3a4a40', maxWidth:520, margin:'0 auto 2rem', lineHeight:1.7},
  h2:        {fontFamily:'Syne, sans-serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, marginBottom:'.5rem'},
  tag:       {fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'#1a7f5a', display:'block', marginBottom:6},
  cardGrid:  {display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:20, maxWidth:700, margin:'2.5rem auto 0'},
  productCard: {background:'#fff', border:'2px solid #dce8e0', borderRadius:16, padding:'2rem', cursor:'pointer', textAlign:'left', transition:'transform 0.2s, box-shadow 0.2s'},
  productIcon: {width:48, height:48, background:'#e8f5ee', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:'1rem'},
  productTitle:{fontFamily:'Syne, sans-serif', fontSize:20, fontWeight:800, color:'#0d3d26', marginBottom:8},
  productDesc: {fontSize:14, color:'#7a8a80', lineHeight:1.6, marginBottom:12},
  productPrice:{fontFamily:'Syne, sans-serif', fontSize:18, fontWeight:700, color:'#1a7f5a'},
  btnGreen:  {background:'#1a7f5a', color:'#fff', border:'none', borderRadius:8, padding:'12px 24px', fontSize:14, fontWeight:600, cursor:'pointer'},
  btnBlue:   {background:'#1a4fff', color:'#fff', border:'none', borderRadius:8, padding:'12px 24px', fontSize:14, fontWeight:600, cursor:'pointer'},
  footer:    {borderTop:'1px solid #dce8e0', padding:'2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem'},
  footerLink:{fontSize:13, color:'#7a8a80', textDecoration:'none'},
  card:      {background:'#fff', border:'0.5px solid #e5e5e5', borderRadius:12, padding:'1.5rem', marginBottom:'1rem'},
  stepBadge: {width:28, height:28, minWidth:28, background:'#e3f2fd', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#1565c0'},
  selBtn:    {background:'#fff', border:'1.5px solid #e5e5e5', borderRadius:10, padding:'1rem', cursor:'pointer', textAlign:'center'},
  selActive: {border:'2px solid #1a7f5a', background:'#f0faf5'},
  input:     {width:'100%', border:'0.5px solid #e5e5e5', borderRadius:8, padding:'10px 14px', fontSize:14, fontFamily:'inherit', outline:'none', boxSizing:'border-box'},
  textarea:  {width:'100%', border:'0.5px solid #e5e5e5', borderRadius:8, padding:'0.75rem', fontSize:14, fontFamily:'inherit', resize:'vertical', outline:'none', boxSizing:'border-box'},
  errorBox:  {background:'#fef2f2', border:'0.5px solid #fca5a5', borderRadius:8, padding:'0.75rem 1rem', fontSize:14, color:'#dc2626', marginBottom:'1rem'},
  submitBtn: {width:'100%', background:'#1a7f5a', color:'#fff', border:'none', borderRadius:10, padding:14, fontSize:15, fontWeight:700, cursor:'pointer'},
  submitBtnBlue: {width:'100%', background:'#1a4fff', color:'#fff', border:'none', borderRadius:10, padding:14, fontSize:15, fontWeight:700, cursor:'pointer'},
  removeBtn: {position:'absolute', top:-6, right:-6, width:20, height:20, background:'#ef4444', color:'#fff', border:'none', borderRadius:'50%', fontSize:10, cursor:'pointer'},
  trackBtn:  {display:'flex', alignItems:'center', gap:12, background:'#fff', border:'0.5px solid #e5e5e5', borderRadius:8, padding:'0.75rem', cursor:'pointer', width:'100%'},
  trackActive:{border:'2px solid #1a7f5a', background:'#f0faf5'},
  trackCover:{width:40, height:40, borderRadius:6, background:'#e3f2fd', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0},
}
