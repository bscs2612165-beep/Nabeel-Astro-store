import { useEffect } from 'react';

// Simple focus trap for modals/drawers. Traps Tab navigation inside the
// container while `active`, and restores focus to the previously focused
// element when released.
export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const previouslyFocused = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const focusables = ref.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const el = ref.current;
    el.addEventListener('keydown', onKeyDown);
    // Focus the first focusable element when opened.
    const first = el.querySelector(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (first) first.focus();

    return () => {
      el.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && document.body.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active, ref]);
}