function App() {
  const themeItems = [
    { label: 'Themes: Indian', className: 'font-theme-indian' },
    { label: 'Themes: Sakura | Japanese', className: 'font-theme-sakura' },
    { label: 'Themes: Pure Dark', className: 'font-theme-dark' },
    { label: 'Themes: Pure Light', className: 'font-theme-light' },
    { label: 'Themes: Chai Theme', className: 'font-theme-chai' },
    { label: 'Themes: Minecraft Theme', className: 'font-theme-Minecraft' },
  ];

  return (
    <>
      <ul>
        <li>Clock Type: Analog</li>
        <li>Clock Type: Digital</li>
      </ul>

      <ul>
        <li>button: show seconds </li>
        <li>button: reset</li>
      </ul>
      <ul>
        {themeItems.map((themeItem) => (
          <li key={themeItem.label} className={themeItem.className}>
            {themeItem.label}
          </li>
        ))}
      </ul>

      <ul>
        <li>Time Format: 12-hour</li>
        <li>Time Format: 24-hour</li>
      </ul>
    </>
  );
}

export default App;
