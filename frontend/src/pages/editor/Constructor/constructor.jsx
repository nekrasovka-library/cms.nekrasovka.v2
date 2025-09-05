import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPageRequest, resetPage } from "../../../features/page/pageSlice";
import Block from "../components/Block/block";
import Image from "../components/Image/image";
import Carousel from "../components/Carousel/carousel.jsx";
import Divider from "../components/Divider/divider.jsx";
import Header from "../components/Header/header.jsx";
import Footer from "../components/Footer/footer.jsx";
import Button from "../components/Button/button.jsx";
import AfishaMain from "../components/AfishaMain/afisha.main";
import AfishaPage from "../components/AfishaPage/afisha.page";
import Text from "../components/Text/text";
import AfishaEvent from "../components/AfishaEvent/afisha.event";
import { AnimatePresence } from "framer-motion";
import Transition from "../components/Transition/transition";

const Constructor = () => {
  const dispatch = useDispatch();
  const { pageId, blockId } = useParams();
  const page = useSelector(({ page }) => page);

  useEffect(() => {
    if (!!pageId) {
      dispatch(fetchPageRequest({ id: pageId, ...(blockId && { blockId }) }));
    }

    return () => dispatch(resetPage());
  }, [pageId]);

  const CONSTRUCTOR_COMPONENTS = {
    text: Text,
    image: Image,
    carousel: Carousel,
    divider: Divider,
    button: Button,
    header: Header,
    footer: Footer,
    afishaMain: AfishaMain,
    afishaPage: AfishaPage,
    afishaEvent: AfishaEvent,
  };

  return (
    <AnimatePresence mode="wait">
      <Transition key={page.status === "succeeded"}>
        {page.items.blocks?.length > 0 ? (
          page.items.blocks.map(
            ({ id, pageId, content, type, styles, position, settings }) => {
              return (
                <Block
                  key={id}
                  blockId={id}
                  pageId={pageId}
                  type={type}
                  content={content}
                  styles={styles}
                  position={position}
                  settings={settings}
                  totalBlocks={page.items.blocks.length}
                  COMPONENT={CONSTRUCTOR_COMPONENTS[type]}
                />
              );
            },
          )
        ) : (
          <Block pageId={pageId} />
        )}
      </Transition>
    </AnimatePresence>
  );
};

export default Constructor;
