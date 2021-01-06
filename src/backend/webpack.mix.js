const mix = require('laravel-mix');

/*
    |--------------------------------------------------------------------------
    | Mix Asset Management
    |--------------------------------------------------------------------------
    |
    | Mix provides a clean, fluent API for defining some Webpack build steps
    | for your Laravel application. By default, we are compiling the Sass
    | file for the application as well as bundling up all the JS files.
    |
 */

// mix.js('resources/js/app.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css');
mix.combine([
    'public/themes/AdminLTE-3/plugins/jquery/jquery.min.js',
    'public/themes/AdminLTE-3/plugins/jquery-ui/jquery-ui.min.js',
    'public/themes/AdminLTE-3/plugins/bootstrap/js/bootstrap.bundle.min.js',
    'public/themes/AdminLTE-3/plugins/moment/moment.min.js',
    'public/themes/AdminLTE-3/plugins/datatables/jquery.dataTables.js',
    'public/themes/AdminLTE-3/plugins/datatables-bs4/js/dataTables.bootstrap4.js',
    'public/themes/AdminLTE-3/plugins/chart.js/Chart.min.js',
    'public/themes/AdminLTE-3/dist/js/adminlte.js',
    'public/themes/AdminLTE-3/plugins/datatables-buttons/js/dataTables.buttons.min.js',
    'public/themes/AdminLTE-3/plugins/datatables-buttons/js/buttons.bootstrap4.min.js',
    'public/themes/AdminLTE-3/plugins/datatables-buttons/js/buttons.print.min.js',
    'public/assets/scripts/app/core.js',
    'public/assets/scripts/app/add-order.js',
    'public/assets/scripts/app/add-purchase.js',
    'public/assets/scripts/app/print.js',
    'public/assets/scripts/app/table-print.js',
    // 'public/assets/scripts/app/dashboard.js',
], 'public/assets/scripts/app/app.min.js');