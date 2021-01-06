<!DOCTYPE html>
<html lang="en">
<head>
    {{-- Meta --}}
    @include('includes.meta')

    {{-- Favicons --}}
    @include('includes.favicon')
    
    {{-- Styles --}}
    @include('includes.style')
</head>
<body class="hold-transition sidebar-mini">
    {{-- Wrapper --}}
    <div class="wrapper">

    {{-- Navbar --}}
    @include('includes.navbar')

    {{-- Sidebar --}}
    @include('includes.sidebar')

    {{-- Main --}}
    <div class="content-wrapper">

        {{-- Header Section --}}
        @yield('header-section')

        {{-- Main content --}}
        <section class="content">

            {{-- Content --}}
            @yield('content-section')

        </section>
        {{-- /.content --}}
    </div>

    {{-- Footer --}}
    @include('includes.footer')

    {{-- Control Sidebar --}}
    <aside class="control-sidebar control-sidebar-dark">
        {{-- Control sidebar content goes here --}}
    </aside>
    {{-- /.control-sidebar --}}
    </div>
    {{-- ./wrapper --}}

    {{-- Scripts --}}
    @include('includes.script')
</body>
</html>