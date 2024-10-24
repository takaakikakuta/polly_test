import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

export const DefaultStorageManagerExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      path="picture-submissions/"
      maxFileCount={1}
      isResumable
      displayText={{
              // some text are plain strings
                dropFilesText: 'ドラッグ&ドロップ',
                browseFilesText: 'ファイルを選択する',
                uploadSuccessfulText: 'アップロード完了',
                // others are functions that take an argument
                getFilesUploadedText(count) {
                  return `${count}枚 画像がアップロードされました`;
                },
      }}
    />
  );
};