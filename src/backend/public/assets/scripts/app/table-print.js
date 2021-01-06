function getReportStyle() {
    if ($('#stock-report-content').length > 0) {
        return `
            .dataTable thead tr th:nth-child(1),
            .dataTable thead tr th:nth-child(2),
            .dataTable thead tr th:nth-child(3),
            .dataTable tbody tr td:nth-child(1),
            .dataTable tbody tr td:nth-child(2),
            .dataTable tbody tr td:nth-child(3)  {
                text-align: center;
            }

            .dataTable thead tr th:nth-child(5),
            .dataTable thead tr th:nth-child(6),
            .dataTable tbody tr td:nth-child(5),
            .dataTable tbody tr td:nth-child(6)  {
                text-align: right; 
            }
        `;
    }
}

function initPrintDatatable() {
    $('.print-table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                autoPrint: $(window).width() > 1000 ? true : false,
                extend: 'print',
                text: '<i class="fas fa-print mr-1"></i>PDF/Cetak',
                className: 'btn btn-sm btn-danger',
                customize: function (win) {
                    $(win.document.body)
                        .prepend(`
                            <style>
                                ${getReportStyle()}
                            </style>
                            <h3 class="text-center">${$('.print-table').attr('data-title')}</h3>
                        `);
                    
                    $(win.document.body)
                        .find('h1')
                        .eq(0)
                        .remove();

                    if ($(window).width() < 1000) {
                        $(win.document.body).append(`
                            <script>
                                let stateCheck = setInterval(() => {
                                    if (document.readyState === 'complete') {
                                        clearInterval(stateCheck);
                                        window.print();
                                    }
                                }, 200);
                            </script>
                        `)
                    }
                }
            }
        ]
    });
}

$(document).ready(() => {
    if ($('.print-table').length > 0) {
        initPrintDatatable();
    }
});