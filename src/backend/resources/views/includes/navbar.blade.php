<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    {{-- Left navbar links --}}
    <ul class="navbar-nav">
    <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
    </li>
    </ul>

    {{-- Right navbar links --}}
    <ul class="navbar-nav ml-auto">
    {{-- Notifications Dropdown Menu --}}
    <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="fas fa-cog"></i>
            Pengaturan
        </a>
        <div class="dropdown-menu dropdown-menu dropdown-menu-right">
            <a href="#" class="dropdown-item">
                Profil
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
                Aplikasi
            </a>
            <div class="dropdown-divider"></div>
            <form action="../login.html" class="dropdown-item">
                <button type="submit" class="btn">Keluar Akun</button>
            </form>
        </div>
    </li>
    </ul>
</nav>