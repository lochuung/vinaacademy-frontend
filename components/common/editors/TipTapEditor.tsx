'use client';

import { useEditor, EditorContent, type Editor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TiptapImage, { ImageOptions } from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import YouTube from '@tiptap/extension-youtube';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Code as CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  Youtube,
  FileCode,
  Minus,
  ChevronDown,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle,
  Link2,
  X,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ArrowRight,
  CornerRightDown
} from 'lucide-react';
import { uploadImage } from '@/services/imageService';
import { getImageUrl } from '@/utils/imageUtils';
import { NodeViewWrapper } from '@tiptap/react';
import { mergeAttributes, Node } from '@tiptap/core';
import './editor.css';

// Custom extension for resizable images
const ResizableImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 500,
        renderHTML: attributes => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width,
            style: `width: ${attributes.width}px`,
          };
        },
      },
      height: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.height) {
            return {};
          }
          return {
            height: attributes.height,
            style: `height: ${attributes.height}px`,
          };
        },
      },
    };
  },
  
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const dom = document.createElement('div');
      dom.classList.add('resizable-image-wrapper');
      
      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || '';
      
      if (node.attrs.width) {
        img.setAttribute('width', node.attrs.width);
        img.style.width = `${node.attrs.width}px`;
      }
      
      if (node.attrs.height) {
        img.setAttribute('height', node.attrs.height);
        img.style.height = `${node.attrs.height}px`;
      }

      img.classList.add('resizable-image');
      img.draggable = false;
      
      dom.appendChild(img);
      
      return {
        dom,
        update: (updatedNode) => {
          if (updatedNode.attrs.src !== node.attrs.src) {
            img.src = updatedNode.attrs.src;
          }
          
          if (updatedNode.attrs.width !== node.attrs.width) {
            img.setAttribute('width', updatedNode.attrs.width);
            img.style.width = `${updatedNode.attrs.width}px`;
          }
          
          if (updatedNode.attrs.height !== node.attrs.height) {
            img.setAttribute('height', updatedNode.attrs.height);
            img.style.height = `${updatedNode.attrs.height}px`;
          }
          
          return true;
        },
      };
    };
  },
});

interface TipTapEditorProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
}

// Image size options for quick selection
const IMAGE_SIZES = [
  { label: 'Tùy chỉnh', value: 'custom' },
];

const ImageSizeSelector = ({ editor }: { editor: Editor }) => {
  const [showCustomSize, setShowCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState('');
  const [size, setSize] = useState<number | 'custom'>(100);
  
  // Get current image size when selected
  useEffect(() => {
    if (editor.isActive('image')) {
      const attrs = editor.getAttributes('image');
      if (attrs.width) {
        // Check if it matches any of our presets
        const imgElement = document.querySelector('.ProseMirror-selectednode') as HTMLImageElement;
        if (imgElement) {
          setSize('custom');
          setCustomWidth(attrs.width);
        }
      }
    }
  }, [editor]);
  
  const updateImageSize = (newSize: number | 'custom') => {
    setSize(newSize);
    
    if (newSize === 'custom') {
      setShowCustomSize(true);
      return;
    }
    
    const imgElement = document.querySelector('.ProseMirror-selectednode') as HTMLImageElement;
    if (imgElement && editor.isActive('image')) {
      const naturalWidth = imgElement.naturalWidth;
      const naturalHeight = imgElement.naturalHeight;
      
      const newWidth = Math.round((naturalWidth * newSize) / 100);
      const newHeight = Math.round((naturalHeight * newSize) / 100);
      
      editor.chain().focus().updateAttributes('image', {
        width: newWidth,
        height: newHeight,
      }).run();
    }
  };
  
  const applyCustomSize = () => {
    if (!customWidth) return;
    
    const width = parseInt(customWidth);
    if (isNaN(width)) return;
    
    const imgElement = document.querySelector('.ProseMirror-selectednode') as HTMLImageElement;
    if (imgElement && editor.isActive('image')) {
      const naturalWidth = imgElement.naturalWidth;
      const naturalHeight = imgElement.naturalHeight;
      
      const aspectRatio = naturalWidth / naturalHeight;
      const newHeight = Math.round(width / aspectRatio);
      
      editor.chain().focus().updateAttributes('image', {
        width: width,
        height: newHeight,
      }).run();
    }
    
    setShowCustomSize(false);
  };
  
  if (!editor.isActive('image')) return null;
  
  return (
    <div className="p-1 bg-white border rounded-md shadow-md">
      <div className="flex flex-col gap-1">
        {!showCustomSize ? (
          <>
            <div className="text-xs font-medium text-gray-500 px-2 py-1">Kích thước ảnh</div>
            {IMAGE_SIZES.map((option) => (
              <button
                key={option.value.toString()}
                onClick={() => updateImageSize(option.value as number | 'custom')}
                className={`px-3 py-1.5 text-sm text-left rounded hover:bg-gray-100 ${
                  size === option.value ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </>
        ) : (
          <>
            <div className="text-xs font-medium text-gray-500 px-2 py-1 flex items-center">
              <button 
                onClick={() => setShowCustomSize(false)}
                className="p-1 hover:bg-gray-100 rounded-md mr-1"
              >
                <ArrowLeft size={12} />
              </button>
              Tùy chỉnh kích thước
            </div>
            <div className="p-2 flex gap-2 items-center">
              <input
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                placeholder="Chiều rộng (px)"
                className="w-20 border p-1 text-sm rounded"
              />
              <span className="text-xs text-gray-500">px</span>
              <button
                onClick={applyCustomSize}
                className="ml-1 bg-blue-600 text-white px-2 py-1 rounded text-xs"
              >
                Áp dụng
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
  const [isImageUrlMode, setIsImageUrlMode] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isYoutubeMenuOpen, setIsYoutubeMenuOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isHeadingMenuOpen, setIsHeadingMenuOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const linkInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageUrlInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const youtubeInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus inputs when menus are opened
  useEffect(() => {
    if (isLinkMenuOpen && linkInputRef.current) linkInputRef.current.focus();
    if (isImageMenuOpen && isImageUrlMode && imageUrlInputRef.current) imageUrlInputRef.current.focus();
    if (isYoutubeMenuOpen && youtubeInputRef.current) youtubeInputRef.current.focus();
  }, [isLinkMenuOpen, isImageMenuOpen, isImageUrlMode, isYoutubeMenuOpen]);

  // Reset states when menus are closed
  useEffect(() => {
    if (!isImageMenuOpen) {
      setIsImageUrlMode(false);
      setUploadError(null);
      setUploadProgress(0);
      setUploadSuccess(false);
    }
  }, [isImageMenuOpen]);

  if (!editor) return null;

  const setLink = () => {
    if (!linkUrl) return;
    const url = linkUrl.includes('://') ? linkUrl : `https://${linkUrl}`;
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
    setLinkUrl('');
    setIsLinkMenuOpen(false);
  };

  const addImageByUrl = () => {
    if (!imageUrl) return;
    editor.chain().focus().setImage({
      src: imageUrl,
      alt: 'Image',
    }).updateAttributes('image', { width: 500 }).run();
    setImageUrl('');
    setIsImageMenuOpen(false);
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    try {
      setUploadingImage(true);
      setUploadError(null);
      setUploadProgress(0);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);
      
      const uploadedImage = await uploadImage(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (uploadedImage && uploadedImage.id) {
        const imageUrl = getImageUrl(uploadedImage.id);
        
        // Create a temporary Image object to get natural dimensions
        const img = new Image();
        img.onload = () => {
          // Calculate height based on default width and aspect ratio
          const width = 500;
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          const height = Math.round(width / aspectRatio);
          
          editor.chain().focus().setImage({ 
            src: imageUrl, 
            alt: uploadedImage.fileName || 'Uploaded image'
          }).updateAttributes('image', {
            width: width,
            height: height
          }).run();
        };
        
        img.onerror = () => {
          // If image loading fails, insert without dimensions
          editor.chain().focus().setImage({ 
            src: imageUrl, 
            alt: uploadedImage.fileName || 'Uploaded image'
          }).updateAttributes('image', {
            width: 500
          }).run();
        };
        
        // Start loading the image
        img.src = imageUrl;
        
        setUploadSuccess(true);
        setTimeout(() => {
          setIsImageMenuOpen(false);
        }, 1500);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Không thể tải lên ảnh. Vui lòng thử lại.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };

  const addYoutubeVideo = () => {
    if (!youtubeUrl) return;
    editor.commands.setYoutubeVideo({ src: youtubeUrl });
    setYoutubeUrl('');
    setIsYoutubeMenuOpen(false);
  };

  return (
    <div className="border-b bg-gray-50">
      {/* Main toolbar */}
      <div className="flex flex-wrap gap-1 p-2">
        {/* Standard formatting buttons */}
        {[{
          icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), title: 'Đậm'
        }, {
          icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), title: 'Nghiêng'
        }, {
          icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), title: 'Gạch chân'
        }, {
          icon: CodeIcon, action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive('code'), title: 'Code inline'
        }, {
          icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), title: 'Trích dẫn'
        }, {
          icon: Minus, action: () => editor.chain().focus().setHorizontalRule().run(), active: false, title: 'Kẻ ngang'
        }, {
          icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), title: 'Danh sách'
        }, {
          icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), title: 'Danh sách có thứ tự'
        }, {
          icon: CheckSquare, action: () => editor.chain().focus().toggleTaskList().run(), active: editor.isActive('taskList'), title: 'Checklist'
        }, {
          icon: FileCode, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock'), title: 'Code block'
        }, {
          icon: Undo, action: () => editor.chain().focus().undo().run(), active: false, title: 'Hoàn tác'
        }, {
          icon: Redo, action: () => editor.chain().focus().redo().run(), active: false, title: 'Làm lại'
        }].map(({ icon: Icon, action, active, title }, i) => (
          <button key={i} onClick={action} title={title} className={`p-1.5 rounded-md ${active ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
            <Icon className="w-4 h-4" />
          </button>
        ))}

        {/* Heading dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsHeadingMenuOpen(!isHeadingMenuOpen)} 
            className={`p-1.5 rounded-md ${isHeadingMenuOpen ? 'bg-gray-200' : 'hover:bg-gray-100'} flex items-center`}
            title="Tiêu đề"
          >
            <Heading1 className="w-4 h-4" />
            <ChevronDown className="w-3 h-3 ml-1" />
          </button>

          {isHeadingMenuOpen && (
            <div className="absolute z-20 mt-1 bg-white border rounded-md shadow-md">
              {[1, 2, 3].map(level => (
                <button 
                  key={level} 
                  onClick={() => { 
                    editor.chain().focus().toggleHeading({ level: level as any }).run(); 
                    setIsHeadingMenuOpen(false); 
                  }} 
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-left"
                >
                  {level === 1 && <Heading1 className="w-4 h-4 mr-2" />}
                  {level === 2 && <Heading2 className="w-4 h-4 mr-2" />}
                  {level === 3 && <Heading3 className="w-4 h-4 mr-2" />}
                  Heading {level}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Link button */}
        <button 
          onClick={() => setIsLinkMenuOpen(!isLinkMenuOpen)} 
          className={`p-1.5 rounded-md ${isLinkMenuOpen ? 'bg-gray-200' : 'hover:bg-gray-100'}`} 
          title="Chèn liên kết"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        
        {/* Image button */}
        <button 
          onClick={() => setIsImageMenuOpen(!isImageMenuOpen)}
          className={`p-1.5 rounded-md ${isImageMenuOpen ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title="Chèn ảnh"
          disabled={uploadingImage}
        >
          {uploadingImage ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </button>
        
        {/* YouTube button */}
        <button 
          onClick={() => setIsYoutubeMenuOpen(!isYoutubeMenuOpen)}
          className={`p-1.5 rounded-md ${isYoutubeMenuOpen ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title="Chèn YouTube"
        >
          <Youtube className="w-4 h-4" />
        </button>
      </div>

      {/* Link form */}
      {isLinkMenuOpen && (
        <div className="p-3 border-t bg-white">
          <div className="text-xs text-gray-500 mb-2">Nhập URL liên kết:</div>
          <div className="flex gap-2">
            <input 
              ref={linkInputRef} 
              value={linkUrl} 
              onChange={e => setLinkUrl(e.target.value)} 
              placeholder="https://example.com" 
              className="flex-1 text-sm p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button 
              onClick={setLink} 
              disabled={!linkUrl}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                !linkUrl ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Thêm
            </button>
          </div>
        </div>
      )}

      {/* Image popup */}
      {isImageMenuOpen && (
        <div className="p-3 border-t bg-white">
          {!uploadingImage && !uploadSuccess && !isImageUrlMode && (
            <div className="space-y-3">
              <div className="text-xs text-gray-500 mb-1">Chọn cách thêm ảnh:</div>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Upload image option */}
                <button
                  onClick={() => imageFileInputRef.current?.click()}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-md hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Upload className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Tải lên từ máy tính</span>
                </button>
                
                {/* URL option */}
                <button
                  onClick={() => setIsImageUrlMode(true)}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-md hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Link2 className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Sử dụng URL ảnh</span>
                </button>
              </div>
              
              {uploadError && (
                <div className="p-3 bg-red-50 rounded-md flex items-start gap-2 mt-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-600">{uploadError}</span>
                </div>
              )}
              
              <input
                ref={imageFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          )}
          
          {/* Image URL input */}
          {isImageUrlMode && (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-500">Nhập URL hình ảnh:</div>
                <button 
                  onClick={() => setIsImageUrlMode(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  <X className="w-3 h-3 inline-block mr-1" />
                  Quay lại
                </button>
              </div>
              
              <div className="flex gap-2">
                <input
                  ref={imageUrlInputRef}
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 text-sm p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={addImageByUrl}
                  disabled={!imageUrl}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    !imageUrl ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Chèn
                </button>
              </div>
            </div>
          )}
          
          {/* Loading state */}
          {uploadingImage && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700 font-medium">Đang tải lên...</span>
                <span className="text-xs text-gray-500 font-medium">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 italic">Vui lòng đợi trong khi ảnh đang được tải lên</p>
            </div>
          )}
          
          {/* Success message */}
          {uploadSuccess && (
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md border border-green-100">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-700 font-medium">Tải lên thành công!</span>
            </div>
          )}
        </div>
      )}

      {/* YouTube form */}
      {isYoutubeMenuOpen && (
        <div className="p-3 border-t bg-white">
          <div className="text-xs text-gray-500 mb-2">Nhập URL YouTube:</div>
          <div className="flex gap-2">
            <input 
              ref={youtubeInputRef} 
              value={youtubeUrl} 
              onChange={e => setYoutubeUrl(e.target.value)} 
              placeholder="https://www.youtube.com/watch?v=..." 
              className="flex-1 text-sm p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button 
              onClick={addYoutubeVideo} 
              disabled={!youtubeUrl}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                !youtubeUrl ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Chèn
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Hỗ trợ: youtube.com, youtu.be
          </p>
        </div>
      )}
    </div>
  );
};

export default function TipTapEditor({ content, onChange, placeholder = 'Nhập nội dung...', editable = true }: TipTapEditorProps) {
  const [mounted, setMounted] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline' } }),
      ResizableImage.configure({
        HTMLAttributes: {
          class: 'resizable-image',
        },
      }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      YouTube.configure({ width: 640, height: 360 })
    ],
    content,
    editable,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose max-w-none focus:outline-none p-4 min-h-[400px]',
        spellcheck: 'true',
        'data-placeholder': placeholder,
      }
    }
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="border rounded-md min-h-[400px] bg-gray-50 animate-pulse"></div>;

  return (
    <div className="border rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      {editor && (
        <BubbleMenu 
          editor={editor} 
          tippyOptions={{ duration: 100 }}
          shouldShow={({ editor }) => editor.isActive('image')}
        >
          <ImageSizeSelector editor={editor} />
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}
