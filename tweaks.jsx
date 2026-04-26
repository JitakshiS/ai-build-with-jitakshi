// Tweaks for Build with AI landing page

const TWEAK_DEFAULTS = window.__TWEAK_DEFAULTS;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    if (window.__applyTweaks) window.__applyTweaks(t);
  }, [t]);

  return (
    <TweaksPanel title="TWEAKS · Build with AI">
      <TweakSection label="Hero headline" />
      <TweakRadio
        label="Variant"
        value={t.headlineVariant}
        options={[
          { value: 'cant-build', label: 'Nothing changed Monday' },
          { value: 'build-culture', label: 'Build cultures, not workshops' },
          { value: 'monday-friday', label: 'Mon anxious → Fri shipped' },
        ]}
        onChange={(v) => setTweak('headlineVariant', v)}
      />

      <TweakSection label="Theme" />
      <TweakRadio
        label="Accent"
        value={t.accent}
        options={[
          { value: 'lime', label: 'Lime' },
          { value: 'rose', label: 'Rose' },
          { value: 'amber', label: 'Amber' },
          { value: 'cyan', label: 'Cyan' },
        ]}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Animation" />
      <TweakSlider
        label="Ambient intensity"
        value={t.ambientIntensity}
        min={0} max={3} step={0.25}
        onChange={(v) => setTweak('ambientIntensity', v)}
      />

      <TweakSection label="Sections" />
      <TweakToggle
        label="Show women-led section"
        value={t.showWomenLed}
        onChange={(v) => setTweak('showWomenLed', v)}
      />
      <TweakToggle
        label="Show pricing anchors"
        value={t.showPricing}
        onChange={(v) => setTweak('showPricing', v)}
      />
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<App />);
