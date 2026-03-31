import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  backTo?: string;
  rightElement?: React.ReactNode;
}

export default function PageHeader({ title, backTo, rightElement }: Props) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40" style={{ background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(8px)' }}>
      <div className="flex items-center h-[56px] px-2">
        <div className="w-[48px] flex justify-center">
          {backTo && (
            <button onClick={() => navigate(backTo)} className="w-[44px] h-[44px] rounded-full flex items-center justify-center m3-state">
              <span className="material-symbols-rounded" style={{ color: '#2D3748', fontSize: 26 }}>arrow_back</span>
            </button>
          )}
        </div>
        <h1 className="flex-1 text-center text-[20px] font-bold" style={{ color: '#2D3748' }}>
          {title}
        </h1>
        <div className="w-[48px] flex justify-center">{rightElement}</div>
      </div>
    </header>
  );
}
