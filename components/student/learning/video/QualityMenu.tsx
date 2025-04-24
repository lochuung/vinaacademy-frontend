import { FC } from 'react';
import { Settings } from 'lucide-react';

interface Quality {
  value: number;
  label: string;
}

interface QualityMenuProps {
  qualities: Quality[];
  currentQuality: number;
  onQualityChange: (level: number) => void;
  isOpen: boolean;
  toggleMenu: () => void;
}

const QualityMenu: FC<QualityMenuProps> = ({
  qualities,
  currentQuality,
  onQualityChange,
  isOpen,
  toggleMenu
}) => {
  return (
    <div className="relative flex items-center justify-center">
      <button
        className="text-white hover:text-blue-500 transition flex items-center justify-center"
        onClick={toggleMenu}
        aria-label="Chất lượng video"
      >
        <Settings size={20} />
      </button>

      {isOpen && qualities.length > 0 && (
        <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-700 w-48 transform transition-all duration-200 ease-in-out animate-fade-in">
          <div className="text-white text-sm font-medium mb-2 pb-1 border-b border-gray-700 flex items-center">
            <Settings size={14} className="mr-1.5 text-blue-400" />
            Chất lượng video
          </div>
          <div className="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
            {qualities.map((quality) => (
              <button
                key={quality.value}
                className={`group flex items-center justify-between w-full text-left px-3 py-1.5 text-sm rounded-md transition-all duration-150 ${
                  currentQuality === quality.value
                    ? 'bg-blue-600/80 text-white font-medium'
                    : 'text-gray-200 hover:bg-gray-700/70 hover:text-white'
                }`}
                onClick={() => onQualityChange(quality.value)}
              >
                <span>{quality.label}</span>
                {currentQuality === quality.value && (
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityMenu;
