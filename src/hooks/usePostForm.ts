import { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { createOrUpdatePost } from '@/lib/api';
import { Post } from '@/types';

export interface PostFormData {
  title: string;
  content: string;
  resourceUid: string;
  dateTime: string;
}

export function usePostForm(post: Post | null, selectedCompany: string | null) {
  const { addPost, updatePost } = useDashboardStore();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    resourceUid: selectedCompany || '',
    dateTime: new Date().toISOString().slice(0, 7), // YYYY-MM format
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        resourceUid: post.resourceUid,
        dateTime: post.dateTime,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        resourceUid: selectedCompany || '',
        dateTime: new Date().toISOString().slice(0, 7),
      });
    }
    setError(null);
  }, [post, selectedCompany]);

  const handleInputChange = (field: keyof PostFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const savedPost = await createOrUpdatePost({
        ...formData,
        id: post?.id,
      });
      
      // Update the store with the saved post
      if (post) {
        updatePost(savedPost);
      } else {
        addPost(savedPost);
      }
      
      return savedPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시물 저장에 실패했습니다');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      resourceUid: selectedCompany || '',
      dateTime: new Date().toISOString().slice(0, 7),
    });
    setError(null);
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    resetForm,
    setError
  };
}
