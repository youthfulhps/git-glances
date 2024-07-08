import GoogleAppBadge from './GoogleAppBadge';

function GoogleApp() {
  const handleBadgeClick = (target: 'mail' | 'calendar' | 'meet') => {
    window.open(`https://${target}.google.com`, '_blank');
  };

  return (
    <section className="flex h-full items-center">
      {(['mail', 'calendar', 'meet'] as const).map((target) => (
        <GoogleAppBadge
          key={target}
          onClick={() => handleBadgeClick(target)}
          target={target}
          className="mr-2"
        />
      ))}
    </section>
  );
}

export default GoogleApp;
