import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FormWrapper from "./FormWrapper";
import * as React from "@types/react";

const pdfEditor = ({setPassword, setEmail, handleAction}) => {

    async function modifyPdf() {
        // Fetch an existing PDF document
        const url = '../../../../public/document.pdf'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // Embed the Helvetica font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        // Get the first page of the document
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        // Get the width and height of the first page
        const { width, height } = firstPage.getSize()

        // Draw a string of text diagonally across the first page
        firstPage.drawText('NON AUTHORIZED !', {
            x: 5,
            y: height / 2 + 300,
            size: 50,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(-45),
        })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()

        // Trigger the browser to download the PDF document
        download(pdfBytes, "doc1.pdf", "application/pdf");
    }

    return (
        <FormWrapper>
            <div className="box">
                <p>Click the button to modify an existing PDF document with <code>pdf-lib</code></p>
                <button onClick={modifyPdf}>Modify PDF</button>
                <p className="small">(Your browser will download the resulting file)</p>
            </div>
        </FormWrapper>
    );
};
export default pdfEditor;