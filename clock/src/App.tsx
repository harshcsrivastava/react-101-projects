import { useCallback, useEffect, useState } from 'react';
import ClockApplicationShell from './components/ClockApplicationShell';
import type {
  ClockMode,
  ClockType,
  ThemeKey,
  TimeFormat,
} from './themePresets';

function App() {
  const [currentMode, setCurrentMode] = useState<ClockMode>('clock');
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('font-theme-chai');
  const [clockType, setClockType] = useState<ClockType>('digital');
  const [showSeconds, setShowSeconds] = useState(true);
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('12hr');
  const [controlsHidden, setControlsHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  }, []);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable = Boolean(
        target?.closest('input, textarea, select, [contenteditable="true"]')
      );

      if (event.code === 'KeyF' && !isEditable) {
        event.preventDefault();

        if (document.fullscreenElement) {
          await document.exitFullscreen();
          return;
        }

        await document.documentElement.requestFullscreen();
      }

      if (event.key === 'Escape' && document.fullscreenElement) {
        await document.exitFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    handleFullscreenChange();

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <ClockApplicationShell
      currentMode={currentMode}
      currentTheme={currentTheme}
      clockType={clockType}
      showSeconds={showSeconds}
      timeFormat={timeFormat}
      controlsHidden={controlsHidden}
      isFullscreen={isFullscreen}
      onModeChange={setCurrentMode}
      onThemeChange={setCurrentTheme}
      onClockTypeChange={setClockType}
      onToggleShowSeconds={() => setShowSeconds((value) => !value)}
      onToggleTimeFormat={() =>
        setTimeFormat((value) => (value === '12hr' ? '24hr' : '12hr'))
      }
      onToggleControlsHidden={() => setControlsHidden((value) => !value)}
      onToggleFullscreen={toggleFullscreen}
    />
  );
}

export default App;
