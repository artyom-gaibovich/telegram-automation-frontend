import './TranscriptionListPage.scss';
import { useTranscription } from '@entities/transcription/lib/useTranscription';
import { bem } from '@shared/libs';
import { TranscriptionListTable } from '@widgets/transcription-list/TranscriptionListTable/TranscriptionListTable';

const b = bem('category-list-page');

const TranscriptionListPage = () => {
  const { query, pagination, onChangePagination, queryRefetch } =
    useTranscription();

  return (
    <div className={b()}>
      <TranscriptionListTable
        query={query}
        queryRefetch={queryRefetch}
        pagination={pagination}
        onChangePagination={onChangePagination}
      />
    </div>
  );
};

export default TranscriptionListPage;
