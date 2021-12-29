import React from "react";
import { Fragment } from "react";
import Header from "../Header";
import Footer from "../Footer";

const PageLayout = ({ children }) => (
    <Fragment>
        <Header />
        {children}
        <Footer />
    </Fragment>
);

export default PageLayout;
