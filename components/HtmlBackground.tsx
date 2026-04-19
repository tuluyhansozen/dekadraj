'use client';
import { useEffect } from 'react';

export function HtmlBackground({ color }: { color: string }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.backgroundColor;
    el.style.backgroundColor = color;
    return () => {
      el.style.backgroundColor = prev;
    };
  }, [color]);
  return null;
}
