'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Save, AlertCircle } from 'lucide-react';
import { Post } from '@/types';
import { usePostForm } from '@/hooks/usePostForm';

interface PostDialogProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PostDialog({ post, isOpen, onClose }: PostDialogProps) {
  const { companies, selectedCompany } = useDashboardStore();
  const { formData, loading, error, handleInputChange, handleSubmit } = usePostForm(post, selectedCompany);

  const onSubmit = async (e: React.FormEvent) => {
    try {
      await handleSubmit(e);
      onClose();
    } catch (err) {
      // Error is already handled in the hook
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>
            {post ? '게시물 편집' : '새 게시물 생성'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                제목
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="게시물 제목을 입력하세요..."
                required
              />
            </div>

            {/* Company Selection */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                회사
              </label>
              <select
                id="company"
                value={formData.resourceUid}
                onChange={(e) => handleInputChange('resourceUid', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                required
              >
                <option value="">회사를 선택하세요...</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                날짜
              </label>
              <input
                id="date"
                type="month"
                value={formData.dateTime}
                onChange={(e) => handleInputChange('dateTime', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                내용
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                rows={6}
                placeholder="게시물 내용을 입력하세요..."
                required
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {post ? '게시물 업데이트' : '게시물 생성'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
