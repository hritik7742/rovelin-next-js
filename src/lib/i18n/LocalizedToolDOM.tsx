"use client";

import React, { useEffect, useRef } from 'react';
import { getToolUiDictionary } from './tool-dictionary';

interface LocalizedToolDOMProps {
  children: React.ReactNode;
  locale: string;
  toolSlug: string;
}

export default function LocalizedToolDOM({
  children,
  locale,
  toolSlug
}: LocalizedToolDOMProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || locale === 'en' || typeof window === 'undefined') return;

    const dict = getToolUiDictionary(locale);
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

    // Dynamic pattern replacement for common sentences, buttons & status patterns
    const applyDynamicPatterns = (str: string): string => {
      let result = str;

      if (locale === 'es') {
        result = result.replace(/Why Use Our ([^?]+)\?/gi, '¿Por qué usar nuestro $1?');
        result = result.replace(/Why Use a ([^?]+)\?/gi, '¿Por qué usar un $1?');
        result = result.replace(/Why Use an ([^?]+)\?/gi, '¿Por qué usar un $1?');
        result = result.replace(/Why Convert ([^?]+)\?/gi, '¿Por qué convertir $1?');
        result = result.replace(/Why Choose Our ([^<\n]+)/gi, '¿Por qué elegir nuestro $1');
        result = result.replace(/How to Use ([^<\n]+)/gi, 'Cómo usar $1');
        result = result.replace(/What is ([^?]+)\?/gi, '¿Qué es $1?');
        result = result.replace(/Benefits of Using ([^<\n]+)/gi, 'Beneficios de usar $1');
        result = result.replace(/Supported ([A-Za-z0-9 ]+) Formats/gi, 'Formatos de $1 compatibles');
        result = result.replace(/Supported ([A-Za-z0-9 ]+)/gi, '$1 compatibles');
        result = result.replace(/Quality:\s*(\d+)%/gi, 'Calidad: $1%');
        result = result.replace(/(\d+)%\s*size reduction/gi, 'Reducción de tamaño: $1%');
        result = result.replace(/(\d+)%\s*smaller/gi, '$1% más pequeño');
        result = result.replace(/Download\s+([A-Z0-9]+)\s+File/gi, 'Descargar Archivo $1');
        result = result.replace(/Download\s+([A-Z0-9]+)/gi, 'Descargar $1');
        result = result.replace(/Convert to\s+([A-Z0-9]+)/gi, 'Convertir a $1');
        result = result.replace(/Supported:\s*([^•]+)•\s*Max size:\s*([^\n]+)/gi, 'Formatos: $1 • Tamaño máx: $2');
      } else if (locale === 'fr') {
        result = result.replace(/Why Use Our ([^?]+)\?/gi, 'Pourquoi utiliser notre $1 ?');
        result = result.replace(/Why Convert ([^?]+)\?/gi, 'Pourquoi convertir $1 ?');
        result = result.replace(/Quality:\s*(\d+)%/gi, 'Qualité : $1%');
        result = result.replace(/(\d+)%\s*size reduction/gi, 'Réduction de taille : $1%');
        result = result.replace(/(\d+)%\s*smaller/gi, '$1% plus petit');
        result = result.replace(/Download\s+([A-Z0-9]+)\s+File/gi, 'Télécharger Fichier $1');
        result = result.replace(/Download\s+([A-Z0-9]+)/gi, 'Télécharger $1');
        result = result.replace(/Convert to\s+([A-Z0-9]+)/gi, 'Convertir en $1');
      } else if (locale === 'de') {
        result = result.replace(/Why Use Our ([^?]+)\?/gi, 'Warum unser $1 nutzen?');
        result = result.replace(/Why Convert ([^?]+)\?/gi, 'Warum $1 umwandeln?');
        result = result.replace(/Quality:\s*(\d+)%/gi, 'Qualität: $1%');
        result = result.replace(/(\d+)%\s*size reduction/gi, 'Größenreduktion: $1%');
        result = result.replace(/(\d+)%\s*smaller/gi, '$1% kleiner');
        result = result.replace(/Download\s+([A-Z0-9]+)\s+File/gi, '$1-Datei Herunterladen');
        result = result.replace(/Download\s+([A-Z0-9]+)/gi, '$1 Herunterladen');
        result = result.replace(/Convert to\s+([A-Z0-9]+)/gi, 'In $1 umwandeln');
      }

      return result;
    };

    const isIgnoredElement = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (['script', 'style', 'canvas', 'pre', 'code'].includes(tag)) return true;
      if (tag === 'input') {
        const type = (el as HTMLInputElement).type;
        if (['color', 'range', 'hidden', 'file'].includes(type)) return true;
      }
      return false;
    };

    const translateNode = (node: Node) => {
      try {
        if (node.nodeType === Node.TEXT_NODE) {
          if (isIgnoredElement(node.parentElement)) return;

          const original = node.textContent;
          if (!original) return;
          const trimmed = original.trim();
          if (!trimmed) return;

          // 1. Exact match in dictionary
          if (dict[trimmed]) {
            node.textContent = original.replace(trimmed, dict[trimmed]);
            return;
          }

          // 2. Substring matching for phrases (longest keys first)
          let modified = original;
          for (const enKey of sortedKeys) {
            if (enKey.length >= 3 && modified.includes(enKey)) {
              modified = modified.replaceAll(enKey, dict[enKey]);
            }
          }

          // 3. Dynamic patterns
          modified = applyDynamicPatterns(modified);

          if (modified !== original) {
            node.textContent = modified;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (isIgnoredElement(el)) return;

          // Translate placeholders
          if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
            const ph = el.getAttribute('placeholder');
            if (ph && dict[ph]) {
              el.setAttribute('placeholder', dict[ph]);
            }
          }
          // Translate options in select dropdowns
          if (el instanceof HTMLOptionElement) {
            const optText = el.textContent?.trim();
            if (optText && dict[optText]) {
              el.textContent = dict[optText];
            }
          }
          // Translate titles & aria-labels
          const titleAttr = el.getAttribute('title');
          if (titleAttr && dict[titleAttr]) {
            el.setAttribute('title', dict[titleAttr]);
          }
          const ariaLabel = el.getAttribute('aria-label');
          if (ariaLabel && dict[ariaLabel]) {
            el.setAttribute('aria-label', dict[ariaLabel]);
          }
        }
      } catch (e) {
        // Silently skip any non-modifiable node to never crash the page
      }
    };

    const walkAndTranslate = (root: Node) => {
      try {
        const walker = document.createTreeWalker(
          root,
          NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT
        );
        let currentNode: Node | null = walker.currentNode;
        while (currentNode) {
          translateNode(currentNode);
          currentNode = walker.nextNode();
        }
      } catch (e) {
        // Guard against any walker error
      }
    };

    // Run translation safely after initial mount tick
    const timer = setTimeout(() => {
      if (containerRef.current) {
        walkAndTranslate(containerRef.current);
      }
    }, 50);

    // Observe subsequent dynamic updates safely
    let observer: MutationObserver | null = null;
    let isTranslating = false;

    try {
      observer = new MutationObserver((mutations) => {
        if (isTranslating || !containerRef.current) return;
        isTranslating = true;
        try {
          if (observer) observer.disconnect();
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((added) => walkAndTranslate(added));
            } else if (mutation.type === 'characterData') {
              translateNode(mutation.target);
            }
          }
        } finally {
          if (observer && containerRef.current) {
            observer.observe(containerRef.current, {
              childList: true,
              subtree: true,
              characterData: true,
            });
          }
          isTranslating = false;
        }
      });

      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    } catch (e) {
      // Fallback
    }

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [locale, toolSlug]);

  return (
    <div ref={containerRef} className="localized-tool-workspace w-full">
      {children}
    </div>
  );
}
