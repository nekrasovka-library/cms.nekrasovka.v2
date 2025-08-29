import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPageRequest, resetPage } from "../../../features/page/pageSlice";

const Page = () => {
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    if (pageId) {
      dispatch(fetchPageRequest({ id: pageId }));
    }

    return () => {
      dispatch(resetPage());
    };
  }, [dispatch, pageId]);

  return <div>Preview</div>;
};

export default Page;
