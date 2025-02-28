'use client';

import { CrossIcon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import Dropzone, {
    type DropzoneProps,
    type FileRejection
} from 'react-dropzone';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useControllableState } from '@/hooks/use-controllable-state';
import { cn, formatBytes } from '@/lib/utils';

// Interface định nghĩa các props cho FileUploader
interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Giá trị của uploader.
     * @type File[]
     * @default undefined
     * @example value={files}
     */
    value?: File[];

    /**
     * Hàm được gọi khi giá trị thay đổi.
     * @type React.Dispatch<React.SetStateAction<File[]>>
     * @default undefined
     * @example onValueChange={(files) => setFiles(files)}
     */
    onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;

    /**
     * Hàm được gọi khi upload file.
     * @type (files: File[]) => Promise<void>
     * @default undefined
     * @example onUpload={(files) => uploadFiles(files)}
     */
    onUpload?: (files: File[]) => Promise<void>;

    /**
     * Tiến trình upload của các file.
     * @type Record<string, number> | undefined
     * @default undefined
     * @example progresses={{ "file1.png": 50 }}
     */
    progresses?: Record<string, number>;

    /**
     * Các định dạng file được chấp nhận.
     * @type { [key: string]: string[] }
     * @default { "image/*": [] }
     * @example accept={["image/png", "image/jpeg"]}
     */
    accept?: DropzoneProps['accept'];

    /**
     * Kích thước tối đa của file.
     * @type number | undefined
     * @default 1024 * 1024 * 2 // 2MB
     * @example maxSize={1024 * 1024 * 2} // 2MB
     */
    maxSize?: DropzoneProps['maxSize'];

    /**
     * Số lượng file tối đa.
     * @type number | undefined
     * @default 1
     * @example maxFiles={5}
     */
    maxFiles?: DropzoneProps['maxFiles'];

    /**
     * Cho phép upload nhiều file.
     * @type boolean
     * @default false
     * @example multiple
     */
    multiple?: boolean;

    /**
     * Cho biết uploader có bị vô hiệu hóa hay không.
     * @type boolean
     * @default false
     * @example disabled
     */
    disabled?: boolean;
}

export function FileUploader(props: FileUploaderProps) {
    // Lấy các props và gán giá trị mặc định
    const {
        value: valueProp,
        onValueChange,
        onUpload,
        progresses,
        accept = { 'image/*': [] },
        maxSize = 1024 * 1024 * 2,
        maxFiles = 1,
        multiple = false,
        disabled = false,
        className,
        ...dropzoneProps
    } = props;

    // Sử dụng hook controllable state để quản lý danh sách file
    const [files, setFiles] = useControllableState({
        prop: valueProp,
        onChange: onValueChange
    });

    // Hàm callback xử lý khi có file được drop vào khu vực Dropzone
    const onDrop = React.useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            // Kiểm tra nếu không cho phép nhiều file và vượt quá số file cho phép
            if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
                toast.error('Cannot upload more than 1 file at a time');
                return;
            }

            // Kiểm tra tổng số file vượt quá giới hạn cho phép
            if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
                toast.error(`Cannot upload more than ${maxFiles} files`);
                return;
            }

            // Cập nhật preview URL cho từng file
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            );

            // Gộp danh sách file cũ với các file mới
            const updatedFiles = files ? [...files, ...newFiles] : newFiles;
            setFiles(updatedFiles);

            // Hiển thị thông báo lỗi nếu có file bị từ chối
            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(({ file }) => {
                    toast.error(`File ${file.name} was rejected`);
                });
            }

            // Nếu có hàm onUpload và số file nằm trong giới hạn, gọi hàm upload
            if (
                onUpload &&
                updatedFiles.length > 0 &&
                updatedFiles.length <= maxFiles
            ) {
                const target =
                    updatedFiles.length > 0 ? `${updatedFiles.length} files` : `file`;

                toast.promise(onUpload(updatedFiles), {
                    loading: `Uploading ${target}...`,
                    success: () => {
                        setFiles([]);
                        return `${target} uploaded`;
                    },
                    error: `Failed to upload ${target}`
                });
            }
        },
        [files, maxFiles, multiple, onUpload, setFiles]
    );

    // Hàm xử lý xóa file khỏi danh sách
    function onRemove(index: number) {
        if (!files) return;
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        // Gọi callback cập nhật giá trị nếu có
        onValueChange?.(newFiles);
    }

    // Hủy bỏ preview URL khi component unmount để giải phóng bộ nhớ
    React.useEffect(() => {
        return () => {
            if (!files) return;
            files.forEach((file) => {
                if (isFileWithPreview(file)) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Kiểm tra xem uploader có bị vô hiệu hóa hay không (nếu số file đạt giới hạn hoặc disabled=true)
    const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

    return (
        <div className='relative flex flex-col gap-6 overflow-hidden'>
            {/* Dropzone dùng để kéo và thả file */}
            <Dropzone
                onDrop={onDrop}
                accept={accept}
                maxSize={maxSize}
                maxFiles={maxFiles}
                multiple={maxFiles > 1 || multiple}
                disabled={isDisabled}
            >
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                        {...getRootProps()}
                        className={cn(
                            'group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
                            'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                            isDragActive && 'border-muted-foreground/50',
                            isDisabled && 'pointer-events-none opacity-60',
                            className
                        )}
                        {...dropzoneProps}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            // Hiển thị khi đang kéo file vào khu vực Dropzone
                            <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
                                <div className='rounded-full border border-dashed p-3'>
                                    <UploadIcon
                                        className='size-7 text-muted-foreground'
                                        aria-hidden='true'
                                    />
                                </div>
                                <p className='font-medium text-muted-foreground'>
                                    Drop the files here
                                </p>
                            </div>
                        ) : (
                            // Hiển thị thông báo mặc định
                            <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
                                <div className='rounded-full border border-dashed p-3'>
                                    <UploadIcon
                                        className='size-7 text-muted-foreground'
                                        aria-hidden='true'
                                    />
                                </div>
                                <div className='space-y-px'>
                                    <p className='font-medium text-muted-foreground'>
                                        Drag {'n'} drop files here, or click to select files
                                    </p>
                                    <p className='text-sm text-muted-foreground/70'>
                                        You can upload
                                        {maxFiles > 1
                                            ? ` ${maxFiles === Infinity ? 'multiple' : maxFiles}
                      files (up to ${formatBytes(maxSize)} each)`
                                            : ` a file with ${formatBytes(maxSize)}`}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Dropzone>
            {/* Hiển thị danh sách file đã chọn */}
            {files?.length ? (
                <ScrollArea className='h-fit w-full px-3'>
                    <div className='max-h-48 space-y-4'>
                        {files?.map((file, index) => (
                            <FileCard
                                key={index}
                                file={file}
                                onRemove={() => onRemove(index)}
                                progress={progresses?.[file.name]}
                            />
                        ))}
                    </div>
                </ScrollArea>
            ) : null}
        </div>
    );
}

// Interface cho props của FileCard – hiển thị thông tin của một file đã upload
interface FileCardProps {
    file: File;
    onRemove: () => void;
    progress?: number;
}

// Component FileCard hiển thị thông tin file, hình ảnh preview, tên file, kích thước và thanh tiến trình nếu có
function FileCard({ file, progress, onRemove }: FileCardProps) {
    return (
        <div className='relative flex items-center space-x-4'>
            <div className='flex flex-1 space-x-4'>
                {/* Nếu file có preview, hiển thị hình ảnh của file */}
                {isFileWithPreview(file) ? (
                    <Image
                        src={file.preview}
                        alt={file.name}
                        width={48}
                        height={48}
                        loading='lazy'
                        className='aspect-square shrink-0 rounded-md object-cover'
                    />
                ) : null}
                <div className='flex w-full flex-col gap-2'>
                    <div className='space-y-px'>
                        {/* Hiển thị tên file */}
                        <p className='line-clamp-1 text-sm font-medium text-foreground/80'>
                            {file.name}
                        </p>
                        {/* Hiển thị kích thước file */}
                        <p className='text-xs text-muted-foreground'>
                            {formatBytes(file.size)}
                        </p>
                    </div>
                    {/* Nếu có progress upload, hiển thị thanh tiến trình */}
                    {progress ? <Progress value={progress} /> : null}
                </div>
            </div>
            <div className='flex items-center gap-2'>
                {/* Nút xóa file */}
                <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    className='size-7'
                    onClick={onRemove}
                >
                    <CrossIcon className='size-4' aria-hidden='true' />
                    <span className='sr-only'>Remove file</span>
                </Button>
            </div>
        </div>
    );
}

// Hàm kiểm tra xem file có chứa preview hay không
function isFileWithPreview(file: File): file is File & { preview: string } {
    return 'preview' in file && typeof file.preview === 'string';
}