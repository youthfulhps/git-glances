import GoogleAppBadge from './GoogleAppBadge';

function GoogleApp() {
  const handleBadgeClick = (target: 'mail' | 'calendar') => {
    window.open(`https://${target}.google.com/${target}`, '_blank');
  };

  return (
    <section className="flex h-full items-center">
      <GoogleAppBadge onClick={() => handleBadgeClick('mail')} target="mail" className="mr-2" />
      <GoogleAppBadge
        onClick={() => handleBadgeClick('calendar')}
        target="calendar"
        className="mr-2"
      />
    </section>
  );
}

export default GoogleApp;
