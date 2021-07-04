import React from 'react';
import { ThemeProvider } from '../../context/ThemeContext';

export default function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
