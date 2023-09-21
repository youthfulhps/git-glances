type GoogleAppBadgeProps = {
  className?: string;
  target: 'mail' | 'calendar' | 'meet';
  onClick: () => void;
};

function GoogleAppBadge({ className, target, onClick }: GoogleAppBadgeProps) {
  return (
    <button
      className={`flex h-[58px] w-[48px] items-center rounded-2xl bg-zinc-800 p-2 opacity-80 hover:opacity-100 ${className}`}
      onClick={onClick}
    >
      <img src={`icons/${target}.svg`} alt={`${target} logo`} className="h-8 w-8" />
    </button>
  );
}

export default GoogleAppBadge;
