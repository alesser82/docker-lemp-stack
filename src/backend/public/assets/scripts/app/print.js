function getStyleHtml() {
    const styleElement = document.getElementsByTagName('link');

    let html = '';

    $.each(styleElement, (key, value) => {
        html += value.outerHTML;
    });

    return html;
}

function getPrintAreaHtml() {
    return $('#print-area')[0].outerHTML;
}

function getPrintScript() {
    if ($(window).width() > 1000) {
        return `
            <script>
                setTimeout(() => {
                    window.print();
                    window.close();
                }, 200);
            </script>
        `
    }

    return `
        <script>
            setTimeout(() => {
                window.print();
            }, 200);
        </script>
    `
}

function printArea() {
    const title = $('#print-btn').attr('data-title'),
        html = `
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>${title}</title>
                ${getStyleHtml()}
            </head>
            <body onload="window.print()">
                <style>
                    @media print {
                        tr.bg-light td,
                        tr.bg-light th {
                            background-color: #f8f9fa !important;
                            -webkit-print-color-adjust: exact;
                        }
                    }
                </style>
                ${getPrintAreaHtml()}
                ${getPrintScript()}
            </body>
        </html>
    `;

    let printWindow = window.open("", "_blank");

    printWindow.document.write(html);
}

$(document).ready(() => {
    $('#print-btn').click(() => {
        printArea();
    });

    $('#pdf-btn').click(() => {
        downloadPdf();
    });
});