import './CategoryListPage.scss';
import { useCategories } from '@entities/category/lib/useCategory';
import { bem } from '@shared/libs';
import { CategoryListTable } from '@widgets/category-list/CategoryListTable/CategoryListTable';

const b = bem('category-list-page');

const CategoryListPage = () => {
  const { query, pagination } = useCategories();

  return (
    <div className={b()}>
      <CategoryListTable query={query} pagination={pagination} />
    </div>
  );
};

export default CategoryListPage;
