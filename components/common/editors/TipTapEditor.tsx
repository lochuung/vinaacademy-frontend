'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import YouTube from '@tiptap/extension-youtube';
import { useState, useEffect, useRef } from 'react';
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
  ChevronDown
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isYoutubeMenuOpen, setIsYoutubeMenuOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isHeadingMenuOpen, setIsHeadingMenuOpen] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const youtubeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLinkMenuOpen && linkInputRef.current) linkInputRef.current.focus();
    if (isImageMenuOpen && imageInputRef.current) imageInputRef.current.focus();
    if (isYoutubeMenuOpen && youtubeInputRef.current) youtubeInputRef.current.focus();
  }, [isLinkMenuOpen, isImageMenuOpen, isYoutubeMenuOpen]);

  if (!editor) return null;

  const setLink = () => {
    if (!linkUrl) return;
    const url = linkUrl.includes('://') ? linkUrl : `https://${linkUrl}`;
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
    setLinkUrl('');
    setIsLinkMenuOpen(false);
  };

  const addImage = () => {
    if (!imageUrl) return;
    editor.chain().focus().setImage({ src: imageUrl, alt: 'Image' }).run();
    setImageUrl('');
    setIsImageMenuOpen(false);
  };

  const addYoutubeVideo = () => {
    if (!youtubeUrl) return;
    editor.commands.setYoutubeVideo({ src: youtubeUrl });
    setYoutubeUrl('');
    setIsYoutubeMenuOpen(false);
  };

  return (
    <div className="border-b bg-gray-50">
      <div className="flex flex-wrap gap-1 p-2">
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

        <button onClick={() => setIsHeadingMenuOpen(!isHeadingMenuOpen)} className="p-1.5 rounded-md hover:bg-gray-100 flex items-center" title="Tiêu đề">
          <Heading1 className="w-4 h-4" />
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>

        {isHeadingMenuOpen && (
          <div className="absolute z-10 mt-2 bg-white border rounded shadow-md">
            {[1, 2, 3].map(level => (
              <button key={level} onClick={() => { editor.chain().focus().toggleHeading({ level: level as any }).run(); setIsHeadingMenuOpen(false); }} className="flex items-center w-full px-4 py-2 hover:bg-gray-50">
                {level === 1 && <Heading1 className="w-4 h-4 mr-2" />}
                {level === 2 && <Heading2 className="w-4 h-4 mr-2" />}
                {level === 3 && <Heading3 className="w-4 h-4 mr-2" />}
                Heading {level}
              </button>
            ))}
          </div>
        )}

        <button onClick={() => setIsLinkMenuOpen(!isLinkMenuOpen)} className="p-1.5 rounded-md hover:bg-gray-100" title="Chèn liên kết">
          <LinkIcon className="w-4 h-4" />
        </button>
        <button onClick={() => setIsImageMenuOpen(!isImageMenuOpen)} className="p-1.5 rounded-md hover:bg-gray-100" title="Chèn ảnh">
          <ImageIcon className="w-4 h-4" />
        </button>
        <button onClick={() => setIsYoutubeMenuOpen(!isYoutubeMenuOpen)} className="p-1.5 rounded-md hover:bg-gray-100" title="Chèn YouTube">
          <Youtube className="w-4 h-4" />
        </button>
      </div>

      {isLinkMenuOpen && (
        <div className="p-2 flex border-t">
          <input ref={linkInputRef} value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..." className="flex-1 border p-1 rounded-l" />
          <button onClick={setLink} className="bg-blue-600 text-white px-3 rounded-r">Thêm</button>
        </div>
      )}

      {isImageMenuOpen && (
        <div className="p-2 flex border-t">
          <input ref={imageInputRef} value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://...jpg" className="flex-1 border p-1 rounded-l" />
          <button onClick={addImage} className="bg-blue-600 text-white px-3 rounded-r">Chèn</button>
        </div>
      )}

      {isYoutubeMenuOpen && (
        <div className="p-2 flex border-t">
          <input ref={youtubeInputRef} value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/..." className="flex-1 border p-1 rounded-l" />
          <button onClick={addYoutubeVideo} className="bg-blue-600 text-white px-3 rounded-r">Chèn</button>
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
      Image.configure({ HTMLAttributes: { class: 'rounded-md max-w-full' } }),
      Placeholder.configure({ placeholder }),
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
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}
