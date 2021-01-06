<!DOCTYPE html>
<html>
    <head>
        {{-- Meta --}}
        @include('includes.meta')

        {{-- Favicons --}}
        @include('includes.favicon')
        
        {{-- Styles --}}
        @include('includes.style')

    </head>

    <body class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <a href="login.html">AL8 Inventory</a>
            </div>
            {{-- /.login-logo --}}
            <div class="card">
                <div class="card-body login-card-body">
                    @yield('content')
                </div>
                {{-- /.login-card-body --}}
            </div>
        </div>
        {{-- /.login-box --}}

        {{-- Scripts --}}
        @include('includes.script')

    </body>

</html>
