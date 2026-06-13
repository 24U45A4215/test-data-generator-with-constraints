/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { File, Folder, Download, Terminal, ChevronRight, Code2, Play, Sun, Moon, RotateCcw } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PROJECT_FILES } from './data';
import { InteractiveGenerator } from './components/InteractiveGenerator';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeView, setActiveView] = useState<'code' | 'interactive'>('interactive');
  const [activeFile, setActiveFile] = useState(PROJECT_FILES[0].path);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [resetToggle, setResetToggle] = useState<number>(0);

  const selectedFile = PROJECT_FILES.find((f) => f.path === activeFile);

  const handleDownload = () => {
    if (!selectedFile) return;
    const blob = new Blob([selectedFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.path.split('/').pop() || 'file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    alert("In the platform, use the Settings menu (top right) -> 'Export to ZIP' to download the entire structured codebase along with these files.");
  };

  const handleSystemReset = () => {
    setResetToggle(prev => prev + 1);
  };

  return (
    <div className={cn(
      "flex h-screen w-full font-sans flex-col transition-colors duration-300",
      theme === 'dark' ? "bg-[#0a0a0b] text-slate-300" : "bg-slate-50 text-slate-800"
    )}>
      {/* Top Global Navigation bar */}
      <div className={cn(
        "h-14 border-b flex items-center justify-between px-6 shrink-0 transition-colors duration-300",
        theme === 'dark' ? "border-[#222] bg-[#050505]" : "border-slate-200 bg-white shadow-sm"
      )}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Terminal size={18} className={theme === 'dark' ? "text-blue-500" : "text-blue-600"} />
            <h1 className={cn(
              "text-sm font-semibold tracking-wide",
              theme === 'dark' ? "text-white" : "text-slate-900"
            )}>
              DataGen <span className={theme === 'dark' ? "text-slate-500 font-normal" : "text-slate-400 font-normal"}>Workspace</span>
            </h1>
          </div>
          <div className={cn(
            "flex items-center gap-1 p-1 rounded-md border transition-colors duration-300",
            theme === 'dark' ? "bg-[#111] border-[#222]" : "bg-slate-100 border-slate-200"
          )}>
            <button
              onClick={() => setActiveView('interactive')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200",
                activeView === 'interactive' 
                  ? (theme === 'dark' ? "bg-[#222] text-blue-400 shadow-sm" : "bg-white text-blue-600 shadow-sm border border-slate-200") 
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50")
              )}
            >
              <Play size={14} fill={activeView === 'interactive' ? "currentColor" : "none"} />
              Interactive Gen
            </button>
            <button
              onClick={() => setActiveView('code')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200",
                activeView === 'code' 
                  ? (theme === 'dark' ? "bg-[#222] text-blue-400 shadow-sm" : "bg-white text-blue-600 shadow-sm border border-slate-200") 
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50")
              )}
            >
              <Code2 size={14} />
              Project Code
            </button>
          </div>
        </div>

        {/* Global Action Tools: Theme Switcher & Refresh State Key */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSystemReset}
            title="Reset system state"
            className={cn(
              "p-2 rounded-lg border transition-all active:scale-95 flex items-center gap-1.5 text-xs font-medium",
              theme === 'dark'
                ? "bg-[#111] hover:bg-[#1a1a1c] border-[#222] text-slate-400 hover:text-white"
                : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
            )}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle theme mode"
            className={cn(
              "p-2 rounded-lg border transition-all active:scale-95",
              theme === 'dark'
                ? "bg-[#111] hover:bg-[#1a1a1c] border-[#222] text-amber-400 hover:text-amber-300"
                : "bg-white hover:bg-slate-100 border-slate-200 text-blue-600 hover:text-blue-800"
            )}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <div className="text-xs text-slate-500 font-medium tracking-wide hidden sm:block border-l pl-3 border-slate-300/30">
            Infinite Computer Solutions
          </div>
        </div>
      </div>

      {activeView === 'interactive' ? (
        <div className="flex-1 overflow-hidden relative">
          <InteractiveGenerator theme={theme} resetKey={resetToggle} />
        </div>
      ) : (
        <div className="flex-1 flex min-h-0">
          {/* Sidebar sidebar */}
          <div className={cn(
            "w-72 border-r flex flex-col shrink-0 transition-colors duration-300",
            theme === 'dark' ? "border-[#222] bg-[#0c0c0e]" : "border-slate-200 bg-slate-100/50"
          )}>
            <div className={cn("p-4 border-b", theme === 'dark' ? "border-[#222]" : "border-slate-200")}>
              <p className={cn("text-xs font-semibold uppercase tracking-wider mb-2", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>Explorer</p>
            </div>
            
            <div className="flex-1 overflow-y-auto py-2 px-2 custom-scrollbar">
              {PROJECT_FILES.map((file) => (
                <button
                  key={file.path}
                  onClick={() => setActiveFile(file.path)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-[13px] flex items-center gap-2 transition-colors rounded-md mb-1",
                    activeFile === file.path
                      ? (theme === 'dark' ? "bg-blue-500/10 text-blue-400 font-medium" : "bg-blue-50 text-blue-600 font-semibold")
                      : (theme === 'dark' ? "text-slate-400 hover:text-slate-200 hover:bg-[#222]" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50")
                  )}
                >
                  {file.language === 'folder' || file.path.includes('Folder') ? (
                    <Folder size={14} className={activeFile === file.path ? (theme === 'dark' ? "text-blue-400" : "text-blue-600") : "text-slate-500"} />
                  ) : (
                    <File size={14} className={activeFile === file.path ? (theme === 'dark' ? "text-blue-400" : "text-blue-600") : "text-slate-500"} />
                  )}
                  <span className="truncate">{file.path}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Pane */}
          <div className={cn(
            "flex-1 flex flex-col min-w-0 transition-colors duration-300",
            theme === 'dark' ? "bg-[#0a0a0b]" : "bg-white"
          )}>
            <div className={cn(
              "h-12 border-b flex items-center justify-between px-6 shrink-0 transition-colors duration-300",
              theme === 'dark' ? "border-[#222] bg-[#111]" : "border-slate-200 bg-slate-50"
            )}>
              <div className="flex items-center gap-2 text-[13px] text-slate-400">
                <span>ai_test_data_generator</span>
                <ChevronRight size={14} />
                <span className={theme === 'dark' ? "text-slate-200" : "text-slate-800"}>{selectedFile?.path}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-md transition-colors",
                    theme === 'dark'
                      ? "text-slate-300 hover:text-white bg-[#222] hover:bg-[#333] border-[#333]"
                      : "text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-200"
                  )}
                >
                  <Download size={14} />
                  Download
                </button>
                <button
                  onClick={handleDownloadAll}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
                >
                  <Download size={14} />
                  Export All
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 lg:p-8 custom-scrollbar">
              <pre className={cn(
                "font-mono text-[13.5px] leading-relaxed whitespace-pre-wrap word-break-normal",
                theme === 'dark' ? "text-slate-300" : "text-slate-800"
              )}>
                <code>{selectedFile?.content}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
