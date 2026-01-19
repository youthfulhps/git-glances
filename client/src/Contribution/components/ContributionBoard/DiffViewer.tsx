import React from 'react';
import { parseDiff, Diff, Hunk } from 'react-diff-view';
import 'react-diff-view/style/index.css';
import { CommitFile, PullRequestFile } from '@shared/apis/contribution/types';
import { getFileStatusColor, getFileStatusText, formatDiffHeader } from '../../utils/fileStatusHelper';

type DiffViewerProps = {
  files: (CommitFile | PullRequestFile)[];
};

type DiffFileProps = {
  file: CommitFile | PullRequestFile;
};

function DiffFile({ file }: DiffFileProps) {
  if (!file.patch) {
    return (
      <div className="rounded-lg border border-zinc-700 bg-zinc-800/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-300">{file.filename}</span>
            <span className={`text-xs ${getFileStatusColor(file.status)}`}>
              {getFileStatusText(file.status)}
            </span>
          </div>
          <div className="text-xs text-zinc-500">Binary file or no diff available</div>
        </div>
      </div>
    );
  }

  try {
    const diffText = formatDiffHeader(file.filename, file.patch);
    const [diffFile] = parseDiff(diffText);

    return (
      <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
        {/* File Header */}
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-300">{file.filename}</span>
            {file.previous_filename && file.previous_filename !== file.filename && (
              <span className="text-xs text-zinc-500">(from {file.previous_filename})</span>
            )}
            <span className={`text-xs ${getFileStatusColor(file.status)}`}>
              {getFileStatusText(file.status)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-400">+{file.additions}</span>
            <span className="text-red-400">-{file.deletions}</span>
          </div>
        </div>

        {/* Diff Content */}
        <div className="diff-viewer-container overflow-x-auto">
          <Diff viewType="unified" diffType={diffFile.type} hunks={diffFile.hunks}>
            {(hunks) => hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)}
          </Diff>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error parsing diff:', error);
    return (
      <div className="rounded-lg border border-zinc-700 bg-zinc-800/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-300">{file.filename}</span>
            <span className={`text-xs ${getFileStatusColor(file.status)}`}>
              {getFileStatusText(file.status)}
            </span>
          </div>
          <div className="text-xs text-red-400">Error parsing diff</div>
        </div>
      </div>
    );
  }
}

function DiffViewer({ files }: DiffViewerProps) {
  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-sm text-zinc-500">
        No file changes to display
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {files.map((file, index) => (
        <DiffFile key={index} file={file} />
      ))}
    </div>
  );
}

export default DiffViewer;
