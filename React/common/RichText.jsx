import React, { useState, useRef } from "react";
import dynamic from 'next/dynamic';
const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
    ssr: false,
});

export default function RichText(props) {
    const editor = useRef(null);
    const { content, setContent } = props;
    const config = {
        readonly: false,
        height: 400
    };

    return (
        <>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={newContent => setContent(newContent)}
            />
        </>
    );
}
//!  FOR MORE INFO ABOUT THIS COMPONENT VISIT THIS LINK https://www.npmjs.com/package/jodit-react or
//! use CSK - EDITOR https://ckeditor.com/docs/ckeditor5/latest/installation/integrations/react.html
//TODO: CALL THIS COMPONENT IN THE PARENT COMPONENT
//   const handleBodyChange = (newContent) => {
//     setValues((old) => ({ ...old, ["request_body"]: newContent }));
//   };
//                     <RichText
//                       content={values.request_body}
//                       setContent={handleBodyChange}
//                     />;

