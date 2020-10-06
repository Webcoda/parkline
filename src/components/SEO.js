import React from 'react'
import { Helmet } from "react-helmet"

const SEO = ({ title, description }) => {
    return (
        <Helmet
            title={`${title}  - Investa Parkline`}
            meta={[
                {
                    name: `description`,
                    content: description
                }
            ]}
        />
    )
}

export default SEO;

