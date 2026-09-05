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

\f0 function
\f1  
\f0 diffParts(targetISO)
\f1  
\f0 \{
\f1 \
  
\f0 const
\f1  
\f0 target
\f1  
\f0 =
\f1  
\f0 new
\f1  
\f0 Date(targetISO
\f1  
\f0 +
\f1  
\f0 "T18:00:00Z");
\f1  
\f0 //
\f1  \'e3\'e6\'da\'cf \'ca\'de\'d1\'ed\'c8\'ed \'e1\'c5\'da\'e1\'c7\'e4 \'c7\'e1\'de\'d1\'c7\'d1 \'e3\'d3\'c7\'c1\'f0 \'c8\'ca\'e6\'de\'ed\'ca \'e6\'c7\'d4\'e4\'d8\'e4\
  
\f0 const
\f1  
\f0 now
\f1  
\f0 =
\f1  
\f0 new
\f1  
\f0 Date();
\f1 \
  
\f0 let
\f1  
\f0 ms
\f1  
\f0 =
\f1  
\f0 target
\f1  
\f0 -
\f1  
\f0 now;
\f1 \
  
\f0 if
\f1  
\f0 (ms
\f1  
\f0 <
\f1  
\f0 0)
\f1  
\f0 ms
\f1  
\f0 =
\f1  
\f0 0;
\f1 \
  
\f0 const
\f1  
\f0 days
\f1  
\f0 =
\f1  
\f0 Math
\f1 .
\f0 floor(ms
\f1  
\f0 /
\f1  
\f0 86400000);
\f1 \
  
\f0 const
\f1  
\f0 hours
\f1  
\f0 =
\f1  
\f0 Math
\f1 .
\f0 floor((ms
\f1  
\f0 %
\f1  
\f0 86400000)
\f1  
\f0 /
\f1  
\f0 3600000);
\f1 \
  
\f0 const
\f1  
\f0 minutes
\f1  
\f0 =
\f1  
\f0 Math
\f1 .
\f0 floor((ms
\f1  
\f0 %
\f1  
\f0 3600000)
\f1  
\f0 /
\f1  
\f0 60000);
\f1 \
  
\f0 const
\f1  
\f0 seconds
\f1  
\f0 =
\f1  
\f0 Math
\f1 .
\f0 floor((ms
\f1  
\f0 %
\f1  
\f0 60000)
\f1  
\f0 /
\f1  
\f0 1000);
\f1 \
  
\f0 return
\f1  
\f0 \{
\f1  
\f0 days,
\f1  
\f0 hours,
\f1  
\f0 minutes,
\f1  
\f0 seconds
\f1  
\f0 \};
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
\f0 Countdown(\{
\f1  
\f0 targetDate
\f1  
\f0 \})
\f1  
\f0 \{
\f1 \
  
\f0 const
\f1  
\f0 [parts,
\f1  
\f0 setParts]
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
    
\f0 if
\f1  
\f0 (!targetDate)
\f1  
\f0 return;
\f1 \
    
\f0 setParts(diffParts(targetDate));
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
\f0 setParts(diffParts(targetDate)),
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
\f0 [targetDate]);
\f1 \
\
  
\f0 if
\f1  
\f0 (!targetDate
\f1  
\f0 ||
\f1  
\f0 !parts)
\f1  
\f0 return
\f1  
\f0 null;
\f1 \
\
  
\f0 const
\f1  
\f0 unit
\f1  
\f0 =
\f1  
\f0 (label,
\f1  
\f0 value)
\f1  
\f0 =>
\f1  
\f0 (
\f1 \
    
\f0 <div
\f1  
\f0 style=\{\{
\f1  
\f0 textAlign:
\f1  
\f0 "center"
\f1  
\f0 \}\}>
\f1 \
      
\f0 <div
\f1 \
        
\f0 style=\{\{
\f1 \
          
\f0 fontFamily:
\f1  
\f0 "'Markazi
\f1  
\f0 Text',
\f1  
\f0 serif",
\f1 \
          
\f0 fontWeight:
\f1  
\f0 700,
\f1 \
          
\f0 fontSize:
\f1  
\f0 22,
\f1 \
          
\f0 color:
\f1  
\f0 "#B8974D",
\f1 \
          
\f0 fontVariantNumeric:
\f1  
\f0 "tabular-nums",
\f1 \
        
\f0 \}\}
\f1 \
      
\f0 >
\f1 \
        
\f0 \{String(value)
\f1 .
\f0 padStart(2,
\f1  
\f0 "0")\}
\f1 \
      
\f0 </div>
\f1 \
      
\f0 <div
\f1  
\f0 style=\{\{
\f1  
\f0 fontSize:
\f1  
\f0 10,
\f1  
\f0 color:
\f1  
\f0 "#7A8291"
\f1  
\f0 \}\}>\{label\}</div>
\f1 \
    
\f0 </div>
\f1 \
  
\f0 );
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
\f0 display:
\f1  
\f0 "flex",
\f1  
\f0 justifyContent:
\f1  
\f0 "center",
\f1  
\f0 gap:
\f1  
\f0 "1
\f1 .
\f0 2rem",
\f1  
\f0 margin:
\f1  
\f0 "1
\f1 .
\f0 2rem
\f1  
\f0 0"
\f1  
\f0 \}\}>
\f1 \
      
\f0 \{unit("
\f1 \'ed\'e6\'e3
\f0 ",
\f1  
\f0 parts
\f1 .
\f0 days)\}
\f1 \
      
\f0 \{unit("
\f1 \'d3\'c7\'da\'c9
\f0 ",
\f1  
\f0 parts
\f1 .
\f0 hours)\}
\f1 \
      
\f0 \{unit("
\f1 \'cf\'de\'ed\'de\'c9
\f0 ",
\f1  
\f0 parts
\f1 .
\f0 minutes)\}
\f1 \
      
\f0 \{unit("
\f1 \'cb\'c7\'e4\'ed\'c9
\f0 ",
\f1  
\f0 parts
\f1 .
\f0 seconds)\}
\f1 \
    
\f0 </div>
\f1 \
  
\f0 );
\f1 \

\f0 \}}