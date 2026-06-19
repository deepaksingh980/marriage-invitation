"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

/* ── Palette ─────────────────────────────────────── */
const GOLD      = "#C9912E";
const SAFFRON   = "#E8B84B";
const ROSE_GOLD = "#D8A28C";
const BURGUNDY  = "#6B0F1A";

/* ── Member Data ─────────────────────────────────── */
interface Member { nameKey:string; roleKey:string; src:string; accent:string; delay:number; }

const groomFamily: Member[] = [
  { nameKey:"family.groom.father.name",  roleKey:"family.groom.father.role",  src:"/assets/groom-father.webp", accent:SAFFRON,   delay:0    },
  { nameKey:"family.groom.mother.name",  roleKey:"family.groom.mother.role",  src:"/assets/groom-mother.webp", accent:GOLD,      delay:0.15 },
  { nameKey:"family.groom.sibling.name", roleKey:"family.groom.sibling.role", src:"/assets/groom-sibling.webp",accent:SAFFRON,   delay:0.30 },
];
const brideFamily: Member[] = [
  { nameKey:"family.bride.father.name",  roleKey:"family.bride.father.role",  src:"/assets/bride-father.webp",  accent:ROSE_GOLD, delay:0    },
  { nameKey:"family.bride.mother.name",  roleKey:"family.bride.mother.role",  src:"/assets/bride-mother.webp",  accent:GOLD,      delay:0.15 },
  { nameKey:"family.bride.sibling.name", roleKey:"family.bride.sibling.role", src:"/assets/bride-sibling.webp", accent:ROSE_GOLD, delay:0.30 },
  { nameKey:"family.bride.sibling2.name",roleKey:"family.bride.sibling2.role",src:"/assets/bride-sibling2.webp",accent:ROSE_GOLD, delay:0.45 },
];

/* ── Ambient Background Elements ─────────────────── */
function BackgroundDecor() {
  return (
    <>
      {/* Floating petals */}
      {Array.from({length:12}).map((_,i)=>{
        const symbols = ["❀","✿","❁","✾","⚘"];
        return (
          <div key={i} style={{
            position:"absolute", top:"-50px",
            left:`${(i*37+9)%93}%`,
            fontSize: 9+(i%4)*5,
            color: i%3===0?`${SAFFRON}55`:i%3===1?`${ROSE_GOLD}50`:`${GOLD}40`,
            animation:`petalFall ${16+(i%5)*4}s linear ${(i*0.6)%12}s infinite`,
            pointerEvents:"none", userSelect:"none", zIndex:1,
          }}>{symbols[i%symbols.length]}</div>
        );
      })}
      {/* Stars */}
      {Array.from({length:24}).map((_,i)=>(
        <div key={`s${i}`} className="star-twinkle" style={{
          position:"absolute",
          left:`${(i*43+11)%97}%`, top:`${(i*61+7)%95}%`,
          width: i%5===0?4:2, height: i%5===0?4:2,
          borderRadius:"50%",
          background: i%2===0?`${SAFFRON}88`:`${GOLD}55`,
          "--duration":`${2+(i%5)*0.6}s`,
          "--delay":`${(i*0.22)%5}s`,
        } as React.CSSProperties}/>
      ))}
      {/* Warm glows */}
      <div style={{position:"absolute",top:"15%",left:"0%",width:500,height:500,borderRadius:"50%",
        background:`radial-gradient(circle,${SAFFRON}08 0%,transparent 70%)`,pointerEvents:"none",zIndex:1}}/>
      <div style={{position:"absolute",bottom:"10%",right:"0%",width:440,height:440,borderRadius:"50%",
        background:`radial-gradient(circle,${ROSE_GOLD}09 0%,transparent 70%)`,pointerEvents:"none",zIndex:1}}/>
    </>
  );
}

/* ── Circular Portrait ────────────────────────────── */
function CirclePortrait({ member, idx }: { member:Member; idx:number }) {
  const { t } = useTranslation();
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-30px" });

  const imgSize = "clamp(68px, 10vw, 110px)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:30, scale:0.82 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ type:"spring", stiffness:88, damping:14, delay: member.delay }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.55rem", minWidth:0 }}
    >
      {/* Circle image container */}
      <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>

        {/* Outer pulsing halo */}
        <motion.div
          animate={{ scale: hov?[1,1.2,1]:[1,1.08,1], opacity: hov?[0.6,1,0.6]:[0.2,0.5,0.2] }}
          transition={{ duration:3+idx*0.45, repeat:Infinity, ease:"easeInOut" }}
          style={{
            position:"absolute", inset:-12, borderRadius:"50%",
            background:`radial-gradient(circle,${member.accent}40 0%,transparent 65%)`,
            pointerEvents:"none",
          }}
        />

        {/* Outer ring */}
        <motion.div
          animate={{ scale: hov?1.06:1 }}
          transition={{ type:"spring", stiffness:120, damping:14 }}
          style={{
            position:"absolute",
            width:`calc(${imgSize} + 10px)`,
            height:`calc(${imgSize} + 10px)`,
            borderRadius:"50%",
            border:`2px solid ${hov ? member.accent : "rgba(212,175,55,0.35)"}`,
            transition:"border-color 0.3s",
          }}
        />

        {/* Dashed ring */}
        <div style={{
          position:"absolute",
          width:`calc(${imgSize} + 22px)`,
          height:`calc(${imgSize} + 22px)`,
          borderRadius:"50%",
          border:`1.5px dashed ${member.accent}25`,
          pointerEvents:"none",
        }}/>

        {/* Circle photo */}
        <motion.div
          animate={{ y: hov ? -4 : 0 }}
          transition={{ type:"spring", stiffness:130, damping:14 }}
          style={{
            width: imgSize, height: imgSize,
            borderRadius:"50%", overflow:"hidden", flexShrink:0,
            boxShadow: hov
              ? `0 0 22px ${member.accent}55, 0 14px 28px rgba(107,15,26,0.18)`
              : "0 4px 18px rgba(90,70,52,0.12)",
            border:`3px solid ${hov ? member.accent : "rgba(255,255,255,0.8)"}`,
            transition:"border-color 0.3s, box-shadow 0.3s",
            background:"#f9f0e0",
          }}
        >
          <img
            src={member.src} alt={t(member.nameKey)}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
              transition:"transform 0.5s ease",
              transform: hov?"scale(1.1)":"scale(1)" }}
          />
        </motion.div>

        {/* Bottom jewel */}
        <motion.div
          animate={{ scale: hov?1.6:1 }}
          transition={{ duration:0.25 }}
          style={{
            position:"absolute", bottom:-2, left:"50%", transform:"translateX(-50%)",
            width:9, height:9, borderRadius:"50%",
            background: member.accent,
            boxShadow:`0 0 ${hov?"10px":"5px"} ${member.accent}${hov?"CC":"88"}`,
            border:"1.5px solid rgba(255,255,255,0.7)",
          }}
        />
      </div>

      {/* Name */}
      <p style={{
        fontFamily:"var(--font-playfair),'Playfair Display',serif",
        fontWeight:700,
        fontSize:"clamp(0.65rem,1.5vw,0.88rem)",
        color:"#3D2108",
        textAlign:"center",
        lineHeight:1.25,
        letterSpacing:"0.01em",
        paddingInline:"0.1rem",
        marginTop:"0.3rem",
      }}>{t(member.nameKey)}</p>

      {/* Role */}
      <p style={{
        fontFamily:"var(--font-montserrat),'Montserrat',sans-serif",
        fontWeight:600,
        fontSize:"clamp(0.44rem,0.9vw,0.54rem)",
        color: member.accent,
        textTransform:"uppercase",
        letterSpacing:"0.3em",
        textAlign:"center",
      }}>{t(member.roleKey)}</p>
    </motion.div>
  );
}

/* ── Family Card ──────────────────────────────────── */
function FamilyCard({
  members, titleKey, sideKey, accent, side, icon,
}: {
  members:Member[]; titleKey:string; sideKey:string;
  accent:string; side:"left"|"right"; icon:string;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-70px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, x: side==="left"?-60:60, y:20 }}
      animate={inView ? { opacity:1, x:0, y:0 } : {}}
      transition={{ type:"spring", stiffness:58, damping:16 }}
      style={{
        position:"relative",
        borderRadius:"1.75rem",
        overflow:"hidden",
        background:"linear-gradient(160deg,rgba(255,253,248,0.98)0%,rgba(253,245,232,0.96)50%,rgba(248,238,220,0.94)100%)",
        border:"1.5px solid rgba(212,175,55,0.25)",
        backdropFilter:"blur(12px)",
        boxShadow:"0 28px 70px rgba(107,15,26,0.09),0 4px 16px rgba(201,145,46,0.06),inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
    >
      {/* ── Card Header Band ── */}
      <div style={{
        background:`linear-gradient(135deg,${accent}18 0%,${accent}08 100%)`,
        borderBottom:`1px solid ${accent}25`,
        padding:"1.4rem 1.5rem 1.2rem",
        display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem",
        position:"relative",
      }}>
        {/* Dashed inner top border */}
        <div style={{
          position:"absolute", inset:"8px 8px 0 8px",
          borderTop:"1px dashed rgba(212,175,55,0.2)",
          borderLeft:"1px dashed rgba(212,175,55,0.2)",
          borderRight:"1px dashed rgba(212,175,55,0.2)",
          borderRadius:"1.4rem 1.4rem 0 0",
          pointerEvents:"none",
        }}/>

        {/* Animated icon */}
        <motion.div
          animate={{ y:[0,-4,0], rotate:[0,5,-5,0] }}
          transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
          style={{ fontSize:"1.8rem", lineHeight:1 }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 style={{
          fontFamily:"var(--font-playfair),'Playfair Display',serif",
          fontWeight:800,
          fontSize:"clamp(1.15rem,2.8vw,1.6rem)",
          color: BURGUNDY,
          letterSpacing:"0.05em",
          lineHeight:1.1,
          textAlign:"center",
        }}>
          {t(titleKey)}
        </h3>

        {/* Side label */}
        <div style={{
          display:"flex", alignItems:"center", gap:"0.5rem",
        }}>
          <div style={{height:1,width:30,background:`linear-gradient(to right,transparent,${accent}70)`}}/>
          <p style={{
            fontFamily:"var(--font-montserrat),'Montserrat',sans-serif",
            fontWeight:700, fontSize:"0.5rem",
            letterSpacing:"0.45em", color:accent, textTransform:"uppercase",
          }}>{t(sideKey)}</p>
          <div style={{height:1,width:30,background:`linear-gradient(to left,transparent,${accent}70)`}}/>
        </div>
      </div>

      {/* ── Portraits Area ── */}
      <div style={{ padding:"1.8rem 1.2rem 2rem" }}>
        <div style={{
          display:"grid",
          gridTemplateColumns:`repeat(${members.length},1fr)`,
          gap:"clamp(0.4rem,1.8vw,1rem)",
          alignItems:"end",
          justifyItems:"center",
        }}>
          {members.map((m,i)=>(
            <CirclePortrait key={m.nameKey} member={m} idx={i}/>
          ))}
        </div>
      </div>

      {/* Corner sparkles */}
      {(["tl","tr","bl","br"] as const).map((p,pi)=>(
        <motion.div key={p}
          animate={{ opacity:[0.3,0.85,0.3], scale:[1,1.4,1] }}
          transition={{ duration:2.5+pi*0.4, repeat:Infinity, ease:"easeInOut", delay:pi*0.3 }}
          style={{
            position:"absolute",
            top: p.startsWith("t")?11:"auto", bottom:p.startsWith("b")?11:"auto",
            left:p.endsWith("l")?11:"auto",   right:p.endsWith("r")?11:"auto",
            fontSize:9, color:accent, pointerEvents:"none", lineHeight:1,
          }}
        >✦</motion.div>
      ))}
    </motion.div>
  );
}

/* ── Section Header ───────────────────────────────── */
function SectionHeader() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });

  return (
    <div ref={ref} style={{ textAlign:"center", marginBottom:"3.5rem", position:"relative", zIndex:10 }}>

      {/* Chapter label */}
      <motion.div
        initial={{ opacity:0, y:-10 }}
        animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.6 }}
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.8rem", marginBottom:"1rem" }}
      >
        <motion.div initial={{scaleX:0}} animate={inView?{scaleX:1}:{}} transition={{duration:0.6,delay:0.1}}
          style={{height:1,width:50,background:`linear-gradient(to right,transparent,${GOLD}70)`,transformOrigin:"right"}}/>
        <p style={{
          fontFamily:"var(--font-montserrat),'Montserrat',sans-serif",
          fontWeight:700, fontSize:"0.56rem",
          letterSpacing:"0.55em", color:GOLD, textTransform:"uppercase",
        }}>Chapter VIII</p>
        <motion.div initial={{scaleX:0}} animate={inView?{scaleX:1}:{}} transition={{duration:0.6,delay:0.1}}
          style={{height:1,width:50,background:`linear-gradient(to left,transparent,${GOLD}70)`,transformOrigin:"left"}}/>
      </motion.div>

      {/* ★ MAIN TITLE — Playfair Display, readable & elegant ★ */}
      <motion.h2
        initial={{ opacity:0, y:-18 }}
        animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ delay:0.15, duration:0.75, ease:[0.16,1,0.3,1] }}
        style={{
          fontFamily:"var(--font-playfair),'Playfair Display',serif",
          fontWeight:800,
          fontSize:"clamp(2.2rem,6vw,3.8rem)",
          color: BURGUNDY,
          lineHeight:1.1,
          letterSpacing:"0.06em",
          marginBottom:"0.3rem",
          textTransform:"uppercase",
        }}
      >
        {t("family.title")}
      </motion.h2>

      {/* Sub-script in italic Lora */}
      <motion.p
        initial={{ opacity:0, y:8 }}
        animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ delay:0.28, duration:0.6 }}
        style={{
          fontFamily:"var(--font-lora),'Lora',serif",
          fontStyle:"italic",
          fontSize:"clamp(0.88rem,2vw,1.1rem)",
          color:"#8B3A3A",
          letterSpacing:"0.06em",
          marginBottom:"1.2rem",
          opacity:0.85,
        }}
      >
        {t("family.sub")}
      </motion.p>

      {/* Ornament divider */}
      <motion.div
        initial={{ opacity:0, scaleX:0 }}
        animate={inView ? { opacity:1, scaleX:1 } : {}}
        transition={{ delay:0.38, duration:0.7 }}
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", margin:"0 auto" }}
      >
        <div style={{height:1.5,width:80,background:`linear-gradient(to right,transparent,${SAFFRON}80)`,borderRadius:2}}/>
        <motion.span
          animate={{ rotate:[0,360] }}
          transition={{ duration:20, repeat:Infinity, ease:"linear" }}
          style={{ color:SAFFRON, fontSize:"1.3rem", display:"inline-block" }}
        >✦</motion.span>
        <motion.span style={{
          fontFamily:"var(--font-playfair),serif", color:GOLD,
          fontSize:"0.65rem", letterSpacing:"0.25em", fontStyle:"italic",
        }}>With Love & Blessings</motion.span>
        <motion.span
          animate={{ rotate:[360,0] }}
          transition={{ duration:20, repeat:Infinity, ease:"linear" }}
          style={{ color:SAFFRON, fontSize:"1.3rem", display:"inline-block" }}
        >✦</motion.span>
        <div style={{height:1.5,width:80,background:`linear-gradient(to left,transparent,${SAFFRON}80)`,borderRadius:2}}/>
      </motion.div>
    </div>
  );
}

/* ── Blessing Footer ──────────────────────────────── */
function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:22 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay:0.2 }}
      style={{ textAlign:"center", marginTop:"3.5rem", position:"relative", zIndex:10 }}
    >
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"1rem" }}>
        <div style={{height:1,width:80,background:`linear-gradient(to right,transparent,${GOLD}55)`}}/>
        <motion.span
          animate={{ rotate:[0,360] }}
          transition={{ duration:28, repeat:Infinity, ease:"linear" }}
          style={{ color:GOLD, fontSize:"1.3rem", display:"inline-block" }}
        >✦</motion.span>
        <div style={{height:1,width:80,background:`linear-gradient(to left,transparent,${GOLD}55)`}}/>
      </div>
      <motion.p
        animate={{ opacity:[0.65,1,0.65] }}
        transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
        style={{
          fontFamily:"var(--font-noto-devanagari),'Noto Serif Devanagari',serif",
          fontSize:"clamp(1.05rem,2.8vw,1.4rem)",
          color:BURGUNDY, letterSpacing:"0.14em", fontWeight:600,
        }}
      >
        ॥ सर्वे भवन्तु सुखिनः ॥
      </motion.p>
      <p style={{
        fontFamily:"var(--font-lora),'Lora',serif",
        fontStyle:"italic",
        fontSize:"0.7rem", letterSpacing:"0.2em",
        color:GOLD, marginTop:"0.45rem", opacity:0.75,
      }}>
        May All Beings Be Happy
      </p>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────── */
export default function Family() {
  return (
    <section id="family" style={{
      position:"relative", overflow:"hidden",
      padding:"5rem 1.25rem 5.5rem",
      background:"linear-gradient(180deg,#FDF5E8 0%,#FAF0DE 50%,#FDF5E8 100%)",
    }}>
      <BackgroundDecor/>

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:10 }}>
        <SectionHeader/>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,340px),1fr))",
          gap:"clamp(1.2rem,3vw,2.4rem)",
          alignItems:"start",
        }}>
          <FamilyCard
            members={groomFamily}
            titleKey="family.groom.title"
            sideKey="family.groomSide"
            accent={SAFFRON}
            side="left"
            icon="🪔"
          />
          <FamilyCard
            members={brideFamily}
            titleKey="family.bride.title"
            sideKey="family.brideSide"
            accent={ROSE_GOLD}
            side="right"
            icon="🌸"
          />
        </div>

        <Footer/>
      </div>
    </section>
  );
}
