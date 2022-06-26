import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title?: string;
  keyword?: string;
  description?: string;
}

const Meta = ({ title, description, keyword }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={keyword}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "TechHub",
  description: "We sell the best items at the best prices",
  keywords: "store, ecommerce, buy items, best prices",
};

export default Meta;