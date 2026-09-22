import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let lastPath = '';
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== lastPath) {
      window.scrollTo(0, 0);
      lastPath = pathname;
    }
  }, [pathname]);
  return null;
}