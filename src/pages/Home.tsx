import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sortList } from "../components/Sort";


import {
  Categories,
  Skeleton,
  GeneratorBlock,
  Sort,
  Pagination,
} from "../components"

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { fetchGenerators } from "../redux/generator/asyncActions";
import { selectGeneratorData } from "../redux/generator/selectors";
import { SearchGeneratorParams } from "../redux/generator/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectGeneratorData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  // ==================================================
  const getGenerator = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchGenerators({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // Якшо змінився параметр і був перший рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage,
      });
      const queryString = qs.stringify(params, { skipNulls: true });
      navigate(`/?${queryString}`);
    }

    if (window.location.search) {
      dispatch(fetchGenerators({} as SearchGeneratorParams));
    }
  }, [categoryId, sort.sortProperty, currentPage]);

  // Якшо був перший рендер, то провіряєм URl - параметри і сохраняєм в редукс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchGeneratorParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
    }
    isMounted.current = true;
  }, []);

  // ==================================================

  // Якшо був перший рендер,то запрос на заміну генераторів
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getGenerator();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // ==================================================
  const generators = items.map((obj: any) => (
    <GeneratorBlock key={obj.id} {...obj} />
  ));
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Всі генератори</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Сталася помилка😕</h2>
          <p>
            На жаль,не вдалося отримати генератори. Спробуйте повторити спробу
            пізніше.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : generators}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
