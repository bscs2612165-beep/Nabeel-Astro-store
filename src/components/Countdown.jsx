import { useEffect, useState } from 'react';

function diffParts(target) {
  const total = Math.max(0, target - Date.now());
  const d = Math.floor(total / 86400000);
  const h = Math.floor((total % 86400000) / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  return { d, h, m, s };
}

export default function Countdown({ target, labels = ['Days', 'Hrs', 'Min', 'Sec'] }) {
  const [parts, setParts] = useState(() => diffParts(target));
  const ended = parts.d === 0 && parts.h === 0 && parts.m === 0 && parts.s === 0;

  useEffect(() => {
    const t = setInterval(() => setParts(diffParts(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const display = [
    { v: parts.d, l: labels[0] },
    { v: parts.h, l: labels[1] },
    { v: parts.m, l: labels[2] },
    { v: parts.s, l: labels[3] }
  ];

  return (
    <div className="countdown" aria-label="Countdown">
      {display.map((u) => (
        <div className="countdown__unit" key={u.l}>
          <div className="countdown__num">{ended ? '0' : String(u.v).padStart(2, '0')}</div>
          <div className="countdown__label">{u.l}</div>
        </div>
      ))}
    </div>
  );
}