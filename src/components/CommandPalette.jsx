import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import {
  Search,
  Home,
  Globe,
  X,
  Presentation,
  Sun,
} from 'lucide-react';
import FocusTrap from 'focus-trap-react';

/**
 * CommandPalette Component
 * Features:
 * - Activation via Ctrl+K or Cmd+K
 * - Keyboard navigation (Up/Down/Enter/Esc)
 * - Filtered search results
 * - Cosmic Minimalism Glassmorphism UI
 */

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const navigateToSection = useCallback((sectionId) => {
    navigate({ pathname: '/', hash: `#${sectionId}` });
  }, [navigate]);

  // Flatten and filter items based on search
  const filteredItems = useMemo(() => {
    const commandSections = [
      {
        group: "Navigation",
        items: [
          { id: 'nav-home', label: 'Home', icon: Home, shortcut: 'H', action: () => navigate('/') },
          { id: 'nav-projects', label: 'Projects', icon: Globe, shortcut: 'P', action: () => navigate('/projects') },
          { id: 'nav-playground', label: 'Playground', icon: Presentation, shortcut: 'G', action: () => navigate('/playground') },
        ]
      },
      {
        group: "Sections",
        items: [
          { id: 'section-about', label: 'About Me', icon: Home, action: () => navigateToSection('about') },
          { id: 'section-education', label: 'Education', icon: Home, action: () => navigateToSection('education') },
          { id: 'section-projects', label: 'Projects', icon: Globe, action: () => navigateToSection('projects') },
          { id: 'section-experience', label: 'Experience', icon: Home, action: () => navigateToSection('experience') },
          { id: 'section-skills', label: 'Skills', icon: Home, action: () => navigateToSection('skills') },
          { id: 'section-playground', label: 'Playground', icon: Presentation, action: () => navigateToSection('playground') },
          { id: 'section-certificates', label: 'Certificates', icon: Presentation, action: () => navigateToSection('certificates') },
          { id: 'section-contact', label: 'Contact', icon: Home, action: () => navigateToSection('contact') },
        ]
      },
      {
        group: "Preferences",
        items: [
          {
            id: 'pref-theme', label: 'Toggle color theme', icon: Sun, shortcut: 'T', action: () => {
              window.dispatchEvent(new Event('toggle-theme'));
            }
          },
        ]
      },
      {
        group: "Projects",
        items: [
          { id: 'proj-global-restaurant', label: 'Global Restaurant Analysis', icon: Globe, action: () => navigate('/project/global-restaurant-analysis') },
          { id: 'proj-hirelite', label: 'HireLite', icon: Globe, action: () => navigate('/project/hirelite') },
        ]
      },
      {
        group: "Social Links",
        items: portfolioData.hero.socials.map((social, index) => ({
          id: `social-${index}`,
          label: social.name,
          icon: social.icon,
          action: () => {
            if (social.link.startsWith('mailto:')) {
              window.location.assign(social.link);
              return;
            }

            window.open(social.link, '_blank', 'noopener,noreferrer');
          },
        })),
      }
    ];

    const flat = [];
    commandSections.forEach(section => {
      const matches = section.items.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
      if (matches.length > 0) {
        flat.push({ type: 'header', label: section.group });
        matches.forEach(m => flat.push({ ...m, type: 'item' }));
      }
    });
    return flat;
  }, [search, navigate, navigateToSection]);

  const selectableItems = useMemo(() =>
    filteredItems.filter(i => i.type === 'item'),
    [filteredItems]);
  const activeOption = selectableItems[selectedIndex] || selectableItems[0];
  const handleAction = useCallback((item) => {
    item.action?.();
    setIsOpen(false);
  }, []);

  // Handle Global Shortcuts
  const lastInteraction = useRef('keyboard');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        lastInteraction.current = 'keyboard';
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        return;
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => selectableItems.length > 0 ? (prev + 1) % selectableItems.length : 0);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => selectableItems.length > 0 ? (prev - 1 + selectableItems.length) % selectableItems.length : 0);
      }

      if (e.key === 'Enter' && activeOption) {
        handleAction(activeOption);
      }
    };

    const handleOpenPalette = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenPalette);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenPalette);
    };
  }, [activeOption, handleAction, isOpen, selectableItems.length]);

  const listRef = useRef(null);
  const activeItemRef = useRef(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView?.({ block: 'nearest' });
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setSelectedIndex(0);
    setSearch('');

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[30vh] px-4 sm:px-6" role="dialog" aria-modal="true" aria-label="Command palette">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
        <FocusTrap focusTrapOptions={{
          initialFocus: () => inputRef.current,
          returnFocusOnDeactivate: true,
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-card/60 backdrop-blur-2xl border border-border/50 rounded-xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-black/5"
          >

            {/* Search Input Section */}
            <div className="flex items-center px-3 py-3 border-b border-border/50">
              <Search className="mr-3 text-muted-foreground" size={16} />
              <input
                ref={inputRef}
                id="command-palette-input"
                role="combobox"
                aria-label="Search commands"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls="command-palette-results"
                aria-activedescendant={activeOption ? `command-option-${activeOption.id}` : undefined}
                className="w-full rounded-sm bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Go to..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted/50 rounded-md text-muted-foreground transition-colors cursor-pointer"
                aria-label="Close command palette"
                type="button"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results List */}
            <div
              id="command-palette-results"
              ref={listRef}
              role="listbox"
              aria-label="Command results"
              className="max-h-96 overflow-y-auto py-2 command-scrollbar"
              onMouseMove={() => lastInteraction.current = 'mouse'}
            >
              {filteredItems.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <p className="text-muted-foreground">No results found for &quot;{search}&quot;</p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  if (item.type === 'header') {
                    return (
                      <div key={item.label} role="presentation" className="px-3 py-1 text-[10px] font-medium uppercase text-muted-foreground/70">
                        {item.label}
                      </div>
                    );
                  }

                  const currentSelectableIndex = selectableItems.findIndex(si => si.id === item.id);
                  const isActive = currentSelectableIndex === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      id={`command-option-${item.id}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      ref={isActive ? activeItemRef : null}
                      onClick={() => handleAction(item)}
                      onMouseEnter={() => {
                        if (lastInteraction.current === 'mouse') {
                          setSelectedIndex(currentSelectableIndex);
                        }
                      }}
                      className="group relative mx-2 flex w-[calc(100%-1rem)] items-center justify-between rounded-lg border-0 bg-transparent px-2 py-2 text-left"
                    >
                      {/* Active highlight background */}
                      {isActive && (
                        <motion.div
                          layoutId="command-palette-highlight"
                          className="absolute inset-0 bg-primary/7 rounded-lg pointer-events-none"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Content */}
                      <div className="flex items-center gap-2 relative z-10 w-full justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md transition-colors ${isActive ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground group-hover:bg-muted/50'}`}>
                            <item.icon size={16} />
                          </div>
                          <span className={`font-medium text-sm transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            {item.label}
                          </span>
                        </div>

                        {item.shortcut && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground bg-background border border-border/50 rounded shadow-sm">
                              {item.shortcut}
                            </kbd>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-muted/20 border-t border-border/50 flex items-center justify-end gap-4 text-[11px] font-medium text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1 py-0.5 bg-background border border-border/50 rounded shadow-sm">Enter</kbd> Execute
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1 py-0.5 bg-background border border-border/50 rounded shadow-sm">Esc</kbd> Exit
                </span>
              </div>
            </div>
          </motion.div>
          </FocusTrap>


        </div >
      )}
    </AnimatePresence >
  );
};

export default CommandPalette;
