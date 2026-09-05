{\rtf1\ansi\ansicpg1252\cocoartf1561\cocoasubrtf610
{\fonttbl\f0\fnil\fcharset0 LucidaGrande;\f1\fnil\fcharset178 GeezaPro;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13260\viewh10200\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 "use
\f1  
\f0 client";
\f1 \

\f0 import
\f1  
\f0 \{
\f1  
\f0 useEffect,
\f1  
\f0 useState
\f1  
\f0 \}
\f1  
\f0 from
\f1  
\f0 "react";
\f1 \
\

\f0 const
\f1  
\f0 HIJRI_MONTHS
\f1  
\f0 =
\f1  
\f0 [
\f1 \
  
\f0 "
\f1 \'e3\'cd\'d1\'e3
\f0 ",
\f1  
\f0 "
\f1 \'d5\'dd\'d1
\f0 ",
\f1  
\f0 "
\f1 \'d1\'c8\'ed\'da \'c7\'e1\'c3\'e6\'e1
\f0 ",
\f1  
\f0 "
\f1 \'d1\'c8\'ed\'da \'c7\'e1\'c2\'ce\'d1
\f0 ",
\f1  
\f0 "
\f1 \'cc\'e3\'c7\'cf\'ec \'c7\'e1\'c3\'e6\'e1\'ec
\f0 ",
\f1  
\f0 "
\f1 \'cc\'e3\'c7\'cf\'ec \'c7\'e1\'c2\'ce\'d1\'c9
\f0 ",
\f1 \
  
\f0 "
\f1 \'d1\'cc\'c8
\f0 ",
\f1  
\f0 "
\f1 \'d4\'da\'c8\'c7\'e4
\f0 ",
\f1  
\f0 "
\f1 \'d1\'e3\'d6\'c7\'e4
\f0 ",
\f1  
\f0 "
\f1 \'d4\'e6\'c7\'e1
\f0 ",
\f1  
\f0 "
\f1 \'d0\'e6 \'c7\'e1\'de\'da\'cf\'c9
\f0 ",
\f1  
\f0 "
\f1 \'d0\'e6 \'c7\'e1\'cd\'cc\'c9
\f0 ",
\f1 \

\f0 ];
\f1 \
\

\f0 function
\f1  
\f0 formatHijri(date)
\f1  
\f0 \{
\f1 \
  
\f0 try
\f1  
\f0 \{
\f1 \
    
\f0 const
\f1  
\f0 fmt
\f1  
\f0 =
\f1  
\f0 new
\f1  
\f0 Intl
\f1 .
\f0 DateTimeFormat("en-US-u-ca-islamic-umalqura",
\f1  
\f0 \{
\f1 \
      
\f0 year:
\f1  
\f0 "numeric",
\f1  
\f0 month:
\f1  
\f0 "numeric",
\f1  
\f0 day:
\f1  
\f0 "numeric",
\f1 \
    
\f0 \});
\f1 \
    
\f0 const
\f1  
\f0 parts
\f1  
\f0 =
\f1  
\f0 fmt
\f1 .
\f0 formatToParts(date);
\f1 \
    
\f0 const
\f1  
\f0 day
\f1  
\f0 =
\f1  
\f0 parts
\f1 .
\f0 find((p)
\f1  
\f0 =>
\f1  
\f0 p
\f1 .
\f0 type
\f1  
\f0 ===
\f1  
\f0 "day")?
\f1 .
\f0 value;
\f1 \
    
\f0 const
\f1  
\f0 month
\f1  
\f0 =
\f1  
\f0 parseInt(parts
\f1 .
\f0 find((p)
\f1  
\f0 =>
\f1  
\f0 p
\f1 .
\f0 type
\f1  
\f0 ===
\f1  
\f0 "month")?
\f1 .
\f0 value,
\f1  
\f0 10);
\f1 \
    
\f0 const
\f1  
\f0 year
\f1  
\f0 =
\f1  
\f0 parts
\f1 .
\f0 find((p)
\f1  
\f0 =>
\f1  
\f0 p
\f1 .
\f0 type
\f1  
\f0 ===
\f1  
\f0 "year")?
\f1 .
\f0 value;
\f1 \
    
\f0 return
\f1  
\f0 `$\{day\}
\f1  
\f0 $\{HIJRI_MONTHS[month
\f1  
\f0 -
\f1  
\f0 1]\}
\f1  
\f0 $\{year\}
\f1 \'e5\'dc
\f0 `;
\f1 \
  
\f0 \}
\f1  
\f0 catch
\f1  
\f0 \{
\f1 \
    
\f0 return
\f1  
\f0 "";
\f1 \
  
\f0 \}
\f1 \

\f0 \}
\f1 \
\

\f0 export
\f1  
\f0 default
\f1  
\f0 function
\f1  
\f0 LiveClock()
\f1  
\f0 \{
\f1 \
  
\f0 const
\f1  
\f0 [now,
\f1  
\f0 setNow]
\f1  
\f0 =
\f1  
\f0 useState(null);
\f1 \
\
  
\f0 useEffect(()
\f1  
\f0 =>
\f1  
\f0 \{
\f1 \
    
\f0 setNow(new
\f1  
\f0 Date());
\f1 \
    
\f0 const
\f1  
\f0 timer
\f1  
\f0 =
\f1  
\f0 setInterval(()
\f1  
\f0 =>
\f1  
\f0 setNow(new
\f1  
\f0 Date()),
\f1  
\f0 1000);
\f1 \
    
\f0 return
\f1  
\f0 ()
\f1  
\f0 =>
\f1  
\f0 clearInterval(timer);
\f1 \
  
\f0 \},
\f1  
\f0 []);
\f1 \
\
  
\f0 if
\f1  
\f0 (!now)
\f1  
\f0 return
\f1  
\f0 null;
\f1 \
\
  
\f0 const
\f1  
\f0 timeStr
\f1  
\f0 =
\f1  
\f0 now
\f1 .
\f0 toLocaleTimeString("ar-SA",
\f1  
\f0 \{
\f1  
\f0 hour:
\f1  
\f0 "2-digit",
\f1  
\f0 minute:
\f1  
\f0 "2-digit",
\f1  
\f0 second:
\f1  
\f0 "2-digit"
\f1  
\f0 \});
\f1 \
  
\f0 const
\f1  
\f0 gregorianStr
\f1  
\f0 =
\f1  
\f0 now
\f1 .
\f0 toLocaleDateString("ar-SA",
\f1  
\f0 \{
\f1  
\f0 weekday:
\f1  
\f0 "long",
\f1  
\f0 year:
\f1  
\f0 "numeric",
\f1  
\f0 month:
\f1  
\f0 "long",
\f1  
\f0 day:
\f1  
\f0 "numeric"
\f1  
\f0 \});
\f1 \
  
\f0 const
\f1  
\f0 hijriStr
\f1  
\f0 =
\f1  
\f0 formatHijri(now);
\f1 \
\
  
\f0 return
\f1  
\f0 (
\f1 \
    
\f0 <div
\f1  
\f0 style=\{\{
\f1  
\f0 fontSize:
\f1  
\f0 12,
\f1  
\f0 color:
\f1  
\f0 "#7A8291",
\f1  
\f0 lineHeight:
\f1  
\f0 1
\f1 .
\f0 9
\f1  
\f0 \}\}>
\f1 \
      
\f0 <div
\f1  
\f0 style=\{\{
\f1  
\f0 fontFamily:
\f1  
\f0 "'Markazi
\f1  
\f0 Text',
\f1  
\f0 serif",
\f1  
\f0 fontSize:
\f1  
\f0 20,
\f1  
\f0 color:
\f1  
\f0 "#C9CFD9",
\f1  
\f0 fontVariantNumeric:
\f1  
\f0 "tabular-nums"
\f1  
\f0 \}\}>
\f1 \
        
\f0 \{timeStr\}
\f1 \
      
\f0 </div>
\f1 \
      
\f0 <div>\{gregorianStr\}</div>
\f1 \
      
\f0 \{hijriStr
\f1  
\f0 &&
\f1  
\f0 <div>\{hijriStr\}</div>\}
\f1 \
    
\f0 </div>
\f1 \
  
\f0 );
\f1 \

\f0 \}}