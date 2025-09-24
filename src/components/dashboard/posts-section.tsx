import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Calendar,
  Building2,
  AlertCircle
} from 'lucide-react';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';
import { PostDialog } from '@/components/dashboard/post-dialog';

export function PostsSection() {
  const { 
    companies, 
    selectedCompany, 
    getFilteredPosts,
    setError,
    deletePost
  } = useDashboardStore();

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPosts = getFilteredPosts();

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('이 게시물을 삭제하시겠습니까?')) return;
    
    try {
      // Import deletePost API function
      const { deletePost: deletePostAPI } = await import('@/lib/api');
      await deletePostAPI(postId);
      
      // Update the store
      deletePost(postId);
    } catch {
      setError('게시물 삭제에 실패했습니다');
    }
  };

  const getCompanyName = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.name || '알 수 없는 회사';
  };

  if (filteredPosts.length === 0 && !selectedCompany) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>게시물 및 보고서</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">사용 가능한 게시물이 없습니다</h3>
            <p className="text-muted-foreground mb-4">
              회사를 선택하여 게시물과 보고서를 보거나 새 게시물을 생성하세요.
            </p>
            <Button onClick={handleCreatePost}>
              <Plus className="w-4 h-4 mr-2" />
              게시물 생성
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>
                게시물 및 보고서
                {selectedCompany && (
                  <Badge variant="secondary" className="ml-2">
                    {getCompanyName(selectedCompany)}
                  </Badge>
                )}
              </span>
            </CardTitle>
            <Button onClick={handleCreatePost}>
              <Plus className="w-4 h-4 mr-2" />
              게시물 생성
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">게시물을 찾을 수 없습니다</h3>
              <p className="text-muted-foreground mb-4">
                이 회사는 아직 게시물을 생성하지 않았습니다.
              </p>
              <Button onClick={handleCreatePost}>
                <Plus className="w-4 h-4 mr-2" />
                첫 게시물 생성
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{post.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {getCompanyName(post.resourceUid)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.dateTime)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building2 className="w-3 h-3" />
                          <span>{getCompanyName(post.resourceUid)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <PostDialog
        post={editingPost}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingPost(null);
        }}
      />
    </>
  );
}
