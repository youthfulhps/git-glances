import React, { useState, useEffect, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@shared/components/ui/dialog';
import { CommitFile, PullRequestFile } from '@shared/apis/contribution/types';
import DiffViewer from './DiffViewer';
import CodeReviewAI from './CodeReviewAI';
import { Mutation } from '@suspensive/react-query';
import { codeReviewMutationOptions } from '../../mutations';
import { generateDiffText } from '../../utils/codeReviewHelper';
import { CheckIcon } from '@primer/octicons-react';
import { Loader2, ExternalLink } from 'lucide-react';

type DetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  githubUrl: string;
  renderHeader: () => ReactNode;
  renderDescription?: () => ReactNode;
  fetchData: () => Promise<{ files: (CommitFile | PullRequestFile)[]; stats?: { additions: number; deletions: number } }>;
  getReviewContext: (files: (CommitFile | PullRequestFile)[]) => { diff: string; commitMessage?: string; prTitle?: string };
};

function DetailModal({
  open,
  onOpenChange,
  githubUrl,
  renderHeader,
  renderDescription,
  fetchData,
  getReviewContext,
}: DetailModalProps) {
  const [files, setFiles] = useState<(CommitFile | PullRequestFile)[]>([]);
  const [stats, setStats] = useState<{ additions: number; deletions: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setError(null);
      fetchData()
        .then((data) => {
          setFiles(data.files);
          setStats(data.stats || null);
        })
        .catch((err) => {
          console.error('Error fetching details:', err);
          setError('Failed to load details');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, fetchData]);

  const totalAdditions = stats?.additions ?? files.reduce((sum, file) => sum + file.additions, 0);
  const totalDeletions = stats?.deletions ?? files.reduce((sum, file) => sum + file.deletions, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-hidden">
        <DialogHeader>
          <div className="flex flex-col gap-2 pr-8">
            <DialogTitle className="flex items-center gap-2">{renderHeader()}</DialogTitle>
            {renderDescription && <DialogDescription className="text-left">{renderDescription()}</DialogDescription>}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex w-fit items-center gap-1 rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-700"
            >
              View on GitHub
              <ExternalLink size={12} />
            </a>
          </div>
        </DialogHeader>

        <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12 text-sm text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && files.length > 0 && (
            <div className="flex flex-col gap-4">
              {/* Stats */}
              <div className="flex items-center gap-4 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
                <div className="flex items-center gap-2 text-xs">
                  <CheckIcon size={14} className="fill-zinc-400" />
                  <span className="text-zinc-400">{files.length} files changed</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-400">+{totalAdditions}</span>
                  <span className="text-red-400">-{totalDeletions}</span>
                </div>
              </div>

              {/* AI Code Review */}
              <Mutation {...codeReviewMutationOptions()}>
                {({ mutate, isPending, isError, data: reviewData, error: reviewError }) => (
                  <CodeReviewAI
                    onGenerate={() => mutate(getReviewContext(files))}
                    isPending={isPending}
                    isError={isError}
                    data={reviewData}
                    error={reviewError}
                  />
                )}
              </Mutation>

              {/* Diff */}
              <DiffViewer files={files} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DetailModal;
