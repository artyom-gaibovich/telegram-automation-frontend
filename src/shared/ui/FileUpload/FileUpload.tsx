import './FileUpload.scss';
import { type FC } from 'react';
import { type DraggerProps, Upload } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { type UploadFile } from 'antd/lib';
import { bem, fileUtils, useAntdApp } from '@shared/libs';
import { Button, Icon } from '@shared/ui';

// 10 МБ
const DEFAULT_FILE_SIZE = 1024 * 1024 * 1024;

export interface FileUploadProps
  extends Omit<DraggerProps, 'rootClassName' | 'classNames'> {
  className?: string;
  maxFileSize?: number;
  allowedExtensions?: (
    | '.jpg'
    | '.jpeg'
    | '.png'
    | '.pdf'
    | '.doc'
    | '.docx'
    | '.mp4'
  )[];
  isCompact?: boolean;
}

interface UploadActions {
  download: (file: UploadFile) => void;
  preview: (file: UploadFile) => void;
  remove: (file: UploadFile) => void;
}

const b = bem('file-upload');

export const FileUpload: FC<FileUploadProps> = ({
  className,
  maxFileSize = DEFAULT_FILE_SIZE,
  allowedExtensions,
  isCompact,
  ...props
}: FileUploadProps) => {
  const { message } = useAntdApp();

  const getIsUploadDisabled = (
    fileList: FileUploadProps['fileList'],
    multiple: FileUploadProps['multiple'],
    maxCount: FileUploadProps['maxCount'],
  ) => {
    if (!fileList?.length) {
      return false;
    }

    if (!multiple && fileList.length) {
      return true;
    }

    if (maxCount && fileList.length >= maxCount) {
      return true;
    }

    return false;
  };

  const isUploadDisabled = getIsUploadDisabled(
    props?.fileList,
    props?.multiple,
    props?.maxCount,
  );

  const maxFileSizeLabel = fileUtils.formatFileSize(maxFileSize);
  const hintLabel = [
    `максимальный размер — ${maxFileSizeLabel}`,
    allowedExtensions?.length
      ? `формат — ${allowedExtensions?.join(', ')}`
      : undefined,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className={b({ compact: isCompact })}>
      <div className="ant-upload-wrapper">
        <Dragger
          {...props}
          accept={allowedExtensions
            ?.map(fileUtils.getExtensionMimeType)
            .join(', ')}
          beforeUpload={(file, fileList) => {
            /* Проверка на размер файла */
            if (maxFileSize) {
              const oversizedFileNames = fileList
                .filter((f) => f.size > maxFileSize)
                .map((f) => f.name);
              if (oversizedFileNames.length) {
                oversizedFileNames.forEach((fileName) => {
                  message.error(
                    `Файл "${fileName}" превышает максимальный размер`,
                  );
                });
                return Upload.LIST_IGNORE;
              }

              if (file.size > maxFileSize) {
                message.error(
                  `Файл "${file.name}" превышает максимальный размер`,
                );
                return Upload.LIST_IGNORE;
              }
            }

            /* Проверка на расширение файла */
            if (allowedExtensions?.length) {
              const invalidExtFileNames = fileList
                .filter(
                  (f) =>
                    !allowedExtensions.includes(
                      fileUtils.getFileExtension(f.name) as any,
                    ),
                )
                .map((f) => f.name);
              if (invalidExtFileNames.length) {
                invalidExtFileNames.forEach((fileName) => {
                  message.error(`Файл "${fileName}" имеет недопустимый формат`);
                });
                return Upload.LIST_IGNORE;
              }

              if (
                !allowedExtensions.includes(
                  fileUtils.getFileExtension(file.name) as any,
                )
              ) {
                message.error(`Файл "${file.name}" имеет недопустимый формат`);
                return Upload.LIST_IGNORE;
              }
            }

            if (props?.beforeUpload) {
              return props.beforeUpload(file, fileList);
            }

            return false;
          }}
          className={b({ 'upload-disabled': isUploadDisabled }, className)}
          itemRender={(
            originNode: any,
            file: UploadFile,
            _fileList: UploadFile[],
            actions: UploadActions,
          ) => (
            <div className={b('file-item')}>
              <div className={b('file-item-info')}>
                <div className="divider" />
                <span className={b('file-item-name')}>
                  <button
                    className={b('file-content', { clickable: !!file.url })}
                    onClick={() => actions.download(file)}
                    title={file.name}
                  >
                    <Icon
                      width={24}
                      height={24}
                      style={{ color: 'var(--color-primary)' }}
                      name={'cloudUpload'}
                    />
                    <span id="filename">{file.name}</span>
                  </button>
                  <div className={b('file-item-actions')}>
                    <Icon
                      name={'cloudUpload'}
                      width={24}
                      height={24}
                      onClick={() => actions.remove(file)}
                      style={{
                        cursor: 'pointer',
                        flexShrink: 0,
                        color: 'var(--color-secondary)',
                      }}
                    />
                  </div>
                </span>
              </div>
              {originNode?.props?.actions}
            </div>
          )}
        >
          {isCompact ? (
            <div className={b('compact-container')}>
              <Button color="primary" disabled={props?.disabled}>
                {props.multiple ? 'выберите файлы' : 'выберите файл'}
              </Button>
              <p className={b('compact-hint')}>{hintLabel}</p>
            </div>
          ) : (
            <div className={b('drag-container')}>
              <p className={b('drag-container-text')}>
                <Icon name={'cloudUpload'} />
                <span>Перетащите сюда файл</span>
              </p>
              <p className={b('drag-container-hint')}>
                или&nbsp;
                <Button
                  color="primary"
                  type="dashed"
                  disabled={props?.disabled}
                >
                  {props.multiple ? 'выберите файлы' : 'выберите файл'}
                </Button>
                &nbsp;на вашем компьютере
              </p>
              <p className={b('drag-container-hint')}>({hintLabel})</p>
            </div>
          )}
        </Dragger>
      </div>
    </div>
  );
};
