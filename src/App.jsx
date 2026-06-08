import { useState } from "react";

const RESTAURANTS = [
  {
    id: 1,
    name: "Phở Chuyên Bò (Khôi Hói)",
    address: "50 Hàng Vải",
    district: "Phố Cổ",
    type: "Phở Bò",
    price: "50–100k",
    priceNum: 75,
    editorial: "Khôi Hói — tên gọi thân thuộc từ mái đầu trọc của chủ quán. Đây là một trong những tô phở bò hiếm có ở Hà Nội với nhiều phần thịt đặc biệt như gân gót bò. Khách tự chọn độ chín theo sở thích.",
    mustTry: ["Tái lăn", "Bắp bò", "Lõi bò", "Gàu giòn"],
    badges: { ac: true, parking: false, privateRoom: false, lateNight: false },
    scores: { food: 4.2, service: 3.5, space: 3.0 },
    featured: true,
    emoji: "🍜",
    img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80",
  },
  {
    id: 2,
    name: "Phở Gà Ta (Phở Hương)",
    address: "35 Tô Hiến Thành",
    district: "Hai Bà Trưng",
    type: "Phở Gà",
    price: "40–60k",
    priceNum: 50,
    editorial: "Không phải quán phở gà nào cũng dùng lá chanh — và đó chính là điều làm nên sự khác biệt của Phở Hương. Vị thanh dịu, thơm nhẹ, đúng kiểu phở gà truyền thống Hà Nội.",
    mustTry: ["Đùi gà", "Tràng trứng"],
    badges: { ac: true, parking: false, privateRoom: false, lateNight: false },
    scores: { food: 4.0, service: 3.8, space: 3.2 },
    featured: true,
    emoji: "🐔",
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
  },
  {
    id: 3,
    name: "Bún Cá Chấm Hằng Béo",
    address: "169 Tây Sơn",
    district: "Đống Đa",
    type: "Bún Cá",
    price: "40–60k",
    priceNum: 50,
    editorial: "Nước mắm pha chuẩn vị — chua ngọt vừa đủ, không bị gắt. Cá rán giòn thơm, ăn không ngán. Bún cá chấm đúng kiểu Hà Nội, giữ nguyên cách làm truyền thống.",
    mustTry: ["Nước mắm pha", "Cá rán", "Chả cá"],
    badges: { ac: false, parking: false, privateRoom: false, lateNight: false },
    scores: { food: 4.1, service: 3.3, space: 2.8 },
    featured: false,
    emoji: "🐟",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
  },
  {
    id: 4,
    name: "Bún Chả Bình Sự",
    address: "69 Bạch Đằng",
    district: "Hai Bà Trưng",
    type: "Bún Chả",
    price: "40–60k",
    priceNum: 50,
    editorial: "Mắm ngon, chả thịt thơm, phục vụ nhanh — đủ ba yếu tố một bát bún chả ngon cần có. Quán quen mặt của dân văn phòng khu Hai Bà Trưng.",
    mustTry: ["Chả miếng", "Chả viên", "Bún sợi nhỏ"],
    badges: { ac: true, parking: false, privateRoom: false, lateNight: false },
    scores: { food: 3.9, service: 4.2, space: 3.1 },
    featured: false,
    emoji: "🥩",
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
  },
];

function getPiScore(scores) {
  return ((scores.food * 4 + scores.service * 3 + scores.space * 3) / 10).toFixed(1);
}

function PiScoreBar({ label, value, max = 5, color }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 13, color: "#6b4f3a" }}>{label}</span>
        <span style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 13, fontWeight: 700, color: "#c0622a" }}>{value} / {max}</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "#f0e6da", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: color, transition: "width 0.8s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function Badge({ icon, label, active }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px",
      borderRadius: 99, fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      background: active ? "#fdf0e6" : "#f5f5f5",
      color: active ? "#c0622a" : "#bbb",
      border: `1px solid ${active ? "#e8c4a0" : "#eee"}`,
      opacity: active ? 1 : 0.5,
    }}>
      {icon} {label}
    </span>
  );
}

function RestaurantCard({ r, onClick }) {
  const pi = getPiScore(r.scores);
  return (
    <div onClick={() => onClick(r)} style={{
      background: "#fff", borderRadius: 16, overflow: "hidden",
      boxShadow: "0 2px 16px rgba(120,70,30,0.08)", cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      border: "1px solid #f0e6da",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(120,70,30,0.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(120,70,30,0.08)"; }}
    >
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img src={r.img} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(60,30,10,0.6) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 12, right: 12, background: "#c0622a", color: "#fff", borderRadius: 8, padding: "4px 10px", fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 700, fontSize: 15 }}>
          Pi {pi}
        </div>
        {r.featured && (
          <div style={{ position: "absolute", top: 12, left: 12, background: "#f5c842", color: "#3d2000", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
            ✦ NÊN THỬ
          </div>
        )}
        <div style={{ position: "absolute", bottom: 12, left: 14 }}>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{r.name}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>{r.address} · {r.district}</div>
        </div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          <span style={{ background: "#fdf0e6", color: "#c0622a", border: "1px solid #e8c4a0", borderRadius: 6, padding: "3px 8px", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{r.type}</span>
          <span style={{ background: "#f5f5f5", color: "#666", borderRadius: 6, padding: "3px 8px", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>💰 {r.price}/người</span>
          {r.badges.ac && <span style={{ background: "#e8f4fd", color: "#1a6fa8", borderRadius: 6, padding: "3px 8px", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>❄ Điều hòa</span>}
        </div>
        <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 13, color: "#8a6a55", lineHeight: 1.5 }}>
          Nên thử: <span style={{ fontWeight: 600, color: "#5a3620" }}>{r.mustTry.slice(0, 2).join(" · ")}{r.mustTry.length > 2 ? " ···" : ""}</span>
        </div>
      </div>
    </div>
  );
}

function DetailPage({ r, onBack }) {
  const pi = getPiScore(r.scores);
  return (
    <div style={{ minHeight: "100vh", background: "#fdf8f3" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 320 }}>
        <img src={r.img} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(40,20,5,0.85) 0%, rgba(40,20,5,0.2) 60%, transparent 100%)" }} />
        <button onClick={onBack} style={{
          position: "absolute", top: 20, left: 20, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 10, padding: "8px 16px",
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
        }}>← Quay lại</button>
        <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ background: "#c0622a", color: "#fff", borderRadius: 8, padding: "4px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700 }}>{r.type}</span>
            {r.featured && <span style={{ background: "#f5c842", color: "#3d2000", borderRadius: 8, padding: "4px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700 }}>✦ NÊN THỬ</span>}
          </div>
          <h1 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>{r.name}</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)", margin: "6px 0 0" }}>📍 {r.address} · {r.district}</p>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* Pi Score */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, margin: "24px 0", boxShadow: "0 2px 16px rgba(120,70,30,0.07)", border: "1px solid #f0e6da" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#c0622a", textTransform: "uppercase", marginBottom: 4 }}>Pi Score</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 52, fontWeight: 700, color: "#3d2000", lineHeight: 1 }}>{pi}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#b09080" }}>/10</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#b09080", marginBottom: 4 }}>Trọng số</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8a6a55" }}>Đồ ăn 40% · Dịch vụ 30% · Không gian 30%</div>
            </div>
          </div>
          <div style={{ width: "100%", height: 1, background: "#f0e6da", margin: "16px 0" }} />
          <PiScoreBar label="🍜 Đồ ăn (hương vị · ổn định · định lượng)" value={r.scores.food} color="#c0622a" />
          <PiScoreBar label="💬 Dịch vụ (thái độ · tốc độ · chủ động)" value={r.scores.service} color="#d4845a" />
          <PiScoreBar label="🏠 Không gian & vệ sinh" value={r.scores.space} color="#e8a878" />
        </div>

        {/* Editorial */}
        <div style={{ background: "#fff8f0", borderLeft: "4px solid #c0622a", borderRadius: "0 12px 12px 0", padding: "16px 20px", marginBottom: 24 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#c0622a", textTransform: "uppercase", marginBottom: 8 }}>✦ Tại sao PiGuide chọn quán này</div>
          <p style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 17, color: "#3d2000", lineHeight: 1.7, margin: 0 }}>{r.editorial}</p>
        </div>

        {/* Món nên thử */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 2px 16px rgba(120,70,30,0.07)", border: "1px solid #f0e6da" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#c0622a", textTransform: "uppercase", marginBottom: 16 }}>Món nên thử</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {r.mustTry.map((m, i) => (
              <div key={i} style={{
                background: "linear-gradient(135deg, #fdf0e6, #fae4d0)",
                border: "1px solid #e8c4a0", borderRadius: 12, padding: "10px 16px",
                fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 16, fontWeight: 600, color: "#5a3620",
              }}>
                🍽 {m}
              </div>
            ))}
          </div>
        </div>

        {/* Tiện ích & Giá */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 2px 16px rgba(120,70,30,0.07)", border: "1px solid #f0e6da" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#c0622a", textTransform: "uppercase", marginBottom: 16 }}>Tiện ích & Chi phí</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <Badge icon="❄" label="Điều hòa" active={r.badges.ac} />
            <Badge icon="🚗" label="Đỗ ô tô" active={r.badges.parking} />
            <Badge icon="🔒" label="Phòng riêng" active={r.badges.privateRoom} />
            <Badge icon="🌙" label="Mở đêm" active={r.badges.lateNight} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fdf8f3", borderRadius: 10, border: "1px solid #f0e6da" }}>
            <span style={{ fontSize: 20 }}>💰</span>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#b09080" }}>Khoảng giá / người</div>
              <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#3d2000" }}>{r.price}</div>
            </div>
          </div>
        </div>

        {/* Google Maps button */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + " " + r.address + " Hà Nội")}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: "#c0622a", color: "#fff", borderRadius: 14, padding: "16px 24px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(192,98,42,0.35)", transition: "transform 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          📍 Chỉ đường trên Google Maps
        </a>
      </div>
    </div>
  );
}

export default function PiGuide() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("Tất cả");
  const [filterAC, setFilterAC] = useState(false);
  const [filterLate, setFilterLate] = useState(false);
  const [filterPrice, setFilterPrice] = useState("Tất cả");

  if (selected) return <DetailPage r={selected} onBack={() => setSelected(null)} />;

  const districts = ["Tất cả", ...Array.from(new Set(RESTAURANTS.map(r => r.district)))];
  const priceOptions = ["Tất cả", "Dưới 50k", "50–100k", "Trên 100k"];

  const filtered = RESTAURANTS.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.mustTry.some(m => m.toLowerCase().includes(q));
    const matchDistrict = district === "Tất cả" || r.district === district;
    const matchAC = !filterAC || r.badges.ac;
    const matchLate = !filterLate || r.badges.lateNight;
    const matchPrice = filterPrice === "Tất cả" ||
      (filterPrice === "Dưới 50k" && r.priceNum < 50) ||
      (filterPrice === "50–100k" && r.priceNum >= 50 && r.priceNum <= 100) ||
      (filterPrice === "Trên 100k" && r.priceNum > 100);
    return matchSearch && matchDistrict && matchAC && matchLate && matchPrice;
  });

  const featured = filtered.filter(r => r.featured);
  const rest = filtered.filter(r => !r.featured);

  return (
    <div style={{ minHeight: "100vh", background: "#fdf8f3", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::placeholder { color: #c4a992; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fdf8f3; }
        ::-webkit-scrollbar-thumb { background: #e8c4a0; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #3d2000 0%, #7a3a0e 50%, #c0622a 100%)",
        padding: "48px 24px 64px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 80%, rgba(245,200,66,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,150,50,0.1) 0%, transparent 50%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🥢</span>
            <span style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 42, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Pi</span>
            <span style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 42, fontWeight: 400, color: "#f5c842", letterSpacing: "-0.02em" }}>Guide</span>
          </div>
          <p style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 18, color: "rgba(255,255,255,0.8)", margin: "0 0 32px", fontStyle: "italic" }}>
            Ăn đúng chỗ · Sống đúng vị · Hà Nội
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
            <div style={{ display: "flex", background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
              <span style={{ padding: "0 16px", display: "flex", alignItems: "center", fontSize: 18 }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Tìm quán, món ăn..."
                style={{ flex: 1, border: "none", outline: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 16, padding: "16px 0", background: "transparent", color: "#3d2000" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ padding: "0 16px", background: "none", border: "none", cursor: "pointer", color: "#c4a992", fontSize: 18 }}>✕</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0e6da", padding: "14px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", maxWidth: 960, margin: "0 auto", flexWrap: "wrap" }}>
          {/* District */}
          {districts.map(d => (
            <button key={d} onClick={() => setDistrict(d)} style={{
              padding: "7px 16px", borderRadius: 99, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              background: district === d ? "#c0622a" : "#fdf0e6",
              color: district === d ? "#fff" : "#c0622a",
              border: `1px solid ${district === d ? "#c0622a" : "#e8c4a0"}`,
              transition: "all 0.15s",
            }}>{d}</button>
          ))}
          <div style={{ width: 1, height: 24, background: "#f0e6da" }} />
          {/* Price */}
          <select value={filterPrice} onChange={e => setFilterPrice(e.target.value)} style={{
            padding: "7px 12px", borderRadius: 99, border: "1px solid #e8c4a0", fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, color: "#c0622a", background: "#fdf0e6", cursor: "pointer", outline: "none",
          }}>
            {priceOptions.map(p => <option key={p}>{p}</option>)}
          </select>
          {/* Toggles */}
          <button onClick={() => setFilterAC(v => !v)} style={{
            padding: "7px 14px", borderRadius: 99, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: filterAC ? "#e8f4fd" : "#f5f5f5",
            color: filterAC ? "#1a6fa8" : "#888",
            border: `1px solid ${filterAC ? "#a8d4f0" : "#eee"}`,
          }}>❄ Điều hòa</button>
          <button onClick={() => setFilterLate(v => !v)} style={{
            padding: "7px 14px", borderRadius: 99, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: filterLate ? "#f0eaff" : "#f5f5f5",
            color: filterLate ? "#6a3db8" : "#888",
            border: `1px solid ${filterLate ? "#c9b0f0" : "#eee"}`,
          }}>🌙 Mở đêm</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🍽</div>
            <p style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 20, color: "#8a6a55" }}>Không tìm thấy quán phù hợp.<br />Thử điều chỉnh bộ lọc nhé!</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c0622a" }}>✦ Nên thử tuần này</span>
                  <div style={{ flex: 1, height: 1, background: "#f0e6da" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                  {featured.map(r => <RestaurantCard key={r.id} r={r} onClick={setSelected} />)}
                </div>
              </div>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a6a55" }}>Tất cả quán</span>
                  <div style={{ flex: 1, height: 1, background: "#f0e6da" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                  {rest.map(r => <RestaurantCard key={r.id} r={r} onClick={setSelected} />)}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 64, paddingTop: 32, borderTop: "1px solid #f0e6da" }}>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 22, color: "#c0622a", marginBottom: 8 }}>🥢 PiGuide</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#b09080" }}>
            Tất cả quán được đội ngũ PiGuide trực tiếp trải nghiệm và đánh giá.<br />
            Không nhận tiền từ quán để ưu tiên hiển thị.
          </p>
        </div>
      </div>
    </div>
  );
}